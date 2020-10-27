package main.server.TaggedWith;

import main.server.Server;

import java.sql.*;

public class TaggedWith {

    private Integer tagged_id;
    private Integer tag;
    private Integer exercise;

    public TaggedWith(Integer tagged_id){
        this.tagged_id=tagged_id;
    }

    public TaggedWith(Integer tagged_id, Integer exercise){
        this.tagged_id=tagged_id;
        this.exercise=exercise;
    }

    public void createTaggedWith() throws Exception{
        String taggedWithQuery = "INSERT INTO tagged_with(tagged_id,exercise) VALUES (?,?)";

        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(taggedWithQuery)) {

            pst.setInt(1,getTaggedId());
            pst.setInt(2,getExercise());

            pst.executeUpdate();

            pst.executeUpdate(taggedWithQuery);
            System.out.println("Tagged added to database");

        }catch(SQLException ex){
            throw new Exception("Error creating tagged: " + ex.toString());
        }
    }

    public TaggedWith getTagged() throws Exception{
        String taggedWithQuery = "SELECT * FROM tagged_with";
        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(taggedWithQuery)) {
            pst.executeQuery(taggedWithQuery);

            ResultSet rs = pst.executeQuery();
            if (rs.next()) {

                setTaggedId(rs.getInt("tagged_id"));
                setExercise(rs.getInt("exercise"));

            }
        } catch (SQLException ex) {
            throw new Exception("Error getting tagged with id " + this.tagged_id + ": " + ex.toString());
        }
        return this;
    }

    public Integer getTaggedId(){return tagged_id;}

    public void setTaggedId(Integer taggedId){this.tagged_id=taggedId;}

    public Integer getTag(){return tag;}

    public void setTag(Integer tag){this.tag=tag;}

    public Integer getExercise(){return exercise;}

    public void setExercise(Integer exercise){this.exercise=exercise;}
}
