package main.server.PT;

import com.google.gson.Gson;
import main.server.Patient.Patient;
import main.server.Server;
import spark.Request;
import spark.Response;

import java.sql.*;
import java.util.ArrayList;

public class PTUtil {

	public static String selectSpecific(Request request, Response response) {
		String toReturn = "";
		try {
			PT pt = new PT(Integer.parseInt(request.queryMap().get("pt_id").value()));
			Gson gson = new Gson();
			toReturn = gson.toJson(pt.getPT());

			System.out.println("PT has been selected");
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

	public static String selectPatients(Request request, Response response) {
		String query = "SELECT * FROM user u JOIN patient p " +
				"ON u.user_id = p.user WHERE p.pt = " + request.queryMap().get("pt_id").value();
		String toReturn = "";

		try (Connection con = DriverManager.getConnection(
				Server.databasePath,
				Server.databaseUsername,
				Server.databasePassword);
			 PreparedStatement pst = con.prepareStatement(query)) {
			ResultSet rs = pst.executeQuery();

			ArrayList<Patient> list = new ArrayList<>();
			while (rs.next()) {
				Patient patient = new Patient(rs.getString("email"),
						rs.getString("f_name"),
						rs.getString("l_name"),
						rs.getString("company"));
				patient.setUser(rs.getInt("user_id"));
				patient.setPatient_id(rs.getInt("patient_id"));
				patient.setPt(rs.getInt("pt"));
				patient.setProspective_pt(rs.getInt("prospective_pt"));
				list.add(patient);
			}
			Gson gson = new Gson();
			toReturn = gson.toJson(list);

			System.out.println("PT's patients have been selected");
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
		// Select all users from "user" whose user_id matches the user_id from a pt
		String query = "SELECT * FROM user INNER JOIN pt ON user.user_id = pt.user";

		try (Connection con = DriverManager.getConnection(
				Server.databasePath,
				Server.databaseUsername,
				Server.databasePassword);
			 PreparedStatement pst = con.prepareStatement(query)) {
			ResultSet rs = pst.executeQuery();

			ArrayList<PT> list = new ArrayList<>();
			while (rs.next()) {
				PT pt = new PT(rs.getString("email"),
						rs.getString("f_name"),
						rs.getString("l_name"),
						rs.getString("company"));
				pt.setUser(rs.getInt("user_id"));
				pt.setPt_id(rs.getInt("pt_id"));
				list.add(pt);
			}
			Gson gson = new Gson();
			toReturn = gson.toJson(list);

			System.out.println("All PT's have been selected");
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

	public static Integer registerPT(Request request) {
		try {
			PT pt = new PT(request.queryMap().get("email").value(),
					request.queryMap().get("f_name").value(),
					request.queryMap().get("l_name").value(),
					request.queryMap().get("company").value());
			pt.createPT();
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
