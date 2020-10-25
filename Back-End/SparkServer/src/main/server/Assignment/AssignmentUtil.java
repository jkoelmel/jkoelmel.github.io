package main.server.Assignment;

import com.google.gson.Gson;
import main.server.Exercise.Exercise;
import main.server.Server;
import main.server.Workout.Workout;
import spark.Request;
import spark.Response;

import java.sql.*;
import java.util.ArrayList;

public class AssignmentUtil {

    public static String selectSpecific(Request request, Response response) {
        String toReturn = "";

        try{
            Assignment assignment = new Assignment(null);
            Gson gson = new Gson();
            toReturn = gson.toJson(assignment.getAssignment(Integer.parseInt(request.queryMap().get("patient").value())));

            System.out.println("Assignment has been selected");
            response.type("application/json");
            response.status(200);
        } catch (SQLException sqlEx) {
            System.err.println(sqlEx.toString());
            response.status(500);
        } catch (Exception ex) {
            System.err.println(ex.toString());
            response.status(400);
        }

        return toReturn;
    }

    public static String selectAllData(Request request, Response response) {
        String toReturn = "";
        String query = "SELECT * FROM assignment a INNER JOIN workout w  ON a.workout = w.workout_id " +
                " INNER JOIN contain c ON c.workout = w.workout_id INNER JOIN exercise e ON c.exercise = e.exercise_id" +
                " WHERE a.patient = " + Integer.parseInt(request.queryMap().get("patient").value());

        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(query)) {
            ResultSet rs = pst.executeQuery();

            ArrayList list = new ArrayList<>();
            //Get assignment & workout info once and first exercise
            if(rs.next()) {
                Assignment assignment = new Assignment(rs.getInt("assignment_id"));
                assignment.setPt(rs.getInt("pt"));
                assignment.setWorkout(rs.getInt("workout"));
                assignment.setPatient(rs.getInt("patient"));
                list.add(assignment);
                Workout workout = new Workout(rs.getInt("workout_id"));
                workout.setTitle(rs.getString("title"));
                list.add(workout);
                Exercise exercise = new Exercise(rs.getInt("exercise_id"));
                exercise.setexercise_url(rs.getString("exercise_url"));
                exercise.setexercise_alt_text(rs.getString("exercise_alt_text"));
                exercise.setDescription(rs.getString("description"));
                exercise.setLength(rs.getInt("length"));
                list.add(exercise);
            }
            //Populate remaining exercises
            while (rs.next()) {
                Exercise exercise = new Exercise(rs.getInt("exercise_id"));
                exercise.setexercise_url(rs.getString("exercise_url"));
                exercise.setexercise_alt_text(rs.getString("exercise_alt_text"));
                exercise.setDescription(rs.getString("description"));
                exercise.setLength(rs.getInt("length"));
                list.add(exercise);
            }
            Gson gson = new Gson();
            toReturn = gson.toJson(list);

            System.out.println("All assignment details have been selected");
            response.type("application/json");
            response.status(200);
        } catch (SQLException sqlEx) {
            System.err.println(sqlEx.toString());
            response.status(500);
        } catch (Exception ex) {
            System.err.println(ex.toString());
            response.status(400);
        }

        return toReturn;
    }
}
