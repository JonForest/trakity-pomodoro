CREATE TYPE pomodoro_status AS ENUM ('started', 'stopped', 'finished');

CREATE TABLE pomodoros (
    id serial PRIMARY KEY,
    user_id int,
    start timestamp with time zone DEFAULT now() NOT NULL,
    status pomodoro_status DEFAULT 'started'
);