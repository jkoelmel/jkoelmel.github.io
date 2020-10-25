package main.server.Workout;


import main.server.Server;

import java.sql.*;

public class Workout{

    private Integer workout_Id;
    private String title;
    private Integer contain;

<<<<<<< HEAD
    public Workout(Integer workout_id, String title) {
        this.workout_Id=workout_id;
        this.title=title;
    }

    public Workout(Integer workout_id) {
        this.workout_Id=workout_id;
    }

=======
>>>>>>> fc03509cd82880d7e32c5e802e8f28e2adbc3175

    public void createWorkout() throws Exception{
        String workoutQuery = "INSERT INTO workout(workout_id,title) VALUES (NULL,?)";

        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(workoutQuery)) {

<<<<<<< HEAD

            pst.setString(1,getTitle());
=======
            pst.setInt(1,getWorkoutId());
            pst.setString(2,getTitle());
>>>>>>> fc03509cd82880d7e32c5e802e8f28e2adbc3175
            pst.executeUpdate();

            pst.executeUpdate(workoutQuery);
            System.out.println("Workout added to database");


        }catch(SQLException ex){
            throw new Exception("Error inserting workout: " + ex.toString());
        }
    }

    public Workout getWorkout() throws Exception{
        String workoutQuery = "SELECT * FROM workout";
        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(workoutQuery)) {
            pst.executeQuery(workoutQuery);

            ResultSet rs = pst.executeQuery();
            if (rs.next()) {

                setWorkoutId(rs.getInt("workout_id"));
                setTitle(rs.getString("title"));

            }
        } catch (SQLException ex) {
<<<<<<< HEAD
            throw new Exception("Error getting workout with id " + this.workout_Id + ": " + ex.toString());
=======
            throw new Exception("Error getting patient with id " + this.workout_Id + ": " + ex.toString());
>>>>>>> fc03509cd82880d7e32c5e802e8f28e2adbc3175
        }
        return this;
    }

<<<<<<< HEAD
    public void updateWorkout(String title) throws Exception{
        String query = "UPDATE workout SET title = " + title + " WHERE workout_id = " + this.workout_Id;

        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(query)) {
            pst.executeUpdate(query);

            System.out.println("Workout updated");
        } catch (Exception ex) {
            throw new Exception("Error updating workouts for patient with id " + this.workout_Id + ": " + ex.toString());
        }
    }

=======
>>>>>>> fc03509cd82880d7e32c5e802e8f28e2adbc3175

    public Integer getWorkoutId(){ return workout_Id; }

    public void setWorkoutId(Integer workoutId){ this.workout_Id = workoutId;}

    public String getTitle(){ return title;}

    public void setTitle(String title){ this.title = title;}

    public Integer getContain(){return contain;}

    public void setContain(Integer contain){this.contain = contain;}


}
