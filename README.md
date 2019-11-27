create table user (
    email varchar(50) not null primary key ,
    pwd varchar(30) not null ,
    name varchar(30) not null ,
    comment text null
);


-- auto-generated definition
create table board
(
    no       int auto_increment
        primary key,
    email    varchar(50) not null,
    name     varchar(50) not null,
    title    varchar(50) not null,
    content  text        not null,
    postdate varchar(30) not null,
    view     int         not null,
    b_pwd    varchar(30) not null
);

