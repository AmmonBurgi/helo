alter table users
alter password
set data type text;

create table users (
id serial primary key,
username varchar(20),
password text,
profile_pic TEXT
);

create table posts (
id serial primary key,
title varchar(45),
img text,
content text,
author_id integer references users (id)
);