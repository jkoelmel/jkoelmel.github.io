package main.server.PatientInjury;

import main.server.Server;

import java.sql.*;

public class PatientInjury {

    private Integer patientInjury_id;
    private Integer patient;
    private Integer injury;

    public PatientInjury(Integer patientInjury_id) { this.patientInjury_id = patientInjury_id;}

    public void createPatientInjury(Integer patient, Integer injury) throws Exception {
        String patientInjuryQuery = "INSERT INTO patient_injury(patient_injury_id, patient, injury" +
                " VALUES(null, ? ,?)";

        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(patientInjuryQuery)) {

            //INSERT Activity into activity
            pst.setInt(1, patient);
            pst.setInt(2, injury);
            pst.executeUpdate();

            System.out.println("Patient Injury added to database");
        } catch (SQLException ex) {
            throw new Exception("Error inserting patient injury: " + ex.toString());
        }
    }

    public PatientInjury getPatientInjury() throws Exception {
        String patientInjuryQuery = "SELECT * FROM patient_injury WHERE patient_injury_id = " + this.patientInjury_id;

        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(patientInjuryQuery)) {
            pst.executeQuery(patientInjuryQuery);

            ResultSet rs = pst.executeQuery();
            if(rs.next()) {
                setpatientInjury_id(rs.getInt("patient_injury_id"));
                setPatient(rs.getInt("patient"));
                setInjury(rs.getInt("injury"));

            }
        } catch (SQLException ex) {
            throw new Exception("Error getting patient injury with id: " + ex.toString());
        }


        return this;
    }

    public Integer getpatientInjury_id() {
        return patientInjury_id;
    }

    public void setpatientInjury_id(Integer patientInjury_id) {
        this.patientInjury_id = patientInjury_id;
    }


    public Integer getPatient() {
        return patient;
    }

    public void setPatient(Integer patient) {
        this.patient = patient;
    }


    public Integer getInjury() {
        return injury;
    }

    public void setInjury(Integer injury) {
        this.injury = injury;
    }

}

