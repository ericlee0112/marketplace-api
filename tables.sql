create table users(
  ID SERIAL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(50),
  password TEXT NOT NULL,
  username TEXT NOT NULL UNIQUE,
  account_balance INT
);

create table listings(
  ID SERIAL PRIMARY KEY,
  user_id SERIAL REFERENCES users(ID),
  description TEXT NOT NULL,
  title TEXT NOT NULL,
  created_at TIMESTAMP
);

create table conversations(
  ID SERIAL PRIMARY KEY,
  participant_id_1 SERIAL REFERENCES users(ID),
  participant_id_2 SERIAL REFERENCES users(ID)
);

create table messages(
  ID SERIAL PRIMARY KEY,
  conversation_id SERIAL REFERENCES conversations(ID),
  author_id SERIAL REFERENCES users(ID),
  content TEXT NOT NULL
)