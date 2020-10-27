package main.server.PatientVideo;

public class PatientVideo {

    private Integer patientVideoID;
    private String videoAltText;
    private Integer length;
    private String description;
    private String feedback;
    private byte shareable;
    private Integer patient;

    public Integer getPatientVideoID(){return patientVideoID;}

    public void setPatientVideoID(Integer patientVideoID){this.patientVideoID = patientVideoID;}

    public String getVideoAltText(){return videoAltText;}

    public void setVideoAltText(String videoAltText){this.videoAltText=videoAltText;}

    public Integer getLength(){return length;}

    public void setLength(Integer length){this.length=length;}

    public String getDescription(){return description;}

    public void setDescription(String description){this.description=description;}

    public String getFeedback(){return feedback;}

    public void setFeedback(String feedback){this.feedback=feedback;}

    public byte getShareable(){return shareable;}

    public void setShareable(byte shareable){this.shareable=shareable;}

    public Integer getPatient(){return patient;}

    public void setPatient(Integer patient){this.patient=patient;}
}

