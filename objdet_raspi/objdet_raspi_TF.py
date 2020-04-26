import time
import datetime
import sqlite3

from TFLite_detection_snapshot import take_snapshot, predict_fridge_snapshot

from collections import Counter


while True:
    # every 30 seconds take snapshot
    time.sleep(30)
    # save a snapshot.jpg image
    take_snapshot()

    # predict based on the snapshot.jpg image
    # example output from prediction: ['orange', 'banana', 'apple']
    snapshot_items = predict_fridge_snapshot()

    print("snapshot_items: ", snapshot_items)

    # count the occurance of items
    items_dict = dict(Counter(snapshot_items))

    # eg snapshot_items:  ['apple', 'apple', 'apple', 'apple', 'apple',
    # 'apple', 'apple', 'apple', 'apple', 'apple']
    # items_dict:  {'apple': 10}

    print("items_dict: ", items_dict)

    attr_str = ""
    value_str = ""
    for k, v in items_dict.items():
        attr_str += (k + ', ')
        value_str += (str(v) + ',')
    
    print(attr_str, value_str)

    timestamp = datetime.datetime.now()

    sql = """
        INSERT INTO
            item ({0} timestamp)
        VALUES (
            {1} '{2}'
        );
    """.format(
        attr_str,
        value_str,
        timestamp
    )
    print("\nSQL: ", sql)

    """
    SQL:  
        INSERT INTO
            item (orange, banana, apple,  timestamp)
        VALUES (
            1,1,1, '2020-04-25 06:15:36.857311'
        );
    """

    # store the data to database
    conn = sqlite3.connect('objdet_raspi_tables.db')
    c = conn.cursor()
    c.execute(sql)
    conn.commit()
    conn.close()
