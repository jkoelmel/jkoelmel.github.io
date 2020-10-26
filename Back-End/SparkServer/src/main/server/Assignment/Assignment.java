package main.server.Assignment;

import main.server.Server;

import java.sql.*;

public class Assignment {

    private Integer assignment_id;
    private Date start_time;
    private Date end_time;
    private Integer pt;
    private Integer workout;
    private Integer patient;

    public Assignment(Integer assignment_id) {this.assignment_id = assignment_id;}

    public void createAssignment(Date start_time, Date end_time, Integer pt, Integer workout, Integer patient) throws Exception {
        String assignmentQuery =
                "INSERT INTO assignment(start_time, end_time,  pt, workout, patient) VALUES( ?, ?, ?, ?, ?)";

        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(assignmentQuery)) {

            //INSERT the Assignment into assignment
            pst.setDate(1, start_time);
            pst.setDate(2, end_time);
            pst.setInt(3, pt);
            pst.setInt(4, workout);
            pst.setInt(5, patient);
            pst.executeUpdate(assignmentQuery);

            System.out.println("Assignment added to database");
        } catch (SQLException sqlEx) {
            throw new Exception("Error inserting assignment: " + sqlEx.toString());
        }
    }

    public Assignment getAssignment(Integer patient) throws Exception {
        String assignmentQuery = "SELECT * FROM workout w JOIN assignment a " +
                "ON workout_id = a.workout WHERE a.patient = " + patient;


        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(assignmentQuery)) {
            pst.executeQuery(assignmentQuery);

            ResultSet rs = pst.executeQuery();
            while (rs.next()) {
                //Assignment data
                setWorkout(rs.getInt("workout"));
                setPatient(rs.getInt("patient"));
                setPt(rs.getInt("pt"));

            }
        } catch (SQLException ex) {
            throw new Exception("Error getting assignment: " + ex.toString());
        }

        return this;
    }

    public void updateAssignment(Integer pt, Integer workout, Integer patient) throws Exception {
        String query = "UPDATE assignment SET pt = " + pt + ", workout = " + workout + ", patient = " + patient +
                " WHERE assignment_id = " + this.assignment_id + ")";

        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(query)) {
            pst.executeUpdate(query);

            System.out.println("Assignment updated");
        } catch (Exception ex) {
            throw new Exception("Error updating assignment: " + ex.toString());
        }
    }

    public Integer getassignment_id() {
        return assignment_id;
    }

    public void setassignment_id(Integer assignment_id) {
        this.assignment_id = assignment_id;
    }


    public Date getStart_time() {
        return start_time;
    }

    public void setStart_time(Date start_time) {
        this.start_time = start_time;
    }

    public Date getEnd_time() {
        return end_time;
    }

    public void setEnd_time(Date end_time) {
        this.end_time = end_time;
    }

    public Integer getPt() {
        return pt;
    }

    public void setPt(Integer pt) {
        this.pt = pt;
    }


    public Integer getWorkoutID() {
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
