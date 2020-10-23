package main.server.Entry;

public class Entry {

    private Integer entryId;
    private String entry;
    private java.sql.Timestamp createdOn;
    private Integer progress;


    public Integer getEntryId() {
        return entryId;
    }

    public void setEntryId(Integer entryId) {
        this.entryId = entryId;
    }


    public String getEntry() {
        return entry;
    }

    public void setEntry(String entry) {
        this.entry = entry;
    }


    public java.sql.Timestamp getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(java.sql.Timestamp createdOn) {
        this.createdOn = createdOn;
    }


    public Integer getProgress() {
        return progress;
    }

    public void setProgress(Integer progress) {
        this.progress = progress;
    }

}

