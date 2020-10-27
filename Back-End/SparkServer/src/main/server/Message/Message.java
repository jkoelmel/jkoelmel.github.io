package main.server.Message;

import main.server.Exercise.Exercise;
import main.server.Server;

import java.sql.*;

public class Message {

    private Integer message_id;
    private String message;
    private Integer patient;
    private Integer pt;

    public Message(Integer message_id) { this.message_id = message_id;}

    public void createMessage(String message, Integer patient, Integer pt) throws Exception {
        String messageQuery = "INSERT INTO message(message_id, message, patient, pt " +
                " VALUES(NULL, ?, ?, ?)";

        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(messageQuery)) {

            //INSERT Activity into activity
            pst.setString(1, message);
            pst.setInt(2, patient);
            pst.setInt(3, pt);
            pst.executeUpdate();

            System.out.println("Message added to database");
        } catch (SQLException ex) {
            throw new Exception("Error inserting message: " + ex.toString());
        }
    }

    public Message getExercise() throws Exception {
        String messageQuery = "SELECT * FROM message WHERE message_id = " + this.message_id;

        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(messageQuery)) {
            pst.executeQuery(messageQuery);

            ResultSet rs = pst.executeQuery();
            if(rs.next()) {
                setmessage_id(rs.getInt("message_id"));
                setMessage(rs.getString("message"));
                setPatient(rs.getInt("patient"));
                setPt(rs.getInt("pt"));
            }
        } catch (SQLException ex) {
            throw new Exception("Error getting exercise with id: " + ex.toString());
        }

        return this;
    }

    //No message update method created because messages created are final and uneditable.

    public Integer getmessage_id() {
        return message_id;
    }

    public void setmessage_id(Integer message_id) {
        this.message_id = message_id;
    }


    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }


    public Integer getPatient() {
        return patient;
    }

    public void setPatient(Integer patient) {
        this.patient = patient;
    }


    public Integer getPt() {
        return pt;
    }

    public void setPt(Integer pt) {
        this.pt = pt;
    }

}
