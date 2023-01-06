DROP TABLE IF EXISTS users;

create table users (
  id serial primary key,
  user_id int,
  username varchar(12)
)