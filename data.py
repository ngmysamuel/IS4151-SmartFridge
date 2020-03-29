from datetime import datetime
import json
import MySQLdb
import MySQLdb.cursors

#change the variables here to use your own database (probably: user,passwd and db)
#I am also using the table: checkingaccount. So you will need to change the SQL querys below as well.
conn = MySQLdb.connect(user="root", passwd="root", host="localhost",
                       db="test", cursorclass=MySQLdb.cursors.DictCursor)


def getData():
    global conn
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * from checkingaccount")
            data = cursor.fetchall()
            #Depending on how we want to form the tables, this for loop will have to change to format the data (into {key:value}) we get from DB
            for r in data:
                bal = str(r["BALANCE"])
                r["BALANCE"] = bal
                print(r)
                print(r["BALANCE"])
                print()
            #this makes the resulting formatted data into an actual JSON string array
            data = str(data)
            data = data.replace("'", '"')
            data = data.strip("()")
            data = "["+data+"]"
            print(data)
            return data

    finally:
        print()
        # conn.close()


def postData(person):
    #person is defined in the parameter in the yml
    global conn
    CHECKINGACCOUNTID = person.get('CHECKINGACCOUNTID', None)
    ACCOUNTNAME = person.get('ACCOUNTNAME', None)
    BALANCE = person.get('BALANCE', None)
    print(BALANCE)
    try:
        with conn.cursor() as cursor:
            sql = 'INSERT INTO checkingaccount (CHECKINGACCOUNTID, ACCOUNTNAME, BALANCE) VALUES (%s, %s, %s)'
            val = (CHECKINGACCOUNTID, ACCOUNTNAME, BALANCE)
            print(val)
            cursor.execute(sql, val)

            print(cursor.rowcount, 'record inserted.')
            conn.commit()
            #passing back the new list of data
            data = getData()
            return data

    finally:
        print()
    #     conn.close()


def deleteData(person):
    #person is defined in the parameter in the yml
    global conn
    CHECKINGACCOUNTID = person.get('CHECKINGACCOUNTID', None)
    BALANCE = person.get('BALANCE', None)
    print(BALANCE)
    try:
        with conn.cursor() as cursor:
            sql = 'DELETE FROM checkingaccount WHERE CHECKINGACCOUNTID = %s;'
            val = (CHECKINGACCOUNTID,)
            print(val)
            cursor.execute(sql, val)

            print(cursor.rowcount, 'record deleted.')
            conn.commit()

    finally:
        print()
    #     conn.close()
