package main.server.PTMessage;

import com.google.gson.Gson;
import main.server.AES.AES;
import main.server.Server;
import spark.Request;
import spark.Response;

import java.sql.*;
import java.util.ArrayList;

public class PTMessageUtil {

    private final static String secret = "messageEncryption";

    public static String selectSpecific(Request request, Response response) {
        String toReturn = "";

        try {
            PTMessage message = new PTMessage(Integer.parseInt(request.queryMap().get("patient_message_id").value()));
            Gson gson = new Gson();
            String mySQLtoSHA = AES.decrypt(message.getMessage(), secret);
            message.setMessage(AES.decrypt(mySQLtoSHA, secret));
            toReturn = gson.toJson(message.getMessage());

            System.out.println("Message has been selected");
            response.type("application/json");
            response.status(200);
        } catch (Exception ex) {
            System.err.println(ex.toString());
            response.status(400);
        }
        return toReturn;
    }

    public static String selectAll(Request request, Response response) {
        String toReturn = "";
        String query = "SELECT * FROM patient_message WHERE pt = " + Integer.parseInt(request.queryMap().get("pt").value()) +
                " AND patient = " + Integer.parseInt(request.queryMap().get("patient").value());

        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(query)) {
            ResultSet rs = pst.executeQuery();
            ArrayList<PTMessage> list = new ArrayList<>();
            while (rs.next()) {
                PTMessage message = new PTMessage(rs.getInt("patient_message_id"));
                String contents = AES.decrypt(rs.getString("message"), secret).split("-")[0];
                message.setMessage(contents);
                message.setCreated_On(rs.getTimestamp("created_on"));
                message.setPatient(rs.getInt("patient"));
                message.setPt(rs.getInt("pt"));

                list.add(message);
            }
            Gson gson = new Gson();
            toReturn = gson.toJson(list);

            System.out.println("All messages between patient and pt have been selected");
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

    public static Integer registerMessage(Request request) {
        try {
            PTMessage message = new PTMessage(null);

            message.createMessage(request.queryMap().get("message").value(),
                    Integer.parseInt(request.queryMap().get("patient").value()),
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
