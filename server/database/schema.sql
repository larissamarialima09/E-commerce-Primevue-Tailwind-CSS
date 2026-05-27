CREATE TABLE categories (
  id UUID PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE products (
  id UUID PRIMARY KEY,
  name VARCHAR(120) NOT NULL UNIQUE,
  price DECIMAL(10, 2) NOT NULL CHECK (price > 0),
  stock INTEGER NOT NULL CHECK (stock >= 0),
  category_id UUID NOT NULL REFERENCES categories(id)
);

CREATE TABLE users (
  id UUID PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'customer'))
);
