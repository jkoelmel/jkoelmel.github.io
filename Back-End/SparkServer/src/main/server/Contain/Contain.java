package main.server.Contain;

import main.server.Server;

import java.sql.*;

public class Contain {

    private Integer contain_id;
    private Integer workout;
    private Integer exercise;

    public Contain(Integer contain_id) {
        this.contain_id = contain_id;}

    public void createContain(Integer workout, Integer[] exercise) throws Exception {
        String containQuery = "INSERT INTO contain(workout, exercise) VALUES (?, ?)";

        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(containQuery)) {

            // INSERT Contain into contain, needs testing for iterative additions
            for(int i = 0; i < exercise.length; i++) {
                pst.setInt(1, workout);
                pst.setInt(2, exercise[i]);
                pst.executeQuery(containQuery);
            }
            System.out.println("Contain added to database");
        } catch (SQLException ex) {
            throw new Exception("Error inserting contains: " + ex.toString());
        }
    }

    public Contain getExerciseList() throws Exception {
        String containQuery = "SELECT * FROM exercise e JOIN contain  c ON e.exercise_id = c.exercise" +
                " WHERE c.workout = " + this.workout;

        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(containQuery)) {
            pst.executeQuery(containQuery);

            ResultSet rs = pst.executeQuery();
            if (rs.next()) {
                //Contain data
                setcontain_id(rs.getInt("contain_id"));
                setWorkout(rs.getInt("workout"));
                setExercise(rs.getInt("exercise"));

                //Exercise data; TODO
            }
        }

        return this;
    }

    public void updateContain(Integer workout, Integer exercise) throws Exception {
        String query = "UPDATE contain SET workout = " + workout + ", exercise = " + exercise +
                " WHERE contain_id + " + this.contain_id;

        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(query)) {
            pst.executeUpdate(query);

            System.out.println("Contain updated");
        } catch (Exception ex) {
            throw new Exception("Error updating contain: " + ex.toString());
        }
    }

    public Integer getcontain_id() {
        return contain_id;
    }

    public void setcontain_id(Integer contain_id) {
        this.contain_id = contain_id;
    }


    public Integer getWorkout() {
        return workout;
    }

    public void setWorkout(Integer workout) {
        this.workout = workout;
    }


    public Integer getExercise() {
        return exercise;
    }

    public void setExercise(Integer exercise) {
        this.exercise = exercise;
    }

}
