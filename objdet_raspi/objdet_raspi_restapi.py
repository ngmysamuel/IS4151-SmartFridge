import sqlite3
from flask import send_file

database_file = 'objdet_raspi_tables.db'


def get_current_items():
    conn = sqlite3.connect(database_file)
    c = conn.cursor()
    sql = """
        SELECT
            *
        FROM
            item
        ORDER BY
            id DESC
        LIMIT
            1;
    """
    c.execute(sql)

    results = c.fetchall()

    response = []

    for result in results:
        response.append({
            'id': result[0],
            "banana": result[1],
            "apple": result[2],
            "sandwich": result[3],
            "orange": result[4],
            "broccoli": result[5],
            "carrot": result[6],
            "hot_dog": result[7],
            "pizza": result[8],
            "donut": result[9],
            "cake": result[10],
            'timestamp': result[11],
        })

    conn.close()

    return response


def get_all_items():
    conn = sqlite3.connect(database_file)
    c = conn.cursor()
    sql = """
        SELECT
            *
        FROM
            item;
    """
    c.execute(sql)

    results = c.fetchall()

    response = []

    for result in results:
        response.append({
            'id': result[0],
            "banana": result[1],
            "apple": result[2],
            "sandwich": result[3],
            "orange": result[4],
            "broccoli": result[5],
            "carrot": result[6],
            "hot_dog": result[7],
            "pizza": result[8],
            "donut": result[9],
            "cake": result[10],
            'timestamp': result[11],
        })

    conn.close()

    return response


def get_items_range(from_date, to_date):
    print(from_date, to_date)
    conn = sqlite3.connect(database_file)
    c = conn.cursor()
    sql = """
        SELECT
            *
        FROM
            item
        WHERE
            timestamp > {0}
            AND
            timestamp < {1};
    """.format(from_date, to_date)
    c.execute(sql)

    print("\nSQL: ", sql)

    results = c.fetchall()

    response = []

    for result in results:
        response.append({
            'id': result[0],
            "banana": result[1],
            "apple": result[2],
            "sandwich": result[3],
            "orange": result[4],
            "broccoli": result[5],
            "carrot": result[6],
            "hot_dog": result[7],
            "pizza": result[8],
            "donut": result[9],
            "cake": result[10],
            'timestamp': result[11],
        })

    conn.close()

    return response


def get_snapshot():
    return send_file('test1.jpg', mimetype='image/jpeg')


def get_predicted_snapshot():
    return send_file('test1-pred.jpg', mimetype='image/jpeg')