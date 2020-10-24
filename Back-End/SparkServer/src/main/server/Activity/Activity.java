package main.server.Activity;

import main.server.Server;

import java.sql.*;

public class Activity {
    private Integer activity_id;
    private String type_activity;
    private Integer duration;
    private java.sql.Timestamp start_time;
    private java.sql.Timestamp end_time;
    private Integer pt;
    private Integer patient;

    public Activity(Integer activity_id) { this.activity_id = activity_id;}

    //WIP: syntax error between Workbench between and POST requests
    public void createActivity(String type_activity, Integer time, Integer pt_ID, Integer patient_ID) throws Exception {
        String activityQuery =
                "INSERT INTO activity(activity_id, type_activity, duration, start_time, end_time, pt, patient) VALUES(null, ?, ?, (NOW() - INTERVAL ? MINUTE), NOW(), ?, ?)";

        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
            PreparedStatement pst = con.prepareStatement(activityQuery)) {

            //INSERT Activity into activity
            pst.setString(1, type_activity);
            pst.setInt(2, time);
            pst.setInt(3, time);
            pst.setInt(4, pt_ID);
            pst.setInt(5, patient_ID);
            pst.executeUpdate();
            
            System.out.println("Activity added to database");
        } catch (SQLException ex) {
            throw new Exception("Error inserting activity: " + ex.toString());
        }
    }

    public Activity getActivity(Integer pt, Integer patient) throws Exception {
        String activityQuery = "SELECT * FROM activity WHERE pt = " + pt + " AND patient = " + patient;

        try(Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
            PreparedStatement pst = con.prepareStatement(activityQuery)) {

            pst.executeQuery(activityQuery);

            ResultSet rs = pst.executeQuery();
            if(rs.next()) {
                setactivity_id(rs.getInt("activity_id"));
                settype_activity(rs.getString("type_activity"));
                setDuration(rs.getInt("duration"));
                setPt(rs.getInt("pt"));
                setPatient(rs.getInt("patient"));
            }
        } catch (SQLException ex) {
            throw new Exception("Error getting activity with pt_id " + this.pt + "and " +
                    this.patient + ": " + ex.toString());
        }

        return this;
    }

    public void setactivity_id(Integer activity_id) {
        this.activity_id = activity_id;
    }


    public String gettype_activity() {
        return type_activity;
    }

    public void settype_activity(String type_activity) {
        this.type_activity = type_activity;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public void setStart_time(java.sql.Timestamp timestamp) {
        this.start_time = timestamp;
    }

    public java.sql.Timestamp getStart_time() {
        return this.start_time;
    }

    public void setEnd_time(java.sql.Timestamp timestamp) {
        this.end_time = timestamp;
    }

    public java.sql.Timestamp getEnd_time() {
        return this.end_time;
    }
    public Integer getPt() {
        return pt;
    }

    public void setPt(Integer pt) {
        this.pt = pt;
    }


    public Integer getPatient() {
        return patient;
    }

    public void setPatient(Integer patient) {
        this.patient = patient;
    }

}
