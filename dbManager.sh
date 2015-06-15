#This is a convenience script to launch HSQLDB's db consoled.
#The location assumes the standard repository location and hardcodes the current
#version of hsqldb. Update this as necessaryl 
java -cp $HOME/.m2/repository/org/hsqldb/hsqldb/2.3.2/hsqldb-2.3.2.jar org.hsqldb.util.DatabaseManager &

