package main.server.PtSpec;

import com.google.gson.Gson;
import main.server.Server;
import spark.Request;
import spark.Response;

import java.sql.*;
import java.util.ArrayList;

public class PtSpecUtil {
  public static String selectSpecific(Request request, Response response) {
    String toReturn = "";
    try {
      PtSpec ptSpec = new PtSpec(Integer.parseInt(request.queryMap().get("pt_spec_id").value()));
      Gson gson = new Gson();
      toReturn = gson.toJson(ptSpec.getPTSpec());

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

  public static String selectAll(Response response) {
    String toReturn = "";
    String query = "SELECT * FROM exercise";

    try (Connection con =
            DriverManager.getConnection(
                Server.databasePath, Server.databaseUsername, Server.databasePassword);
        PreparedStatement pst = con.prepareStatement(query)) {
      ResultSet rs = pst.executeQuery();

      ArrayList<PtSpec> list = new ArrayList<>();
      while (rs.next()) {
        PtSpec ptSpec = new PtSpec(rs.getInt("pt_spec_id"));
        ptSpec.setPt(rs.getInt("pt"));
        ptSpec.setSpec(rs.getInt("spec"));

        list.add(ptSpec);
      }
      Gson gson = new Gson();
      toReturn = gson.toJson(list);

      System.out.println("All PTSpec have been selected");
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
      PtSpec ptSpec = new PtSpec(Integer.parseInt(request.queryMap().get("pt_spec_id").value()));

      ptSpec.createPTSpec(
          Integer.parseInt(request.queryMap().get("pt").value()),
          Integer.parseInt(request.queryMap().get("spec").value()));

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
