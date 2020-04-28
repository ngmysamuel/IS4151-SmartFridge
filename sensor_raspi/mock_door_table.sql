--sqlite3: .read mock_door_table.sql

DROP TABLE door;

CREATE TABLE door (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    door_open INTEGER DEFAULT 0 NOT NULL,
    timestamp DATETIME NOT NULL,
    tocloud INTEGER DEFAULT 0 NOT NULL
);

-- mock door data
INSERT INTO door (door_open, timestamp) VALUES (1, "2020-04-24 12:00:10");
INSERT INTO door (door_open, timestamp) VALUES (0, "2020-04-24 12:00:45");
INSERT INTO door (door_open, timestamp) VALUES (1, "2020-04-25 12:00:30");
INSERT INTO door (door_open, timestamp) VALUES (0, "2020-04-25 12:00:40");
INSERT INTO door (door_open, timestamp) VALUES (1, "2020-04-25 12:01:30");
INSERT INTO door (door_open, timestamp) VALUES (0, "2020-04-25 12:02:10");
INSERT INTO door (door_open, timestamp) VALUES (1, "2020-04-26 12:02:30");
INSERT INTO door (door_open, timestamp) VALUES (0, "2020-04-26 12:02:45");

INSERT INTO door (door_open, timestamp) VALUES (1, "2020-04-28 17:02:30");
INSERT INTO door (door_open, timestamp) VALUES (0, "2020-04-28 17:02:45");