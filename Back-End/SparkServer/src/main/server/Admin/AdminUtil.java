package main.server.Admin;

import com.google.gson.Gson;
import main.server.Patient.Patient;
import main.server.Server;
import spark.Request;
import spark.Response;

import java.sql.*;
import java.util.ArrayList;

public class AdminUtil {

    public static String selectSpecific(Request request, Response response) {
        String toReturn = "";
        try {
            Admin admin = new Admin(Integer.parseInt(request.queryMap().get("patient_id").value()));
            Gson gson = new Gson();
            toReturn = gson.toJson(admin.getAdmin());

            System.out.println("Admin has been selected");
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

    public static String selectAllSubs(Request request, Response response) {
        String toReturn = "";

        String query = "SELECT * FROM user INNER JOIN admin ON user.admin = admin.admin_id " +
                "WHERE admin.admin_id = " + Integer.parseInt(request.queryMap().get("admin_id").value()) + ")";

        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(query)) {
            ResultSet rs = pst.executeQuery();

            ArrayList<Admin> list = new ArrayList<>();
            while (rs.next()) {
                Admin admin = new Admin(rs.getInt("admin_id"));
                admin.setUser(rs.getInt("user_id"));

                list.add(admin);
            }
            Gson gson = new Gson();
            toReturn = gson.toJson(list);

            System.out.println("All Patients have been selected");
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
