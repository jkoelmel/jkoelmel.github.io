package main.server.Tag;

import main.server.Server;

import java.sql.*;

public class Tag {

    private Integer tag_id;
    private String title;

    public Tag(Integer tag_id, String title){
        this.tag_id=tag_id;
        this.title=title;
    }

    public Tag(Integer tag_id){
        this.tag_id=tag_id;
    }

    public void createTag() throws Exception{
        String tagQuery = "INSERT INTO tag(tag_id,title) VALUES (?,?)";

        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(tagQuery)) {

            pst.setInt(1,getTagId());
            pst.setString(2,getTitle());

            pst.executeUpdate();

            pst.executeUpdate(tagQuery);
            System.out.println("Tag added to database");

        }catch(SQLException ex){
            throw new Exception("Error creating tag: " + ex.toString());
        }
    }

    public Tag getTag() throws Exception{
        String tagQuery = "SELECT * FROM tag";
        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(tagQuery)) {
            pst.executeQuery(tagQuery);

            ResultSet rs = pst.executeQuery();
            if (rs.next()) {

                setTagId(rs.getInt("tag_id"));
                setTitle(rs.getString("title"));

            }
        } catch (SQLException ex) {
            throw new Exception("Error getting tag with id " + this.tag_id + ": " + ex.toString());
        }
       return this;
    }

    public void updateTag(String title) throws Exception{
        String query = "UPDATE tag SET title = " + title + " WHERE tag_id = " + this.tag_id;

        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(query)) {
            pst.executeUpdate(query);
            System.out.println("Tag updated");
        } catch (Exception ex) {
            throw new Exception("Error updating workouts for patient with id " + this.tag_id + ": " + ex.toString());
        }
    }


    public Integer getTagId(){return tag_id;}

    public void setTagId(Integer tag_id){this.tag_id=tag_id;}

    public String getTitle(){return title;}

    public void setTitle(String title){this.title=title;}
}
