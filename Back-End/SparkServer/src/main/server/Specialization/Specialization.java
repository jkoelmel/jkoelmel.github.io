package main.server.Specialization;

import main.server.Server;
import java.sql.*;

public class Specialization {

  private Integer spec_id;
  private String spec_area;

  public Specialization(Integer spec_id) {
    this.spec_id = spec_id;
  }

  public void createSpecialization(String spec_area) throws Exception {

    String specializationQuery = "INSERT INTO specialization(spec_id, spec_area) VALUES(null, ?)";

    try (Connection con =
            DriverManager.getConnection(
                Server.databasePath, Server.databaseUsername, Server.databasePassword);
        PreparedStatement pst = con.prepareStatement(specializationQuery)) {

      // INSERT Activity into activity
      pst.setString(1, spec_area);
      pst.executeUpdate();

      System.out.println("Specialization added to database");
    } catch (SQLException ex) {
      throw new Exception("Error inserting specialization: " + ex.toString());
    }
  }

  public Specialization getSpecialization() throws Exception {

    String specializationQuery = "SELECT * FROM specialization WHERE spec_id = " + this.spec_id;

    try (Connection con =
            DriverManager.getConnection(
                Server.databasePath, Server.databaseUsername, Server.databasePassword);
        PreparedStatement pst = con.prepareStatement(specializationQuery)) {
      pst.executeQuery(specializationQuery);

      ResultSet rs = pst.executeQuery();
      if (rs.next()) {
        setspec_id(rs.getInt("spec_id"));
        setspec_area((rs.getString("spec_area")));
      }
    } catch (SQLException ex) {
      throw new Exception("Error getting specialization with id: " + ex.toString());
    }

    return this;
  }

  public void updateSpecialization(String spec_area) throws Exception {
    String query = "UPDATE specialization SET spec_area = " + spec_area;

    try (Connection con =
            DriverManager.getConnection(
                Server.databasePath, Server.databaseUsername, Server.databasePassword);
        PreparedStatement pst = con.prepareStatement(query)) {
      pst.executeUpdate(query);

      System.out.println("Specialization updated");
    } catch (Exception ex) {
      throw new Exception(
          "Error updating specialization with id " + this.spec_id + ": " + ex.toString());
    }
  }

  public Integer getspec_id() {
    return spec_id;
  }

  public void setspec_id(Integer spec_id) {
    this.spec_id = spec_id;
  }

  public String getspec_area() {
    return spec_area;
  }

  public void setspec_area(String spec_area) {
    this.spec_area = spec_area;
  }
}
