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
    b_pwd    varchar(30) not null,
    foreign key(email) references user(email) 
    on delete cascade
);

-- auto-generated definition
create table reply
(
    no        int auto_increment
        primary key,
    ref       int         not null,
    r_content text        not null,
    postdate  varchar(30) not null,
    name      varchar(30) not null,
    foreign key(ref) references board(no) 
    on delete cascade
);

//닷지 게임 테이블
create table dodge(
    email    varchar(50) not null,
    name     varchar(50) not null,
    score    int not null,
    foreign key(email) references user(email) 
    on delete cascade
);

// 데저트워 게임 테이블
create table desertwar(
    email    varchar(50) not null,
    name     varchar(50) not null,
    score    int not null,
    foreign key(email) references user(email) 
    on delete cascade
);

// 캣치 마인드 게임테이블
create table cmm(
    email    varchar(50) not null,
    name     varchar(50) not null,
    score    int not null,
    foreign key(email) references user(email) 
    on delete cascade
);
