package main.server.PT;

import com.google.gson.Gson;
import main.server.Server;
import spark.Request;
import spark.Response;

import java.sql.*;
import java.util.ArrayList;

public class PTUtil {

	public static String selectAll(Response response) {
		String toReturn = "";
		// Select all users from "user" whose user_id matches the user_id from a pt
		String query = "SELECT * FROM user INNER JOIN pt p on user.user_id = p.user";

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
		} catch (SQLException ex) {
			response.status(500);
		} catch (Exception e) {
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
			return 500;
		} catch (Exception ex) {
			return 400;
		}
	}
}
