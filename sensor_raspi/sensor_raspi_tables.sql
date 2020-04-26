CREATE TABLE temperature (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    temperature INTEGER DEFAULT 25 NOT NULL,
    timestamp DATETIME NOT NULL,
    tocloud INTEGER DEFAULT 0 NOT NULL
);

CREATE TABLE door (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    door_open INTEGER DEFAULT 0 NOT NULL,
    timestamp DATETIME NOT NULL,
    tocloud INTEGER DEFAULT 0 NOT NULL
);


SELECT * FROM temperature;
SELECT * FROM door;

select * from door where door_open = 1;
SELECT door_open, timestamp FROM door WHERE timestamp BETWEEN "2020-04-25 20:41:26" AND "2020-04-25 20:43:04" AND door_open = 1;
INSERT INTO door (door_open, timestamp) VALUES (1, "2020-04-26 12:02:30");
INSERT INTO door (door_open, timestamp) VALUES (0, "2020-04-26 12:02:45");

DELETE FROM temperature;

DROP TABLE temperature;

sqlite3 sensor_data;