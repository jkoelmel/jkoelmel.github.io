package main.server.Activity;

import com.google.gson.Gson;
import main.server.Patient.Patient;
import main.server.Server;
import spark.Request;
import spark.Response;

import java.sql.*;
import java.util.ArrayList;

public class ActivityUtil {

    public static String selectSpecific(Request request, Response response) {
        Integer pt_id = Integer.parseInt(request.queryMap().get("pt").value());
        Integer patient_id = Integer.parseInt(request.queryMap().get("patient").value());
        String toReturn = "";
        String query = "SELECT * FROM activity WHERE pt= " + pt_id + " AND patient= " + patient_id +
                " ORDER BY start_time DESC LIMIT 10";

        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(query)) {

            ResultSet rs = pst.executeQuery();

            ArrayList<Activity> list = new ArrayList<>();
            while (rs.next()) {
                Activity activity = new Activity(rs.getInt("activity_id"));

                activity.setType_activity(rs.getString("type_activity"));
                activity.setDuration(rs.getInt("duration"));
                activity.setStart_time(rs.getTimestamp("start_time"));
                activity.setEnd_time(rs.getTimestamp("end_time"));
                activity.setPt(rs.getInt("pt"));
                activity.setPatient(rs.getInt("patient"));

                list.add(activity);
            }
            Gson gson = new Gson();
            toReturn = gson.toJson(list);

            System.out.println("All activities have been selected");
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
        String query = "SELECT * FROM activity";

        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(query)) {
            ResultSet rs = pst.executeQuery();

            ArrayList<Activity> list = new ArrayList<>();
            while (rs.next()) {
                Activity activity = new Activity(rs.getInt("activity_id"));

                activity.setType_activity(rs.getString("type_activity"));
                activity.setDuration(rs.getInt("duration"));
                activity.setStart_time(rs.getTimestamp("start_time"));
                activity.setEnd_time(rs.getTimestamp("end_time"));
                activity.setPatient(rs.getInt("patient"));
                activity.setPt(rs.getInt("pt"));

                list.add(activity);
            }

            Gson gson = new Gson();
            toReturn = gson.toJson(list);

            System.out.println("All Activities have been selected");
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

    public static String getAllPTActivity(Request request, Response response) {
        String toReturn = "";
        String query = "SELECT type_activity, SUM(duration) totalTime FROM activity WHERE pt = " +
                Integer.parseInt(request.queryMap().get("pt").value()) + " GROUP BY type_activity " +
                "ORDER BY type_activity ASC";

        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(query)) {
            ResultSet rs = pst.executeQuery();

            ArrayList<Activity> list = new ArrayList<>();
            while (rs.next()) {
                Activity activity = new Activity(null);
                activity.setType_activity(rs.getString("type_activity"));
                activity.setDuration(rs.getInt("totalTime"));
                list.add(activity);
            }
            Gson gson = new Gson();
            toReturn = gson.toJson(list);

            System.out.println("All PT activities summed and returned");
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

    public static String getPatPTSummary(Request request, Response response) {
        String query = "SELECT type_activity, SUM(duration) totalTime FROM activity WHERE pt = " +
                Integer.parseInt(request.queryMap().get("pt").value()) + " AND patient = " +
                Integer.parseInt(request.queryMap().get("patient").value()) + " GROUP BY type_activity " +
                "ORDER BY type_activity ASC";
        String toReturn = "";

        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(query)) {
            ResultSet rs = pst.executeQuery();

            ArrayList<Activity> list = new ArrayList<>();
            while (rs.next()) {
                Activity activity = new Activity(null);
                activity.setType_activity(rs.getString("type_activity"));
                activity.setDuration(rs.getInt("totalTime"));
                list.add(activity);
            }
            Gson gson = new Gson();
            toReturn = gson.toJson(list);

            System.out.println("All PT/Patient activities summed and returned");
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

    public static Integer registerActivity(Request request) {
        try {
            Activity activity = new Activity(null);
            activity.createActivity(request.queryMap().get("type_activity").value(),
                    Integer.parseInt(request.queryMap().get("duration").value()),
                    Integer.parseInt(request.queryMap().get("pt").value()),
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

