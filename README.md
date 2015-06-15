# aurora
Project Aurora

A file based instance of HSQLDB is created and populated with 200 sample users. 
See applicationContext.xml for db setup
See system.properties for db related flags
The resource exposed is UserResource with 2 sample methods. These will be filled in.

The application is deployed on Jetty server, which is set to run on port 9091 (see pom.xml).
The application is start by running "mvn install". Go to localhost:9091 to access this.

