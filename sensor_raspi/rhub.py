from datetime import datetime
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


def saveTemperature(temperature):
	
	c = conn.cursor()
	
	sql = "INSERT INTO temperature (temperature, timestamp) VALUES ('" + str(temperature) + "', datetime('now', 'localtime'));"
	c.execute(sql)
	
	conn.commit()
	
	temperature = ''


def saveDoorStatus(door_open):
	
	c = conn.cursor()
	
	sql = "INSERT INTO door (door_open, timestamp) VALUES ('" + str(door_open) + "', datetime('now', 'localtime'));"
	c.execute(sql)
	
	conn.commit()
	
	door_open = ''

try:

	print("Listening on /dev/ttyACM0.. Press CTRL+C to exit")	
	ser = serial.Serial(port='/dev/ttyACM0', baudrate=115200, timeout=1)
	
	conn = sqlite3.connect('sensor_data')
	
	# Handshaking
	sendCommand('handshake')
	previousTime = datetime.now()
	timeNow = previousTime

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

				event = ''
				
				while event == None or len(event) <= 0:
					event = waitResponse()

					timeNow = datetime.now()
					difference = int((timeNow - previousTime).total_seconds())
					print("Time Difference: " + str(difference))

					if (difference > 5):
						commandToTx = 'sensor=temp'				
						sendCommand('cmd:' + commandToTx)
						tempResponse = ''
						time.sleep(0.5)
						tempResponse = waitResponse()
						if tempResponse == None or len(tempResponse) <= 0:
							continue

						print(tempResponse)
						if (tempResponse.startswith('temp=')):
							fridgeTemp = tempResponse.split('=')
							print("Fridge Temp: " + fridgeTemp[1])
							saveTemperature(fridgeTemp[1])
							previousTime = timeNow
				
				print(event)
				if (event.startswith('door=')):
					door_open = event.split('=')
					print("Door Status: " + door_open[1])
					saveDoorStatus(door_open[1])


except KeyboardInterrupt:
		
	print("Program terminated!")

except Exception as err:
	
	print('********** ERROR: {}'.format(err))

finally:
	
	if ser.is_open:
		ser.close()
		
	conn.close()
