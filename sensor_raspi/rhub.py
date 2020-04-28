import serial
import time
import sqlite3


def sendCommand(command):
		
	command = command + '\n'
	ser.write(str.encode(command))


def waitResponse():
	
	response = ser.readline()
	response = response.decode('utf-8').strip()
	
	return response


def saveTemperature(temperatures):
	
	c = conn.cursor()
	
	sql = "INSERT INTO temperature (temperature, timestamp) VALUES ('" + str(temperatures) + "', datetime('now', 'localtime'));"
	c.execute(sql)
	
	conn.commit()
	
	temperatures = ''


def saveDoorStatus(door_open):
	
	c = conn.cursor()
	
	sql = "INSERT INTO door (door_open, timestamp) VALUES ('" + str(door_open) + "', datetime('now', 'localtime'));"
	c.execute(sql)
	
	conn.commit()
	
	door_open = ''


try:

	print("Listening on /dev/ttyACM0... Press CTRL+C to exit")	
	ser = serial.Serial(port='/dev/ttyACM0', baudrate=115200, timeout=1)
	
	conn = sqlite3.connect('sensor_data')
	
	# Handshaking
	sendCommand('handshake')
	
	strMicrobitDevices = ''
	
	while strMicrobitDevices == None or len(strMicrobitDevices) <= 0:
		
		strMicrobitDevices = waitResponse()
		time.sleep(0.1)
	
	strMicrobitDevices = strMicrobitDevices.split('=')
	
	if len(strMicrobitDevices[1]) > 0:

		sensorDevices = strMicrobitDevices[1]
		
		if len(sensorDevices) > 0:
					
			print('Connected to micro:bit device {}...'.format(sensorDevices))
			
			while True:
								
				time.sleep(5)
				print('Sending command to sensor devices...')
				
				commandToTx = 'sensor=temp'				
				sendCommand('cmd:' + commandToTx)
				print('Finished sending command to sensor devices...')
				
				if commandToTx.startswith('sensor='):
					
					strSensorValues = ''

					while strSensorValues == None or len(strSensorValues) <= 0:
						
						strSensorValues = waitResponse()
						time.sleep(0.1)
						
					if strSensorValues.startswith('door='):
						
						listDoorValues = strSensorValues.split('=')	
						strDoorValues = listDoorValues[1]
						print(strDoorValues)
						saveDoorStatus(strDoorValues)
					
					elif strSensorValues.startswith('temp='):

						listSensorValues = strSensorValues.split('=')
						strTempValues = listSensorValues[1]
						print(strTempValues)
						saveTemperature(strTempValues)
	
except KeyboardInterrupt:
		
	print("Program terminated!")

except Error as err:
	
	print('********** ERROR: {}'.format(err))

finally:
	
	if ser.is_open:
		ser.close()
		
	conn.close()
