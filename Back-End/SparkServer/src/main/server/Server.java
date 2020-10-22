package main.server;

import com.google.gson.Gson;
import main.server.PT.*;

import java.sql.*;

import static spark.Spark.*;

public class Server {
	public static final String databasePath = "jdbc:mysql://portaldb.cciebyoevg9q.us-west-1.rds.amazonaws.com:3306/portalDB";
	public static final String databaseUsername = System.getenv("PORTALDB_USERNAME");
	public static final String databasePassword = System.getenv("PORTALDB_PASSWORD");

	public static void main(String[] args) {
		port(8080);

		path("/api", () -> {
			before("/*", (q, a) -> System.out.println("Received api call"));
			path("/pt", () -> {
				get("/all", (request, response) -> PTUtil.selectAll(response));
				post("/register", (request, response) -> {
					response.status(PTUtil.registerPT(request));
					return response.status();
				});
			});

			path("/database", () -> get("/version", (request, response) -> databaseVersion()));

			// Example get request and response
			path("/example", () -> get("/user", (request, response) -> {
				response.status(200);
				response.type("application/json");
				PT pt = new PT("test@mail.com",
						"john",
						"doe",
						"some company inc.");
				Gson gson = new Gson();
				return gson.toJson(pt);
			}));
		});
	}

	private static String databaseVersion() {
		String query = "SELECT VERSION()";
		String toReturn = "not initialized";

		try (
				Connection con = DriverManager.getConnection(
						Server.databasePath,
						Server.databaseUsername,
						Server.databasePassword);
				Statement st = con.createStatement();
				ResultSet rs = st.executeQuery(query)) {
			if (rs.next()) {
				toReturn = "MySQL Version " + rs.getString(1);
			}
		} catch (SQLException ex) {
			toReturn = ex.toString();
		}

		return toReturn;
	}
}
