-- Create databases which are not automatically created out of the code
CREATE DATABASE ippr;
CREATE DATABASE ippr_security;

-- Create User for the services to access the DB
CREATE USER 'ippr'@'localhost' IDENTIFIED BY 'Pa$$w0rd';
GRANT ALL PRIVILEGES ON * . * TO 'ippr'@'localhost';
CREATE USER 'ippr'@'%' IDENTIFIED BY 'Pa$$w0rd';
GRANT ALL PRIVILEGES ON * . * TO 'ippr'@'%';
FLUSH PRIVILEGES;

