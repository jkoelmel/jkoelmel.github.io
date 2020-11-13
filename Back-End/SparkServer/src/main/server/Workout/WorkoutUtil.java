package main.server.Workout;

import com.google.gson.Gson;
import main.server.Assignment.Assignment;
import main.server.Server;
import spark.Request;
import spark.Response;

import java.sql.*;
import java.util.ArrayList;

public class WorkoutUtil {
    public static String selectSpecific(Request request, Response response) {
        String toReturn = "";
        try {
            Workout workout = new Workout(Integer.parseInt(request.queryMap().get("workout_id").value()));
            Gson gson = new Gson();
            toReturn = gson.toJson(workout.getWorkout());

            System.out.println("Workout has been selected");
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
    public static String selectAll(Response response) {
        String toReturn = "";

        String query = "SELECT * FROM workout";

        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(query)) {
            ResultSet rs = pst.executeQuery();

            ArrayList<Workout> list = new ArrayList<>();
            while (rs.next()) {
                Workout workout = new Workout(rs.getInt("workout_id"));

                workout.setWorkoutId(rs.getInt("workout_id"));
                workout.setTitle(rs.getString("title"));

            }
            Gson gson = new Gson();
            toReturn = gson.toJson(list);

            System.out.println("All Workouts have been selected");
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

    public static Integer createWorkout(Request request) {
        try {
            System.out.println(request.queryMap());
            return 200;
        } catch (Exception ex) {
            System.err.println(ex.toString());
            return 400;
        }
    }

    public static Integer registerWorkout(Request request) {
        try {
            Workout workout = new Workout(null);
            workout.createWorkout(request.queryMap().get("title").value(),
                    Integer.parseInt(request.queryMap().get("pt").value()));
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
