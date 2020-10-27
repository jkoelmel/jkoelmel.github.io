package main.server.PatientVideo;

import main.server.Exercise.Exercise;
import main.server.Server;

import java.sql.*;

public class PatientVideo {

    private Integer patientVideo_id;
    private String videoAltText;
    private Integer length;
    private String patient_comment;
    private String feedback;
    private byte shareable;
    private Integer patient;
    
    public PatientVideo(Integer patientVideo_id) { this.patientVideo_id = patientVideo_id ;}
    
    public void createPatientVideo(String videoAltText, Integer length, String patient_comment,
                                   String feedback, byte shareable , Integer patient) throws Exception {
        String videoQuery = "INSERT INTO patient_video(patient_video_id, video_alt_text, length, patient_comment, feedback, shareable, patient) " +
                "VALUES(null, ?, ?, ?, ?, ?, ?)";

        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(videoQuery)) {

            //INSERT Activity into activity
            pst.setString(1, videoAltText);
            pst.setInt(2, length);
            pst.setString(3, patient_comment);
            pst.setString(4, feedback);
            pst.setByte(5, shareable);
            pst.setInt(6, patient);
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
                setVideoAltText(rs.getString("video_alt_text"));
                setLength(rs.getInt("length"));
                setpatient_comment(rs.getString("patient_comment"));
                setFeedback(rs.getString("feedback"));
                setShareable(rs.getByte("shareable"));
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
                shareable + ", patient = " + patient;

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

    public String getVideoAltText(){return videoAltText;}

    public void setVideoAltText(String videoAltText){this.videoAltText=videoAltText;}

    public Integer getLength(){return length;}

    public void setLength(Integer length){this.length=length;}

    public String getpatient_comment(){return patient_comment;}

    public void setpatient_comment(String patient_comment){this.patient_comment=patient_comment;}

    public String getFeedback(){return feedback;}

    public void setFeedback(String feedback){this.feedback=feedback;}

    public byte getShareable(){return shareable;}

    public void setShareable(byte shareable){this.shareable=shareable;}

    public Integer getPatient(){return patient;}

    public void setPatient(Integer patient){this.patient=patient;}
}

