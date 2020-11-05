package main.server.Patient;

import com.google.gson.Gson;
import main.server.Server;
import spark.Request;
import spark.Response;

import java.sql.*;
import java.util.ArrayList;

public class PatientUtil {

	public static String selectSpecific(Request request, Response response) {
		String toReturn = "";
		try {
			Patient patient = new Patient(Integer.parseInt(request.queryMap().get("patient_id").value()));
			Gson gson = new Gson();
			toReturn = gson.toJson(patient.getPatient());

			System.out.println("Patient has been selected");
			response.type("application/json");
			response.status(200);
		} catch (SQLException sqlEx) {
			System.err.println(sqlEx.toString());
			response.status(500);
		} catch (Exception ex) {
			System.err.println(ex.toString());
			response.status(400);
		}
		return toReturn;
	}

	public static String selectAll(Response response) {
		String toReturn = "";
		// Select all users from "user" whose user_id matches the user_id from a patient
		String query = "SELECT * FROM user INNER JOIN patient ON user.user_id = patient.user";

		try (Connection con = DriverManager.getConnection(
				Server.databasePath,
				Server.databaseUsername,
				Server.databasePassword);
			 PreparedStatement pst = con.prepareStatement(query)) {
			ResultSet rs = pst.executeQuery();

			ArrayList<Patient> list = new ArrayList<>();
			while (rs.next()) {
				Patient patient = new Patient(rs.getString("email"),
						rs.getString("password"),
						rs.getString("f_name"),
						rs.getString("l_name"),
						rs.getString("company"));
				patient.setPatient_id(rs.getInt("patient_id"));
				patient.setUser(rs.getInt("user_id"));
				patient.setPt(rs.getInt("pt"));
				patient.setProspective_pt(rs.getInt("prospective_pt"));
				list.add(patient);
			}
			Gson gson = new Gson();
			toReturn = gson.toJson(list);

			System.out.println("All Patients have been selected");
			response.type("application/json");
			response.status(200);
		} catch (SQLException sqlEx) {
			System.err.println(sqlEx.toString());
			response.status(500);
		} catch (Exception ex) {
			System.err.println(ex.toString());
			response.status(400);
		}
		return toReturn;
	}

	public static Integer registerPatient(Request request) {
		try {
			Patient patient = new Patient(request.queryMap().get("email").value(),
					request.queryMap().get("password").value(),
					request.queryMap().get("f_name").value(),
					request.queryMap().get("l_name").value(),
					request.queryMap().get("company").value());
			patient.createPatient();
			return 200;
		} catch (SQLException sqlEx) {
			System.err.println(sqlEx.toString());
			return 500;
		} catch (Exception ex) {
			System.err.println(ex.toString());
			return 400;
		}
	}

	public static Integer attachTherapist(Request request) {
		try {
			Patient patient = new Patient(Integer.parseInt(request.queryMap().get("patient_id").value()));
			patient.getPatient()
					.updatePatient(
							Integer.parseInt(request.queryMap().get("pt").value()),
							Integer.parseInt(request.queryMap().get("prospective_pt").value()));
			return 200;
		} catch (SQLException sqlEx) {
			System.err.println(sqlEx.toString());
			return 500;
		} catch (Exception ex) {
			System.err.println(ex.toString());
			return 400;
		}
	}
}
