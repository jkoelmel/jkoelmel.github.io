package main.server.Patient;

import main.server.Server;
import main.server.user.*;

import java.sql.*;


public class Patient extends User {
	private Integer patient_id;
	private Integer user;
	private Integer pt;
	private Integer prospective_pt;
	private String injury;

	public Patient(String email, String password,String f_name, String l_name, String company) {
		super(email, password, f_name, l_name, company);
	}

	public Patient(Integer patient_id) {
		this.patient_id = patient_id;
	}

	public void createPatient() throws Exception {
		String userQuery = "INSERT INTO user(user_id, email, password, f_name, l_name, company) VALUES(NULL, ?, ?, ?, ?, ?);";
		String patientQuery = "INSERT INTO patient(patient_id, user) VALUES(NULL, LAST_INSERT_ID())";

		try (Connection con = DriverManager.getConnection(
				Server.databasePath,
				Server.databaseUsername,
				Server.databasePassword);
			 PreparedStatement pst = con.prepareStatement(userQuery)) {

			// INSERT the Patient into user
			pst.setString(1, getEmail());
			pst.setString(2, getPassword());
			pst.setString(3, getF_name());
			pst.setString(4, getL_name());
			pst.setString(5, getCompany());
			pst.executeUpdate();

			// INSERT the Patient into patient
			pst.executeUpdate(patientQuery);
			System.out.println("Patient added to database");
		} catch (SQLException ex) {
			throw new Exception("Error inserting user/patient: " + ex.toString());
		}
	}

	public Patient getPatient() throws Exception {
		String patientQuery = "SELECT * FROM patient_injury JOIN patient ON patient_injury.patient = " + this.patient_id +
				" JOIN injury ON patient_injury.injury = injury_id " +
				"JOIN user ON user_id = patient.user WHERE patient.patient_id = " + this.patient_id;

		try (Connection con = DriverManager.getConnection(
				Server.databasePath,
				Server.databaseUsername,
				Server.databasePassword);
			 PreparedStatement pst = con.prepareStatement(patientQuery)) {
			pst.executeQuery(patientQuery);

			ResultSet rs = pst.executeQuery();
			if (rs.next()) {
				// Patient data
				setPatient_id(rs.getInt("patient_id"));
				setUser(rs.getInt("user"));
				setPt(rs.getInt("pt"));
				setProspective_pt(rs.getInt("prospective_pt"));
				setInjury(rs.getString("injury_type"));

				// User data
				setEmail(rs.getString("email"));
				setF_name(rs.getString("f_name"));
				setL_name(rs.getString("l_name"));
				setCompany(rs.getString("company"));
			}
		} catch (SQLException ex) {
			throw new Exception("Error getting patient with id " + this.patient_id + ": " + ex.toString());
		}

		return this;
	}

	public void updatePatient(Integer pt, Integer prospective_pt) throws Exception {
		String query = "UPDATE patient SET pt = " + pt + ", prospective_pt = " + prospective_pt + " WHERE patient_id = " + this.patient_id;

		try (Connection con = DriverManager.getConnection(
				Server.databasePath,
				Server.databaseUsername,
				Server.databasePassword);
			 PreparedStatement pst = con.prepareStatement(query)) {
			pst.executeUpdate(query);

			System.out.println("Patient updated");
		} catch (Exception ex) {
			throw new Exception("Error updating PT's for patient with id " + this.patient_id + ": " + ex.toString());
		}
	}

	public Integer getPatient_id() {
		return patient_id;
	}

	public void setPatient_id(Integer patient_id) {
		this.patient_id = patient_id;
	}

	public Integer getUser() {
		return user;
	}

	public void setUser(Integer user) {
		this.user = user;
		setUser_id(user);
	}

	public Integer getPt() {
		return pt;
	}

	public void setPt(Integer pt) {
		this.pt = pt;
	}

	public Integer getProspective_pt() {
		return prospective_pt;
	}

	public void setProspective_pt(Integer prospective_pt) {
		this.prospective_pt = prospective_pt;
	}

	public String getInjury() {
		return injury;
	}

	public void setInjury(String injury) {
		this.injury = injury;
	}
}
