--Table must be created before deploying.
create TABLE users (id bigint generated by default as identity (start with 1),
  firstName VARCHAR(20), lastName VARCHAR(20), state VARCHAR(20), pa VARCHAR(2), city VARCHAR(50), zip VARCHAR(15));