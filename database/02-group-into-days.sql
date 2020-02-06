select date_trunc('day', start at time zone '-13:00') as dte,  count(*)
from pomodoros
where user_id = -1 and status='finished'
group by date_trunc('day', start at time zone '-13:00')
order by dte;

CREATE OR REPLACE FUNCTION get_days(userid integer, time_zone_offset text)
RETURNS TABLE (
    dte timestamp,
    cnt bigint)
AS $$
BEGIN
select date_trunc('day', start at time zone time_zone_offset) as dte,  count(*) as cnt
from pomodoros
where user_id = userid and status='finished'
group by date_trunc('day', start at time zone time_zone_offset)
order by dte;
END; $$
LANGUAGE 'plpgsql' STABLE;


CREATE OR REPLACE FUNCTION get_days(userid integer, time_zone_offset text)
RETURNS SETOF days AS $$
BEGIN
select date_trunc('day', start at time zone time_zone_offset) as dte,  count(*) as cnt
from pomodoros
where user_id = userid and status='finished'
group by date_trunc('day', start at time zone time_zone_offset)
order by dte;
END; $$
LANGUAGE 'plpgsql' STABLE;
