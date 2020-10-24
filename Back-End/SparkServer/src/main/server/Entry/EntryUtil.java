package main.server.Entry;

import com.google.gson.Gson;
import main.server.Server;
import spark.Request;
import spark.Response;

import java.sql.*;
import java.util.ArrayList;

public class EntryUtil {

	public static String selectSpecific(Request request, Response response) {
		String toReturn = "";
		try {
			Entry entry = new Entry(Integer.parseInt(request.queryMap().get("entry_id").value()));
			Gson gson = new Gson();
			toReturn = gson.toJson(entry.getDBEntry());

			System.out.println("Entry has been selected");
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

	public static String selectAll(Request request, Response response) {
		String toReturn = "";
		String query = "SELECT * FROM entry WHERE patient = " + Integer.parseInt(request.queryMap().get("patient_id").value());

		try (Connection con = DriverManager.getConnection(
				Server.databasePath,
				Server.databaseUsername,
				Server.databasePassword);
			 PreparedStatement pst = con.prepareStatement(query)) {
			ResultSet rs = pst.executeQuery();

			ArrayList<Entry> list = new ArrayList<>();
			while (rs.next()) {
				Entry entry = new Entry(rs.getString("entry"),
						rs.getTimestamp("created_on"),
						rs.getInt("patient"));
				entry.setEntry_id(rs.getInt("entry_id"));
				list.add(entry);
			}
			Gson gson = new Gson();
			toReturn = gson.toJson(list);

			System.out.println("All entries have been selected");
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

	public static Integer registerEntry(Request request) {
		// TODO: are we using this endpoint to create the "created_on" time?
		try {
			Entry entry = new Entry(request.queryMap().get("entry").value(),
					Timestamp.valueOf(request.queryMap().get("created_on").value()),
					Integer.parseInt(request.queryMap().get("patient_id").value()));
			entry.createEntry();
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
