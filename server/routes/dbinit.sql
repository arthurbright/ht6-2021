SET sql_safe_updates = FALSE; 

USE defaultdb;
DROP DATABASE IF EXISTS kindling CASCADE;
CREATE DATABASE IF NOT EXISTS kindling;
USE kindling;

CREATE TABLE rooms (
    id UUID PRIMARY KEY,
    join_code TEXT,
    user_count_total INT,
    user_count_responded INT,
    accepting_responses BOOLEAN,
    expiry TIMESTAMP,
    host_email TEXT,

    /* JSON OBJECTS */
    room_parameters TEXT,
    recommendations TEXT
);


/*
INSERT INTO rooms (id, join_code, user_count_total, user_count_responded, accepting_responses, expiry, host_email, room_parameters, recommendations) VALUES
    ('1ffbea26-c930-4222-bbd6-11fc988fc889', 'ABCD', 5, 3, true, '2021-08-21 20:01:54.280', 'kevin203@gmail.com', '', '');
*/


/*
SELECT join_code FROM rooms WHERE user_count_total = 5;



*/