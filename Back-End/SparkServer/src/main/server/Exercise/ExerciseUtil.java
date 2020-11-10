package main.server.Exercise;

import com.google.gson.Gson;
import main.server.Server;
import spark.Request;
import spark.Response;

import java.sql.*;
import java.util.ArrayList;

public class ExerciseUtil {

    public static String selectSpecific(Request request, Response response) {
        String toReturn = "";
        try {
            Exercise exercise = new Exercise(Integer.parseInt(request.queryMap().get("exercise_id").value()));
            Gson gson = new Gson();
            toReturn = gson.toJson(exercise.getExercise());

            System.out.println("Exercise has been selected");
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

    public static String selectAll(Request request, Response response) {
        String toReturn = "";
        String query = "SELECT * FROM exercise";

        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(query)) {
            ResultSet rs = pst.executeQuery();

            ArrayList<Exercise> list = new ArrayList<>();
            while (rs.next()) {
                Exercise exercise = new Exercise(rs.getInt("exercise_id"));
                exercise.setexercise_url(rs.getString("exercise_url"));
                exercise.setTitle(rs.getString("title"));
                exercise.setDescription(rs.getString("description"));
                exercise.setTags(rs.getString("tags"));

                list.add(exercise);
            }
            Gson gson = new Gson();
            toReturn = gson.toJson(list);

            System.out.println("All exercises have been selected");
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

    public static Integer registerExercise(Request request) {
        try {
            Exercise exercise = new Exercise(Integer.parseInt(request.queryMap().get("exercise_id").value()));
            exercise.createExercise(request.queryMap().get("exercise_url").value(),
                    request.queryMap().get("title").value(),
                    request.queryMap().get("description").value(),
                    request.queryMap().get("tags").value());
            return 200;
        } catch (SQLException sqlEx) {
            System.err.println(sqlEx.toString());
            return 500;
        } catch (Exception ex) {
            System.err.println(ex.toString());
            return 400;
        }
    }
}
