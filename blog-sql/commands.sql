CREATE TABLE blogs (id SERIAL PRIMARY KEY, author text, url text NOT NULL, title text NOT NULL, likes integer DEFAULT 0);

insert into blogs(author, url, title) values ('asdfasdf', 'https://cnn.com', 'How robots advanced');

insert into blogs(author, url, title) values ('rtyusty', 'https://wsj.com', 'how robots failed');