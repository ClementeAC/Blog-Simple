# Blog Simple realizado utilizando React.js, Node.js y MySQL

## Run Client

In the Client directory, you can run:

### `npm install`

This will install all the Client dependencies. You must do this before running the Project

### `npm start`

This runs the client app.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

## Run Server

In the Server directory, you can run:

### `npm install`

This will install all the Server dependencies. You must do this before running the Project

### `npm start`

This runs the Server on http://localhost:3333

You must change database credentials to match your own and create your tables.

Here are the tables used for this Project:

CREATE TABLE `SCHEMA_NAME`.`TABLE_NAME` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` TEXT(500) NOT NULL,
  `content` LONGTEXT NOT NULL,
  `likes` VARCHAR(45) NULL,
  `authorName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));
  
  CREATE TABLE `SCHEMA_NAME`.`TABLE_NAME` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `userPassword` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `userName_UNIQUE` (`userName` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);
