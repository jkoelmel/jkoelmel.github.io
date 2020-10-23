package main.server.PT;

import main.server.Patient.Patient;
import main.server.Server;
import main.server.User.User;

import java.sql.*;

public class PT extends User {
	private Integer pt_id;
	private Integer user;

	public PT(String email, String f_name, String l_name, String company) {
		super(email, f_name, l_name, company);
	}

	public PT(Integer pt_id) {
		this.pt_id = pt_id;
	}

	public void createPT() throws Exception {
		String userQuery = "INSERT INTO user(user_id, email, f_name, l_name, company) VALUES(NULL, ?, ?, ?, ?);";
		String ptQuery = "INSERT INTO pt(pt_id, user) VALUES(NULL, LAST_INSERT_ID())";

		try (Connection con = DriverManager.getConnection(
				Server.databasePath,
				Server.databaseUsername,
				Server.databasePassword);
			 PreparedStatement pst = con.prepareStatement(userQuery)) {

			// INSERT the PT into user
			pst.setString(1, getEmail());
			pst.setString(2, getF_name());
			pst.setString(3, getL_name());
			pst.setString(4, getCompany());
			pst.executeUpdate();

			// INSERT the PT into pt
			pst.executeUpdate(ptQuery);
			System.out.println("PT added to database");
		} catch (SQLException ex) {
			throw new Exception("Error inserting user/pt: " + ex.toString());
		}
	}


	public PT getPT() throws Exception {
		 String ptQuery = "SELECT * FROM user INNER JOIN pt ON pt.pt_id = " + this.pt_id;
//		String ptQuery = "SELECT * FROM pt WHERE pt_id = " + this.pt_id;

		try (Connection con = DriverManager.getConnection(
				Server.databasePath,
				Server.databaseUsername,
				Server.databasePassword);
			 PreparedStatement pst = con.prepareStatement(ptQuery)) {
			pst.executeQuery(ptQuery);

			ResultSet rs = pst.executeQuery();
			if (rs.next()) {
				setPt_id(rs.getInt("pt_id"));
				setUser(rs.getInt("user"));
			}
		} catch (SQLException ex) {
			throw new Exception("Error getting pt with id " + this.pt_id + ": " + ex.toString());
		}

		return this;
	}

	public Integer getPt_id() {
		return pt_id;
	}

	public void setPt_id(Integer pt_id) {
		this.pt_id = pt_id;
	}

	public Integer getUser() {
		return user;
	}

	public void setUser(Integer user) {
		this.user = user;
		setUser_id(user);
	}
}
