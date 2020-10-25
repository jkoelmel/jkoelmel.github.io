package main.server.Exercise;

public class Exercise {
    private Integer exerciseId;
    private String exerciseAltText;
    private Integer length;
    private String description;

    public Integer getExerciseId(){return exerciseId;}

    public void setExerciseId(Integer exerciseId){this.exerciseId=exerciseId;}

    public String getExerciseAltText(){return exerciseAltText;}

    public void setExerciseAltText(String exerciseAltText){this.exerciseAltText=exerciseAltText;}

    public Integer getLength(){return length;}

    public void setLength(Integer length){this.length=length;}

    public String getDescription(){return description;}

    public void setDescription(String description){this.description=description;}
}
