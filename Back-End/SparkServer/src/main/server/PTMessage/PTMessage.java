package main.server.PTMessage;

import main.server.AES.AES;
import main.server.Server;

import java.sql.*;

public class PTMessage {

  private Integer message_id;
  private String message;
  private Timestamp created_On;
  private Integer patient;
  private Integer pt;
  private final String secret = "messageEncryption";

  public PTMessage(Integer message_id) {
    this.message_id = message_id;
  }

  public void createMessage(String message, Integer patient, Integer pt) throws Exception {
    String messageQuery =
        "INSERT INTO pt_message(message_id, message, created_on, patient, pt) "
            + " VALUES(NULL, ?, now(), ?, ?)";

    try (Connection con =
            DriverManager.getConnection(
                Server.databasePath, Server.databaseUsername, Server.databasePassword);
        PreparedStatement pst = con.prepareStatement(messageQuery)) {
      message += "-" + patient + "-" + pt;
      String contents = AES.encrypt(message, secret);
      // INSERT Activity into activity
      pst.setString(1, contents);
      pst.setInt(2, patient);
      pst.setInt(3, pt);
      pst.executeUpdate();

      System.out.println("Message added to database");
    } catch (SQLException ex) {
      throw new Exception("Error inserting message: " + ex.toString());
    }
  }

  public PTMessage getMessageContents() throws Exception {
    String messageQuery =
        "SELECT * FROM patient_message WHERE patient_message_id = " + this.message_id;

    try (Connection con =
            DriverManager.getConnection(
                Server.databasePath, Server.databaseUsername, Server.databasePassword);
        PreparedStatement pst = con.prepareStatement(messageQuery)) {
      pst.executeQuery(messageQuery);

      ResultSet rs = pst.executeQuery();
      if (rs.next()) {
        setmessage_id(rs.getInt("patient_message_id"));
        setMessage(rs.getString("message"));
        setCreated_On(rs.getTimestamp("created_on"));
        setPatient(rs.getInt("patient"));
        setPt(rs.getInt("pt"));
      }
    } catch (SQLException ex) {
      throw new Exception("Error getting message with id: " + ex.toString());
    }

    return this;
  }

  // No message update method created because messages created are final and uneditable.

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

  public Timestamp getCreated_On() {
    return created_On;
  }

  public void setCreated_On(Timestamp created_On) {
    this.created_On = created_On;
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
