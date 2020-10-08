CREATE DATABASE IF NOT EXISTS testRaulHerrera;

USE testRaulHerrera;

CREATE TABLE users(
    id INT(11) NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE articles (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE pay_order (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE pay_article_relation (
        id INT(11) NOT NULL AUTO_INCREMENT,
        order_id INT NOT NULL,
        article_id INT NOT NULL,
        PRIMARY KEY (id)
);


ALTER TABLE pay_article_relation
ADD CONSTRAINT FK_pay_order
FOREIGN KEY (order_id) REFERENCES pay_order(id);

ALTER TABLE pay_article_relation
ADD CONSTRAINT FK_article
FOREIGN KEY (article_id) REFERENCES articles(id);

/* queries opcionales */

insert into articles (name, description) values ('test1','descripcion del test1');
insert into articles (name, description) values ('test2','descripcion del test2');
insert into articles (name, description) values ('test3','descripcion del test3');

insert into pay_order (name, description, date) values ('test-orden1','descripcion de la compra test-1','2020-10-6');

insert into pay_article_relation (order_id, article_id) values(1,1);
insert into pay_article_relation (order_id, article_id) values(1,2);
insert into pay_article_relation (order_id, article_id) values(1,3);