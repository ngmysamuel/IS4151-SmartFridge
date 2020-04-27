import sqlite3
from flask import send_file, jsonify

from TFLite_detection_snapshot import take_snapshot, predict_fridge_snapshot
from collections import Counter

import base64

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
            timestamp > '{0}'
            AND
            timestamp < '{1}';
    """.format(from_date, to_date)

    print("\nSQL: ", sql)

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


def get_snapshot():
    take_snapshot(adhoc=True)
    # encode the predicted img in base64
    with open('adhoc.jpg', "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read())
    # print(encoded_string)

    response = {}

    response["ori_image"] = encoded_string

    # print("response: ", response)

    return jsonify(response)


def get_predicted_snapshot():
    snapshot_items = predict_fridge_snapshot(adhoc=True)

    print("snapshot_items: ", snapshot_items)

    # count the occurance of items
    items_dict = dict(Counter(snapshot_items))

    # eg snapshot_items:  ['apple', 'apple', 'apple', 'apple', 'apple',
    # 'apple', 'apple', 'apple', 'apple', 'apple']
    # items_dict:  {'apple': 10}

    print("items_dict: ", items_dict)

    # encode the predicted img in base64
    with open('adhoc-pred.jpg', "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read())
    # print(encoded_string)

    response = {}

    response["image"] = encoded_string
    response["items"] = items_dict

    # print("response: ", response)

    return jsonify(response)
