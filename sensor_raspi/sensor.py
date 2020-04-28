import sqlite3

# For the web page

def door_read():
	door_status = []
	conn = sqlite3.connect('sensor_data')
	c = conn.cursor()
	sql = 'SELECT door_open, timestamp FROM door ORDER BY timestamp DESC LIMIT 10;'
	c.execute(sql)
	results = c.fetchall()
	
	for result in results:	
		if result[0] == 0:
			status = 'CLOSE'
		else:
			status = 'OPEN'
		door_status.append({'door_open':status,'timestamp':result[1],})
	
	conn.close()
	return door_status	

def temperature_read():
	temperature = []
	conn = sqlite3.connect('sensor_data')
	c = conn.cursor()
	sql = 'SELECT temperature, timestamp FROM temperature ORDER BY timestamp DESC LIMIT 10;'
	c.execute(sql)
	results = c.fetchall()
	
	for result in results:
		temperature.append({'temperature':result[0],'timestamp':result[1],})
	
	conn.close()
	
	return temperature	
	
