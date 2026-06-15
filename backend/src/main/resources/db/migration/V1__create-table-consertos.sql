CREATE TABLE consertos(
    id bigint not null auto_increment,
    entrada varchar(100) not null,
    saida varchar(100),
    nome varchar(100),
    experiencia varchar(10),
    marca varchar(100) not null,
    modelo varchar(100) not null,
    ano varchar(100) not null,

    CONSTRAINT CONSERTO_PK primary key(id)
);