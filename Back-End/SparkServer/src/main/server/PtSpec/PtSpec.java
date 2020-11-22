package main.server.PtSpec;

import main.server.Server;

import java.sql.*;

public class PtSpec {

  private Integer pt_spec_id;
  private Integer pt;
  private Integer spec;

  public PtSpec(Integer pt_spec_id) {
    this.pt_spec_id = pt_spec_id;
  }

  public void createPTSpec(Integer pt, Integer spec) throws Exception {
    String PTSpecQuery = "INSERT INTO pt_spec(pt_spec_id,pt,spec) VALUES (NULL,?,?)";

    try (Connection con =
            DriverManager.getConnection(
                Server.databasePath, Server.databaseUsername, Server.databasePassword);
        PreparedStatement pst = con.prepareStatement(PTSpecQuery)) {

      pst.setInt(1, getPt());
      pst.setInt(2, getSpec());

      pst.executeUpdate();

      pst.executeUpdate(PTSpecQuery);
      System.out.println("PTSpec added to database");

    } catch (SQLException ex) {
      throw new Exception("Error creating PTSpec: " + ex.toString());
    }
  }

  public PtSpec getPTSpec() throws Exception {

    String PTSpecQuery = "SELECT * FROM pt_spec WHERE pt_spec_id = " + pt_spec_id;

    try (Connection con =
            DriverManager.getConnection(
                Server.databasePath, Server.databaseUsername, Server.databasePassword);
        PreparedStatement pst = con.prepareStatement(PTSpecQuery)) {
      pst.executeQuery(PTSpecQuery);

      ResultSet rs = pst.executeQuery();
      if (rs.next()) {
        setPtSpecId(rs.getInt("pt_spec_id"));
        setPt(rs.getInt("pt"));
        setSpec(rs.getInt("spec"));
      }
    } catch (SQLException ex) {
      throw new Exception("Error getting exercise with id: " + ex.toString());
    }

    return this;
  }

  public void updatePTSpec(Integer pt, Integer spec) throws Exception {
    String query =
        "UPDATE pt_spec SET pt =" + pt + ", spec =" + spec + " WHERE pt_spec_id = " + pt_spec_id;

    try (Connection con =
            DriverManager.getConnection(
                Server.databasePath, Server.databaseUsername, Server.databasePassword);
        PreparedStatement pst = con.prepareStatement(query)) {
      pst.executeUpdate(query);

      System.out.println("PTSpec updated");
    } catch (Exception ex) {
      throw new Exception("Error updating PTSpec: " + ex.toString());
    }
  }

  public Integer getPtSpecId() {
    return pt_spec_id;
  }

  public void setPtSpecId(Integer ptId) {
    this.pt_spec_id = pt_spec_id;
  }

  public Integer getPt() {
    return pt;
  }

  public void setPt(Integer pt) {
    this.pt = pt;
  }

  public Integer getSpec() {
    return spec;
  }

  public void setSpec(Integer spec) {
    this.spec = spec;
  }
}
