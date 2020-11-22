CREATE TABLE guests
(
    guestId SERIAL PRIMARY KEY,
    guestName VARCHAR(20) NOT NULL,
    guestLastname VARCHAR(20),
    guestCode VARCHAR(6) NOT NULL,
    guestNumber INT NOT NULL
);

CREATE TABLE users
(
    userId SERIAL PRIMARY KEY,
    displayName VARCHAR(20) NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);