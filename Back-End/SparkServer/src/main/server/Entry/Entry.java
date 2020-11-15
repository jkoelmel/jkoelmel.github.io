package main.server.Entry;

import main.server.Server;

import java.sql.*;

public class Entry {

  private Integer entry_id;
  private String entry;
  private Timestamp created_on;
  private Integer patient;

  public Entry(String entry, Integer patient) {
    this.entry = entry;
    this.patient = patient;
  }

  public Entry(Integer entry_id) {
    this.entry_id = entry_id;
  }

  public void createEntry() throws Exception {
    String entryQuery =
        "INSERT INTO entry(entry_id, entry, created_on, patient) VALUES(NULL, ?, NOW(), ?);";

    try (Connection con =
            DriverManager.getConnection(
                Server.databasePath, Server.databaseUsername, Server.databasePassword);
        PreparedStatement pst = con.prepareStatement(entryQuery)) {

      pst.setString(1, this.entry);
      pst.setInt(2, this.patient);
      pst.executeUpdate();

      System.out.println("Entry added to database");
    } catch (SQLException ex) {
      throw new Exception("Error inserting entry: " + ex.toString());
    }
  }

  public Entry getDBEntry() throws Exception {
    String entryQuery = "SELECT * FROM entry WHERE entry_id = " + this.entry_id;

    try (Connection con =
            DriverManager.getConnection(
                Server.databasePath, Server.databaseUsername, Server.databasePassword);
        PreparedStatement pst = con.prepareStatement(entryQuery)) {
      pst.executeQuery(entryQuery);

      ResultSet rs = pst.executeQuery();
      if (rs.next()) {
        setEntry(rs.getString("entry"));
        setCreated_on(rs.getTimestamp("created_on"));
        setPatient(rs.getInt("patient"));
      }
    } catch (SQLException ex) {
      throw new Exception("Error getting entry with id " + this.entry_id + ": " + ex.toString());
    }

    return this;
  }

  public Integer getEntry_id() {
    return entry_id;
  }

  public void setEntry_id(Integer entry_id) {
    this.entry_id = entry_id;
  }

  public String getEntry() {
    return entry;
  }

  public void setEntry(String entry) {
    this.entry = entry;
  }

  public Timestamp getCreated_on() {
    return created_on;
  }

  public void setCreated_on(Timestamp created_on) {
    this.created_on = created_on;
  }

  public Integer getPatient() {
    return patient;
  }

  public void setPatient(Integer patient) {
    this.patient = patient;
  }
}
