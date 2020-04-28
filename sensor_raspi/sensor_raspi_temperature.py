import sqlite3

def insert_data():
    conn = sqlite3.connect('sensor_data')
    c = conn.cursor()
    sql = "INSERT INTO temperature (temperature, timestamp) VALUES(" + str(36) + ",datetime('now', 'localtime'))"
    c.execute(sql)
    conn.commit()

# insert_data()

def get_current_temperature(): 
    temperatures = []
    
    conn = sqlite3.connect('sensor_data')
    c = conn.cursor()
    sql = 'SELECT temperature, timestamp FROM temperature ORDER BY timestamp DESC LIMIT 1;'
    c.execute(sql)
    results = c.fetchall()
    print("results: ", results)
    for result in results:
        temperatures.append({"temperature":result[0],"timestamp":result[1]})
    
    conn.close()
    print("temperatures: ", temperatures)
    return temperatures	



def get_all_temperature(): 
    temperatures = []
    
    conn = sqlite3.connect('sensor_data')
    c = conn.cursor()
    sql = 'SELECT temperature, timestamp FROM temperature ;'
    c.execute(sql)
    results = c.fetchall()
    print("results: ", results)
    for result in results:
        temperatures.append({"temperature":result[0],"timestamp":result[1]})
    
    conn.close()
    print("temperatures: ", temperatures)
    return temperatures	


def get_temperature_range(from_date, to_date): 
    print("from_date: ", from_date)
    print("to_date: ", to_date)
    temperatures = []
    
    conn = sqlite3.connect('sensor_data')
    c = conn.cursor()
    sql = 'SELECT temperature, timestamp FROM temperature WHERE timestamp BETWEEN "' + from_date + '" AND "'+ to_date + '";'
    print("sql: ", sql)
    c.execute(sql)
    results = c.fetchall()
    print("results: ", results)
    for result in results:
        temperatures.append({"temperature":result[0],"timestamp":result[1]})
    
    conn.close()
    print("temperatures: ", temperatures)
    return temperatures	



# get_temperature_range("2020-04-25","2020-04-25")    