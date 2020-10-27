package main.server.Assignment;

import com.google.gson.Gson;
import main.server.Contain.Contain;
import main.server.Exercise.Exercise;
import main.server.PT.PT;
import main.server.Patient.Patient;
import main.server.PatientAssignment.PatientAssignment;
import main.server.Server;
import main.server.Workout.Workout;
import spark.Request;
import spark.Response;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

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
                " WHERE a.patient = " + Integer.parseInt(request.queryMap().get("patient").value()) + " AND a.start_time > \" " +
                request.queryMap().get("start").value()+ "\" AND a.start_time <  \"" + request.queryMap().get("end").value() + "\" " +
                "ORDER BY a.start_time DESC";

        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(query)) {
            ResultSet rs = pst.executeQuery();

            ArrayList<PatientAssignment> list = new ArrayList<>();
            //Populate all
            while (rs.next()) {
                PatientAssignment pa = new PatientAssignment(rs.getInt("assignment_id"));
                pa.setStart_time(rs.getDate("start_time"));
                pa.setEnd_time(rs.getDate("end_time"));
                pa.setPt(rs.getInt("pt"));
                pa.setWorkout(rs.getInt("workout"));
                pa.setPatient(rs.getInt("patient"));
                pa.setTitle(rs.getString("title"));
                pa.setExercise_id(rs.getInt("exercise"));
                pa.setExercise_url(rs.getString("exercise_url"));
                pa.setExercise_alt_text(rs.getString("exercise_alt_text"));
                pa.setDescription(rs.getString("description"));
                pa.setLength(rs.getInt("length"));
                list.add(pa);
            }
            Set compressed = new HashSet(list);
            Gson gson = new Gson();
            toReturn = gson.toJson(compressed);

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

    public static Integer registerAssignment(Request request) {
        try {
            //check if assignment_id exists, passed from front-end checks
            if(Integer.parseInt(request.queryMap().get("assignment_id").value()) >= 1) {
                Assignment oldAssignment = new Assignment(Integer.parseInt(request.queryMap().get("assignment_id").value()));
                //sets end_date to now()
                oldAssignment.updateAssignment();
            }
            //create new assignment from input
            Assignment assignment = new Assignment(null);
            assignment.createAssignment(Integer.parseInt(request.queryMap().get("pt").value()),
                    Integer.parseInt(request.queryMap().get("workout").value()),
                    Integer.parseInt(request.queryMap().get("patient").value()));
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
