package main.server.Contain;

import com.google.gson.Gson;
import main.server.Exercise.Exercise;
import main.server.Server;
import spark.Request;
import spark.Response;

import java.sql.*;
import java.util.ArrayList;

public class ContainUtil {

    //TODO needs the workoutUtil definitions to ensure congruency

    public static String selectWorkout(Request request, Response response) {
        String toReturn = "";

        return toReturn;
    }

    public static String selectExercises(Request request, Response response) {
        String toReturn = "";
        String query = "SELECT * FROM exercise e JOIN contain c ON e.exercise_id = c.exercise WHERE c.workout = ?";

        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(query)) {
            pst.setInt(1, Integer.parseInt(request.queryMap().get("workout_id").value()));

            ResultSet rs = pst.executeQuery();

            ArrayList<Exercise> list = new ArrayList<>();
            while (rs.next()) {
                Exercise exercise = new Exercise(rs.getInt("exercise_id"));
                exercise.setexercise_url(rs.getString("exercise_url"));
                exercise.setTitle(rs.getString("title"));
                exercise.setDescription(rs.getString("description"));

                list.add(exercise);
            }
            Gson gson = new Gson();
            toReturn = gson.toJson(list);

            System.out.println("All desired exercises have been selected");
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
