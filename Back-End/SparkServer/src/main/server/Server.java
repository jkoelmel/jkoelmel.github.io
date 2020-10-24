package main.server;

import com.google.gson.Gson;

import main.server.Entry.EntryUtil;
import main.server.Activity.ActivityUtil;
import main.server.PT.*;
import main.server.Patient.PatientUtil;

import java.sql.*;

import static spark.Spark.*;

public class Server {
	public static final String databasePath = "jdbc:mysql://portaldb.cciebyoevg9q.us-west-1.rds.amazonaws.com:3306/portalDB";
	public static final String databaseUsername = "admin";
	public static final String databasePassword = "Csc648Team2";

	public static void main(String[] args) {
		System.out.println("Starting server on port 8080");
		port(8080);

		path("/api", () -> {
			before("/*", (q, a) -> System.out.println("Received api call"));

			path("/pt", () -> {
				get("/id", PTUtil::selectSpecific);
				get("/all", (request, response) -> PTUtil.selectAll(response));
				get("/patients", PTUtil::selectPatients);
				post("/register", (request, response) -> {
					response.status(PTUtil.registerPT(request));
					return response.status();
				});
			});

			path("/patient", () -> {
				get("/id", PatientUtil::selectSpecific);
				get("/all", (request, response) -> PatientUtil.selectAll(response));
				post("/register", (request, response) -> {
					response.status(PatientUtil.registerPatient(request));
					return response.status();
				});
				put("/update-pt", (request, response) -> {
					response.status(PatientUtil.attachTherapist(request));
					return response.status();
				});

				path("/entry", () -> {
					get("/id", EntryUtil::selectSpecific);
					get("/all", EntryUtil::selectAll);
					post("/register", (request, response) -> {
						response.status(EntryUtil.registerEntry(request));
						return response.status();
					});
				});
			});

			path("/activity", () -> {
				get("/id", ActivityUtil::selectSpecific);
				get("/all", (request, response) -> ActivityUtil.selectAll(response));
				post("/register", (request, response) -> {
					response.status(ActivityUtil.registerActivity(request));
					return response.status();
				});
			});

			path("/company", () -> {
				// TODO

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

			after("/*", (q, a) -> System.out.println("API call completed"));

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
