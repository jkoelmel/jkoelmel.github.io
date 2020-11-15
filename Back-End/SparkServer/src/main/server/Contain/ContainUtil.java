package main.server.Contain;

import com.google.gson.Gson;
import main.server.Exercise.Exercise;
import main.server.Server;
import main.server.Workout.Workout;
import spark.Request;
import spark.Response;

import java.sql.*;
import java.util.ArrayList;

public class ContainUtil {

  // TODO needs the workoutUtil definitions to ensure congruency

  public static String selectWorkout(Request request, Response response) {
    String toReturn = "";

    return toReturn;
  }

  public static String selectExercises(Request request, Response response) {
    String toReturn = "";
    String query =
        "SELECT * FROM exercise e JOIN contain c ON e.exercise_id = c.exercise WHERE c.workout = ?";

    try (Connection con =
            DriverManager.getConnection(
                Server.databasePath, Server.databaseUsername, Server.databasePassword);
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

  // Test method for query map data array handling
  public static Integer createWorkout(Request request) {
    try {

      Workout workout = new Workout(null);
      workout.createWorkout(
          request.queryMap().get("title").value(),
          Integer.parseInt(request.queryMap().get("pt").value()));

      Integer workout_id = -1;
      String query = "SELECT MAX(workout_id) FROM workout";
      Connection con =
          DriverManager.getConnection(
              Server.databasePath, Server.databaseUsername, Server.databasePassword);
      PreparedStatement pst = con.prepareStatement(query);
      {
        ResultSet rs = pst.executeQuery();
        while (rs.next()) {
          workout_id = rs.getInt("MAX(workout_id)");
        }
      }
      for (int i = 0; i < (request.queryParamsValues("exercise_id").length); i++) {
        Exercise exercise =
            new Exercise(Integer.parseInt(request.queryParamsValues("exercise_id")[i]));
        exercise.getExercise();
        try {
          Exercise newExercise = new Exercise(null);
          newExercise.createExercise(
              exercise.getexercise_url(),
              exercise.getTitle(),
              request.queryParamsValues("description")[i],
              exercise.getTags());

          Contain contain = new Contain(null);
          contain.createContain(workout_id);
          return 200;
        } catch (SQLException sqlEx) {
          System.err.println(sqlEx.toString());
          return 500;
        } catch (Exception ex) {
          System.err.println(ex.toString());
          return 400;
        }
      }

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
