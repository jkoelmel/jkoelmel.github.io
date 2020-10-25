package main.server.Admin;

import main.server.Server;

import java.rmi.server.ExportException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.concurrent.ExecutionException;

public class Admin {

    private Integer admin_id;
    private Integer user;

    public Admin(Integer admin_id) {
        this.admin_id = admin_id;
    }

    public void createAdmin(Integer user_id) throws Exception {
        String adminQuery = "INSERT INTO admin(admin_id, user) VALUES (null, ?)";

        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(adminQuery)
        ) {
            //INSERT Admin into admin
            pst.setInt(1, user_id);
            pst.executeQuery();
            System.out.println("Admin added to database");
        } catch (SQLException ex) {
            throw new Exception("Error inserting admin: " + ex.toString());
        }
    }

    public Admin getAdmin() throws Exception {
        String adminQuery = "SELECT * FROM admin WHERE admin_id=" + admin_id;

        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(adminQuery)
        ) {
            pst.executeQuery();
        } catch (SQLException ex) {
            throw new Exception("Error getting admin: " + ex.toString());
        }

        return this;
    }

    public void updateAdmin(Integer user) throws Exception {
        String query = "UPDATE admin SET user = " + user + " WHERE admin_id = " + this.admin_id;

        try (Connection con = DriverManager.getConnection(
                Server.databasePath,
                Server.databaseUsername,
                Server.databasePassword);
             PreparedStatement pst = con.prepareStatement(query)) {
            pst.executeUpdate(query);

            System.out.println("Admin updated");
        } catch (Exception ex) {
            throw new Exception("Error updating admin with id: " + this.admin_id + ex.toString());
        }
    }



    public Integer getadmin_id() {
        return admin_id;
    }

    public void setadmin_id(Integer admin_id) {
        this.admin_id = admin_id;
    }


    public Integer getUser() {
        return user;
    }

    public void setUser(Integer user) {
        this.user = user;
    }

}
