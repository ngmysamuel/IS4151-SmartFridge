import sqlite3
import serial
from flask import make_response


def get_trackers():
    conn = sqlite3.connect('objdet_raspi_tables.db')
    c = conn.cursor()
    sql = """
        SELECT
            *
        FROM
            tracker
        LIMIT
            100;
    """
    c.execute(sql)

    results = c.fetchall()

    response = []

    for result in results:
        response.append({
            'id': result[0],
            'device_id': result[1],
            'device_name': result[2],
            'district': result[3],
            'temperature': result[4],
            'fever': result[5],
            'intruder': result[6],
            'timestamp': result[7],
        })

    conn.close()

    return response


def get_events():
    conn = sqlite3.connect('objdet_raspi_tables.db')
    c = conn.cursor()
    sql = """
        SELECT
            *
        FROM
            event
        LIMIT
            100;
    """
    c.execute(sql)

    results = c.fetchall()

    response = []

    for result in results:
        response.append({
            'id': result[0],
            'device_id': result[1],
            'device_name': result[2],
            'district': result[3],
            'event': result[4],
            'timestamp': result[5],
        })

    conn.close()

    return response


def update_event_status_txt(type_event, action):
    """
    to control the LED on off three colors

    type_event = 1|2|3, 3 stands for global
    action = 0 | 1
    # readlines() = 'type1: 0\n', 'type2: 0\n', 'global: 0'
    """
    with open('objdet_raspi_event_status.txt', 'r') as reader:
        event_status = reader.readlines()
    # edit the file accordingly
    if type_event == 1:
        # update 'type1: 0\n'
        tmp = list(event_status[0])
        tmp[7] = str(action)
        event_status[0] = ''.join(tmp)
    elif type_event == 2:
        # update 'type2: 0\n'
        tmp = list(event_status[1])
        tmp[7] = str(action)
        event_status[1] = ''.join(tmp)
    elif type_event == 3:
        # update 'global: 0'
        tmp = list(event_status[2])
        tmp[8] = str(action)
        event_status[2] = ''.join(tmp)
    # write to the txt file
    with open('objdet_raspi_event_status.txt', 'w') as writer:
        writer.writelines(event_status)


def activate_global_lockdown():
    print("Edge - activate_global_lockdown")
    ser = serial.Serial(port='/dev/ttyACM0', baudrate=115200, timeout=1)

    def sendCommand(command):
        command = command + '\n'
        ser.write(str.encode(command))

    def waitResponse():
        response = ser.readline()
        response = response.decode('utf-8').strip()
        return response

    commandToTx = 'global=lockdown'
    sendCommand('cmd:' + commandToTx)

    ser.close()

    # update the objdet_raspi_event_status.txt global event
    # for LED control
    update_event_status_txt(3, 1)
    return make_response("global lockdown activated", 200)


def deactivate_local_lockdown():
    print("Edge - activate_global_lockdown")
    ser = serial.Serial(port='/dev/ttyACM0', baudrate=115200, timeout=1)

    def sendCommand(command):
        command = command + '\n'
        ser.write(str.encode(command))

    def waitResponse():
        response = ser.readline()
        response = response.decode('utf-8').strip()
        return response

    commandToTx = 'local=no'
    sendCommand('cmd:' + commandToTx)

    ser.close()
    return make_response("local lockdown deactivated", 200)


def deactivate_global_lockdown():
    print("Edge - activate_global_lockdown")
    ser = serial.Serial(port='/dev/ttyACM0', baudrate=115200, timeout=1)

    def sendCommand(command):
        command = command + '\n'
        ser.write(str.encode(command))

    def waitResponse():
        response = ser.readline()
        response = response.decode('utf-8').strip()
        return response

    commandToTx = 'global=no'
    sendCommand('cmd:' + commandToTx)

    ser.close()

    # update the objdet_raspi_event_status.txt global event
    # for LED control
    update_event_status_txt(3, 0)
    return make_response("global lockdown deactivated", 200)
