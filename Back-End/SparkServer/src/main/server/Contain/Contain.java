package main.server.Contain;

public abstract class Contain {

    private Integer containId;
    private Integer workout;
    private Integer exercise;

    public Contain(){}

    public Contain(Integer exercise, Integer workout) {
        this.exercise = exercise;
        this.workout = workout;
    }


    public Integer getContainId() {
        return containId;
    }

    public void setContainId(Integer containId) {
        this.containId = containId;
    }


    public Integer getWorkout() {
        return workout;
    }

    public void setWorkout(Integer workout) {
        this.workout = workout;
    }


    public Integer getExercise() {
        return exercise;
    }

    public void setExercise(Integer exercise) {
        this.exercise = exercise;
    }

}
