##Backend

To use this backend make sure to set the database username and password into your environment variables. In IntelliJ this can be done from the "edit configuration" window, and the keys can be found on Server.java. See Brooke or Jarret for the username and password. In IntelliJ, you should also make sure to set the Database. This can be done from the "Data Sources and Drivers" window. The host is `portaldb.cciebyoevg9q.us-west-1.rds.amazonaws.com`, the port is 3306, and the Database should be called portalDB.

Once those values have been set, run Server. In a browser, go to http://localhost:8080/api/database/version to test the connection. If you see "MySQL Version 8.0.20" then success!

To see an example user payload, query http://localhost:8080/api/example/user

To add a PT to the database, the api endpoint to use is `/api/pt/register` with the query parameters `email, f_name, l_name, company`.
To retrieve all users who are PT's, use the endpoint `/api/pt/all`.