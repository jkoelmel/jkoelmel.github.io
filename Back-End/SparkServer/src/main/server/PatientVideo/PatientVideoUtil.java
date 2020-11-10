package main.server.PatientVideo;

import com.google.gson.Gson;
import main.server.Server;
import spark.Request;
import spark.Response;

import java.sql.*;
import java.util.ArrayList;

public class PatientVideoUtil {

    public static String selectSpecific(Request request, Response response) {
        String toReturn = "";
        try {
            PatientVideo pv = new PatientVideo(Integer.parseInt(request.queryMap().get("patient_video_id").value()));
            Gson gson = new Gson();
            toReturn = gson.toJson(pv.getPatientVideo());

            System.out.println("Patient Video has been selected");
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
        String query = "SELECT * FROM patient_video WHERE patient = " +
                Integer.parseInt(request.queryMap().get("patient").value()) +
                " ORDER BY uploaded DESC";

        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(query)) {
            ResultSet rs = pst.executeQuery();

            ArrayList<PatientVideo> list = new ArrayList<>();
            while (rs.next()) {
                PatientVideo pv = new PatientVideo(rs.getInt("patient_video_id"));
                pv.setVideo_url(rs.getString("video_url"));
                pv.setFeedback(rs.getString("feedback"));
                pv.setUploaded(rs.getTimestamp("uploaded"));
                pv.setPatient(rs.getInt("patient"));

                list.add(pv);
            }
            Gson gson = new Gson();
            toReturn = gson.toJson(list);

            System.out.println("All videos have been selected");
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

    public static Integer registerPatientVideo(Request request) {
        try {
            PatientVideo pv = new PatientVideo(Integer.parseInt(request.queryMap().get("patient_video_id").value()));
            pv.createPatientVideo(request.queryMap().get("video_url").value(),
                    request.queryMap().get("feedback").value(),
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
