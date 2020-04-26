import sqlite3
from datetime import datetime
from datetime import timedelta

def insert_data():
    conn = sqlite3.connect('sensor_data')
    c = conn.cursor()
    sql = "INSERT INTO door (door_open, timestamp) VALUES(" + str(1) + ",datetime('now', 'localtime'))"
    c.execute(sql)
    sql = "INSERT INTO door (door_open, timestamp) VALUES(" + str(0) + ",datetime('now', 'localtime'))"
    c.execute(sql)
    conn.commit()

# insert_data()

def get_current_door_status(): 
    door_statuses = []
    
    conn = sqlite3.connect('sensor_data')
    c = conn.cursor()
    sql = 'SELECT door_open, timestamp FROM door ORDER BY timestamp DESC LIMIT 1;'
    c.execute(sql)
    results = c.fetchall()
    print(results)
    for result in results:
        door_statuses.append({"door_open":result[0],"timestamp":result[1]})
    
    conn.close()
    print(door_statuses)
    return door_statuses	



def get_all_door_status(): 
    door_statuses = []
    
    conn = sqlite3.connect('sensor_data')
    c = conn.cursor()
    sql = 'SELECT door_open, timestamp FROM door ;'
    c.execute(sql)
    results = c.fetchall()
    print(results)
    for result in results:
        door_statuses.append({"door_open":result[0],"timestamp":result[1]})
    
    conn.close()
    print(door_statuses)
    return door_statuses	


def get_door_status_range(from_date, to_date): 
    print("from_date: ", from_date)
    print("to_date: ", to_date)
    door_statuses = []
    conn = sqlite3.connect('sensor_data')
    c = conn.cursor()
    if (to_date == ""):
        sql = 'SELECT door_open, timestamp FROM door WHERE timestamp BETWEEN "' + from_date + '" AND datetime("now", "localtime");'
    else:
        sql = 'SELECT door_open, timestamp FROM door WHERE timestamp BETWEEN "' + from_date + '" AND "'+ to_date + '";'
    print(sql)
    c.execute(sql)
    results = c.fetchall()
    print(results)
    for result in results:
        door_statuses.append({"door_open":result[0],"timestamp":result[1]})
    conn.close()
    print(door_statuses)
    return door_statuses	    


def get_times_door_open(from_date, to_date):
    print("from_date: ", from_date)
    print("to_date: ", to_date)
    conn = sqlite3.connect('sensor_data')
    c = conn.cursor()
    # print(to_date == "")
    if (to_date == ""):
        sql = 'SELECT door_open, timestamp FROM door WHERE timestamp BETWEEN "' + from_date + '" AND datetime("now", "localtime") AND door_open = 1;'
    else:
        sql = 'SELECT door_open, timestamp FROM door WHERE timestamp BETWEEN "' + from_date + '" AND "'+ to_date + '" AND door_open = 1;'
    print(sql)
    c.execute(sql)
    results = c.fetchall()
    conn.close()
    return len(results)


def get_duration_door_open(from_date, to_date):
    print("from_date: ", from_date)
    print("to_date: ", to_date)
    door_statuses = []

    conn = sqlite3.connect('sensor_data')
    c = conn.cursor()
    if (to_date == ""):
        sql = 'SELECT door_open, timestamp FROM door WHERE timestamp BETWEEN "' + from_date + '" AND datetime("now", "localtime");'
    else:
        sql = 'SELECT door_open, timestamp FROM door WHERE timestamp BETWEEN "' + from_date + '" AND "'+ to_date + '";'
    print(sql)
    c.execute(sql)
    results = c.fetchall()
    # print(results)
    for result in results: # making a tuple into dict - more readable
        door_statuses.append({"door_open":result[0],"timestamp":result[1]})
    conn.close()
    # print(door_statuses)
    conn.close()

    timeDelta = timedelta()
    start_time = ""
    end_time = ""
    format_string = "%Y-%m-%d %H:%M:%S"
    for stat in door_statuses:
        if (stat["door_open"] == 1):
            start_time = stat["timestamp"]
        if (stat["door_open"] == 0 and start_time != ""):
            end_time = stat["timestamp"]
            # print("start: {} and end: {}".format(start_time, end_time))
            start_time_date = datetime.strptime(start_time, format_string)
            end_time_date = datetime.strptime(end_time, format_string)
            delta = end_time_date - start_time_date 
            timeDelta += delta
            # print(timeDelta)
    
    return timeDelta.total_seconds()