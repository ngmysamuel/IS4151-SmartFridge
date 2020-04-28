--sqlite3: .read mock_temperature_table.sql

DROP TABLE temperature;

CREATE TABLE temperature (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    temperature INTEGER DEFAULT 25 NOT NULL,
    timestamp DATETIME NOT NULL,
    tocloud INTEGER DEFAULT 0 NOT NULL
);

-- mock temperature data
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:00:00");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:00:10");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:00:20");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:00:30");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:00:40");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:00:50");

INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:01:00");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:01:10");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:01:20");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:01:30");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:01:40");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:01:50");

INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:02:00");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:02:10");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:02:20");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:02:30");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:02:40");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:02:50");

INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:03:00");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:03:10");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:03:20");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:03:30");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:03:40");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:03:50");

INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:04:00");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:04:10");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:04:20");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:04:30");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:04:40");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:04:50");

INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:05:00");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:05:10");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:05:20");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:05:30");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:05:40");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:05:50");

INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:06:00");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:06:10");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:06:20");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:06:30");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:06:40");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:06:50");

INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:07:00");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:07:10");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:07:20");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:07:30");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:07:40");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:07:50");

INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:08:00");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:08:10");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:08:20");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:08:30");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:08:40");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:08:50");

INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:09:00");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:09:10");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:09:20");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:09:30");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:09:40");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:09:50");

INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:10:00");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:10:10");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:10:20");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:10:30");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:10:40");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:10:50");

INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:11:00");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:11:10");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:11:20");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:11:30");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:11:40");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:11:50");

INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:12:00");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:12:10");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:12:20");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:12:30");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:12:40");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-25 00:12:50");

INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-28 17:10:00");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-28 17:12:00");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-28 17:13:00");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-28 17:14:00");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-28 17:15:00");
INSERT INTO temperature (temperature, timestamp) VALUES (25, "2020-04-28 17:16:00");