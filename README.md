# DNDRunner


Testing DB
----------

```
CREATE ROLE testdnd WITH PASSWORD 'testdnd';

ALTER ROLE testdnd LOGIN SUPERUSER CREATEDB;

CREATE DATABASE testdnd OWNER testdnd;
```