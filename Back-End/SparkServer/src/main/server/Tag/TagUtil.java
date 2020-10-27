package main.server.Tag;

import com.google.gson.Gson;
import main.server.Server;
import spark.Request;
import spark.Response;

import java.sql.*;
import java.util.ArrayList;

public class TagUtil{

    public static String selectSpecific(Request request, Response response) {
        String toReturn = "";
        try {
            Tag tag = new Tag(Integer.parseInt(request.queryMap().get("tag_id").value()));
            Gson gson = new Gson();
            toReturn = gson.toJson(tag.getTag());

            System.out.println("Tag has been selected");
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

        String query = "SELECT * FROM tag";

        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(query)) {
            ResultSet rs = pst.executeQuery();

            ArrayList<Tag> list = new ArrayList<>();
            while (rs.next()) {
                Tag tag = new Tag(rs.getInt("tag_id"),rs.getString("title"));

                tag.setTagId(rs.getInt("tag_id"));
                tag.setTitle(rs.getString("title"));

            }
            Gson gson = new Gson();
            toReturn = gson.toJson(list);

            System.out.println("All tags have been selected");
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

    public static Integer registerTag(Request request) {
        try {
            Tag tag = new Tag((Integer.parseInt(request.queryMap().get("tag_id").value())),
                    request.queryMap().get("title").value());
            tag.createTag();
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
