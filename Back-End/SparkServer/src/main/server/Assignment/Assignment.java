package main.server.Assignment;

import com.mysql.cj.x.protobuf.MysqlxPrepare;
import main.server.Server;

import java.sql.*;

public class Assignment {

    private Integer assignment_id;
    private Integer pt;
    private Integer workout;
    private Integer patient;

    public Assignment() {this.assignment_id = null;}

    public void createAssignmnet(Integer pt, Integer workout, Integer patient) throws Exception {
        String assignmentQuery = "INSERT INTO assignment(assignment_id, pt, workout, patient) VALUES(null, ?, ?, ?)";

        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(assignmentQuery)) {

            //INSERT the Assignment into assignment
            pst.setInt(1, pt);
            pst.setInt(2, workout);
            pst.setInt(3, patient);
            pst.executeUpdate(assignmentQuery);

            System.out.println("Assignment added to database");
        } catch (SQLException sqlEx) {
            throw new Exception("Error inserting assignment: " + sqlEx.toString());
        }
    }

    public Assignment getAssignment(Integer patient) throws Exception {
        String assignmentQuery = "SELECT * FROM assignment WHERE patient= ?";

        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(assignmentQuery)) {
            pst.executeQuery(assignmentQuery);

            ResultSet rs = pst.executeQuery();
            if (rs.next()) {
                setPt(rs.getInt("pt"));
                setWorkout(rs.getInt("workout"));
                setPatient(rs.getInt("patient"));
            }
        } catch (SQLException ex) {
            throw new Exception("Error getting assignment: " + ex.toString());
        }

        return this;
    }

    public Integer getassignment_id() {
        return assignment_id;
    }

    public void setassignment_id(Integer assignment_id) {
        this.assignment_id = assignment_id;
    }


    public Integer getPt() {
        return pt;
    }

    public void setPt(Integer pt) {
        this.pt = pt;
    }


    public Integer getWorkout() {
        return workout;
    }

    public void setWorkout(Integer workout) {
        this.workout = workout;
    }


    public Integer getPatient() {
        return patient;
    }

    public void setPatient(Integer patient) {
        this.patient = patient;
    }

}
