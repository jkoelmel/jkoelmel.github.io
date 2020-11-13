package main.server.Exercise;

import main.server.Server;

import java.sql.*;

public class Exercise {

    private Integer exercise_id;
    private String exercise_url;
    private String thumbnail;
    private String title;
    private String description;
    private String tags;


    public Exercise(Integer exercise_id) {
        this.exercise_id = exercise_id;
    }

    public void createExercise(String exercise_url, String title,
                               String description, String tags) throws Exception {
        String exerciseQuery = "INSERT INTO exercise(exercise_id, exercise_url, thumbnail, title, description, tags) " +
                "VALUES(null, ?, ?, ?, ?)";

        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(exerciseQuery)) {
            String thumbnail = "https://img.youtube.com/vi/" + exercise_url.split("=")[1] + "/0.jpg";
            //INSERT Exercise into exercise
            pst.setString(1, exercise_url);
            pst.setString(2, thumbnail);
            pst.setString(3, title);
            pst.setString(4, description);
            pst.setString(5, tags);
            pst.executeUpdate();

            System.out.println("Exercise added to database");
        } catch (SQLException ex) {
            throw new Exception("Error inserting exercise: " + ex.toString());
        }
    }

    public Exercise getExercise() throws Exception {
        String exerciseQuery = "SELECT * FROM exercise WHERE exercise_id = " + this.exercise_id;

        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(exerciseQuery)) {
            pst.executeQuery(exerciseQuery);

            ResultSet rs = pst.executeQuery();
            if (rs.next()) {
                setExerciseId(rs.getInt("exercise_id"));
                setexercise_url(rs.getString("exercise_url"));
                setTitle(rs.getString("title"));
                setDescription(rs.getString("description"));
                setTags(rs.getString("tags"));
            }
        } catch (SQLException ex) {
            throw new Exception("Error getting exercise with id: " + ex.toString());
        }

        return this;
    }

    public void updateExercise(String exercise_url, String title,
                               String description, String tags) throws Exception {
        String thumbnail = "https://img.youtube.com/vi/" + exercise_url.split("=")[1] + "/0.jpg";

        String query = "UPDATE exercise SET exercise_url = " + exercise_url + ", thumbnail = " +
                thumbnail + ", title = " + title + ", description = " + description + ", tags = " + tags;

        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(query)) {
            pst.executeUpdate(query);

            System.out.println("Patient updated");
        } catch (Exception ex) {
            throw new Exception("Error updating exercise with id " + this.exercise_id + ": " + ex.toString());
        }
    }

    public Integer getExerciseId() {
        return exercise_id;
    }

    public void setExerciseId(Integer exerciseId) {
        this.exercise_id = exerciseId;
    }


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getexercise_url() {
        return exercise_url;
    }

    public void setexercise_url(String exercise_url) {
        this.exercise_url = exercise_url;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }
}
