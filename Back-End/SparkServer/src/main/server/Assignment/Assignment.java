package main.server.Assignment;

public class Assignment {

    private long assignmentId;
    private long pt;
    private long workout;
    private long patient;


    public long getAssignmentId() {
        return assignmentId;
    }

    public void setAssignmentId(long assignmentId) {
        this.assignmentId = assignmentId;
    }


    public long getPt() {
        return pt;
    }

    public void setPt(long pt) {
        this.pt = pt;
    }


    public long getWorkout() {
        return workout;
    }

    public void setWorkout(long workout) {
        this.workout = workout;
    }


    public long getPatient() {
        return patient;
    }

    public void setPatient(long patient) {
        this.patient = patient;
    }

}
