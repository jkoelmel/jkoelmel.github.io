package main.server.TaggedWith;

import com.google.gson.Gson;
import main.server.Server;
import spark.Request;
import spark.Response;

import java.sql.*;
import java.util.ArrayList;

public class TaggedWithUtil{

    public static String selectSpecific(Request request, Response response) {
        String toReturn = "";
        try {
            TaggedWith taggedWith = new TaggedWith(Integer.parseInt(request.queryMap().get("tagged_id").value()));
            Gson gson = new Gson();
            toReturn = gson.toJson(taggedWith.getTagged());

            System.out.println("Tagged id has been selected");
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

        String query = "SELECT * FROM tagged_with";

        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(query)) {
            ResultSet rs = pst.executeQuery();

            ArrayList<TaggedWith> list = new ArrayList<>();
            while (rs.next()) {
                TaggedWith taggedWith = new TaggedWith(rs.getInt("tagged_id"),rs.getInt("exercise"));

                taggedWith.setTaggedId(rs.getInt("tagged_id"));
                taggedWith.setExercise(rs.getInt("exercise"));

            }
            Gson gson = new Gson();
            toReturn = gson.toJson(list);

            System.out.println("All taggedWith have been selected");
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
            TaggedWith taggedWith = new TaggedWith((Integer.parseInt(request.queryMap().get("tagged_id").value())),
                    Integer.parseInt(request.queryMap().get("title").value()));
            taggedWith.createTaggedWith();
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
