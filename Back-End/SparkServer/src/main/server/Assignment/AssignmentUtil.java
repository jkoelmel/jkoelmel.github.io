package main.server.Assignment;

import com.google.gson.Gson;
import main.server.Entry.Entry;
import main.server.Server;
import spark.Request;
import spark.Response;

import java.sql.*;
import java.util.ArrayList;

public class AssignmentUtil {

    public static String selectSpecific(Request request, Response response) {
        String toReturn = "";

        try{
            Assignment assignment = new Assignment();
            Gson gson = new Gson();
            toReturn = gson.toJson(assignment.getAssignment(Integer.parseInt(request.queryMap().get("patient").value())));

            System.out.println("Assignment has been selected");
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
        String query = "SELECT * FROM assignment";

        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(query)) {
            ResultSet rs = pst.executeQuery();

            ArrayList<Assignment> list = new ArrayList<>();
            while (rs.next()) {
                Assignment assignment = new Assignment();
                assignment.createAssignment(Integer.parseInt(request.queryMap().get("pt").value()),
                        Integer.parseInt(request.queryMap().get("workout").value()),
                        Integer.parseInt(request.queryMap().get("patient").value()));
                list.add(assignment);
            }
            Gson gson = new Gson();
            toReturn = gson.toJson(list);

            System.out.println("All assignments have been selected");
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
