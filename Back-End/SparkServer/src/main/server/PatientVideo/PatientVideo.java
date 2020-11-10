package main.server.PatientVideo;

import main.server.Server;

import java.sql.*;

public class PatientVideo {

    private Integer patientVideo_id;
    private String video_url;
    private String feedback;
    private Timestamp uploaded;
    private Integer patient;
    
    public PatientVideo(Integer patientVideo_id) { this.patientVideo_id = patientVideo_id ;}

    //TODO add uploaded field to all queries
    public void createPatientVideo(String video_url, String feedback, Integer patient) throws Exception {
        String videoQuery = "INSERT INTO patient_video(patient_video_id, video_url, feedback, patient) " +
                "VALUES(null, ?, ?, now(), ?)";

        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(videoQuery)) {

            //INSERT Activity into activity
            pst.setString(1, video_url);
            pst.setString(2, feedback);
            pst.setInt(3, patient);
            pst.executeUpdate();

            System.out.println("Video added to database");
        } catch (SQLException ex) {
            throw new Exception("Error inserting video: " + ex.toString());
        }
    }

    public PatientVideo getPatientVideo() throws Exception {
        String videoQuery = "SELECT * FROM patient_video WHERE patient_video_id = " + this.patientVideo_id;

        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(videoQuery)) {
            pst.executeQuery(videoQuery);

            ResultSet rs = pst.executeQuery();
            if(rs.next()) {
                setpatientVideo_id(rs.getInt("patient_video_id"));
                setVideo_url(rs.getString("video_url"));
                setFeedback(rs.getString("feedback"));
                setUploaded(rs.getTimestamp("uploaded"));
                setPatient(rs.getInt("patient"));
            }
        } catch (SQLException ex) {
            throw new Exception("Error getting exercise with id: " + ex.toString());
        }

        return this;
    }

    public void updatePatientVideo(String videoAltText, Integer length, String patient_comment,
                                   String feedback, byte shareable , Integer patient) throws Exception{

        String query = "UPDATE patient_video SET video_alt_text = " + videoAltText + ", length = " +
                length + ", patient_comment = " + patient_comment + ", feedback = " + feedback + ", shareable = " +
                shareable + ", patient = " + patient + " WHERE patient_video_id " + this.patientVideo_id;

        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(query)) {
            pst.executeUpdate(query);

            System.out.println("Patient Video updated");
        } catch (Exception ex) {
            throw new Exception("Error updating video with id " + this.patientVideo_id + ": " + ex.toString());
        }
    }

    public Integer getpatientVideo_id(){return patientVideo_id;}

    public void setpatientVideo_id(Integer patientVideo_id){this.patientVideo_id = patientVideo_id;}

    public String getVideo_url() {
        return video_url;
    }

    public void setVideo_url(String video_url) {
        this.video_url = video_url;
    }

    public String getFeedback(){return feedback;}

    public void setFeedback(String feedback){this.feedback=feedback;}

    public Timestamp getUploaded() {
        return uploaded;
    }

    public void setUploaded(Timestamp uploaded) {
        this.uploaded = uploaded;
    }

    public Integer getPatient(){return patient;}

    public void setPatient(Integer patient){this.patient=patient;}
}

