package main.server;

import com.google.gson.Gson;
import main.server.PT.*;
import main.server.Activity.*;
import main.server.Patient.*;
import main.server.Entry.*;
import main.server.Assignment.*;
import main.server.Contain.*;

import java.sql.*;

import static spark.Spark.*;

public class Server {
	public static final String databasePath = "jdbc:mysql://portaldb.cciebyoevg9q.us-west-1.rds.amazonaws.com:3306/portalDB";

	public static final String databaseUsername = "admin";
	public static final String databasePassword = "Csc648Team2";

	public static void main(String[] args) {

		port(8080);

		options("/*",
				(request, response) -> {

					String accessControlRequestHeaders = request
							.headers("Access-Control-Request-Headers");
					if (accessControlRequestHeaders != null) {
						response.header("Access-Control-Allow-Headers",
								accessControlRequestHeaders);
					}

					String accessControlRequestMethod = request
							.headers("Access-Control-Request-Method");
					if (accessControlRequestMethod != null) {
						response.header("Access-Control-Allow-Methods",
								accessControlRequestMethod);
					}

					return "OK";
				});

		before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));
		System.out.println("Starting server on port 8080");

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
				//Requires pt and patient query fields to get all activity between the two
				get("/id", ActivityUtil::selectSpecific);
				//Literally returns all data, for now
				get("/all", (request, response) -> ActivityUtil.selectAll(response));
				post("/register", (request, response) -> {
					response.status(ActivityUtil.registerActivity(request));
					return response.status();
				});
			});

			path("/assign", () -> {
				//Requires patient in query to find workout indices
				get("/id", AssignmentUtil::selectSpecific);
				//Requires patient in query to find all details, assignment, workout, and exercises
				get("/all", AssignmentUtil::selectAllData);
				//Requires old assignment_id (0 or -1 if not available), pt, workout, and patient
				post("/register", (request, response) -> {
					response.status(AssignmentUtil.registerAssignment(request));
					return response.status();
				});
			});

			path("/workout", () -> {
				//Requires workout_id in query to find exercises
				get("/id", ContainUtil::selectExercises);
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
