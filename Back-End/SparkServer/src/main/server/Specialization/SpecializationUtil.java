package main.server.Specialization;

import com.google.gson.Gson;
import main.server.Server;
import spark.Request;
import spark.Response;

import java.sql.*;
import java.util.ArrayList;

public class SpecializationUtil {

  public static String selectSpecifc(Request request, Response response) {
    String toReturn = "";

    try {
      Specialization spec =
          new Specialization(Integer.parseInt(request.queryMap().get("spec_id").value()));
      Gson gson = new Gson();
      toReturn = gson.toJson(spec.getSpecialization());

      System.out.println("Specialization has been selected");
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
    String query = "SELECT * FROM specialization";

    try (Connection con =
            DriverManager.getConnection(
                Server.databasePath, Server.databaseUsername, Server.databasePassword);
        PreparedStatement pst = con.prepareStatement(query)) {
      ResultSet rs = pst.executeQuery();

      ArrayList<Specialization> list = new ArrayList<>();
      while (rs.next()) {
        Specialization spec = new Specialization(rs.getInt("spec_id"));
        spec.setspec_area(rs.getString("spec_area"));

        list.add(spec);
      }
      Gson gson = new Gson();
      toReturn = gson.toJson(list);

      System.out.println("All specializations have been selected");
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

  public static Integer registerSpecialization(Request request) {
    try {
      Specialization spec =
          new Specialization(Integer.parseInt(request.queryMap().get("spec_id").value()));
      spec.setspec_area(request.queryMap().get("spec_area").value());

      return 200;
    } catch (Exception ex) {
      System.err.println(ex.toString());
      return 400;
    }
  }
}
