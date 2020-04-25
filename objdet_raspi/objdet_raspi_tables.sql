-- sudo apt-get install sqlite3
-- sqlite3 objdet_raspi_tables.db

/* detecting for 10 classes in item:
    "banana",
    "apple",
    "sandwich",
    "orange",
    "broccoli",
    "carrot",
    "hot dog",
    "pizza",
    "donut",
    "cake"
*/

CREATE TABLE item (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    banana INTEGER DEFAULT 0 NOT NULL,
    apple INTEGER DEFAULT 0 NOT NULL,
    sandwich INTEGER DEFAULT 0 NOT NULL,
    orange INTEGER DEFAULT 0 NOT NULL,
    broccoli INTEGER DEFAULT 0 NOT NULL,
    carrot INTEGER DEFAULT 0 NOT NULL,
    hot_dog INTEGER DEFAULT 0 NOT NULL,
    pizza INTEGER DEFAULT 0 NOT NULL,
    donut INTEGER DEFAULT 0 NOT NULL,
    cake INTEGER DEFAULT 0 NOT NULL,
    timestamp DATETIME NOT NULL,
    tocloud INTEGER DEFAULT 0 NOT NULL
);

-- sample data for testing

-- no item inserted, just the timestamp
INSERT INTO item (
    timestamp)
VALUES(
    datetime('now', 'localtime')
);
-- update apple to 2
INSERT INTO item (
    apple,
    timestamp)
VALUES(
    2,
    datetime('now', 'localtime')
);
