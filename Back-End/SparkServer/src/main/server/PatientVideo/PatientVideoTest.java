package main.server.PatientVideo;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.sql.Timestamp;

import static org.junit.jupiter.api.Assertions.*;

public class PatientVideoTest {

    private PatientVideo patientVideo;

    @BeforeEach
    void resetPatientVideoTest(){
        patientVideo = new PatientVideo(null);
    }

    @Test
    void createPatientVideoTest(){
        Exception ex = assertThrows(NullPointerException.class,
                () -> patientVideo.createPatientVideo( "www.test.com", null));
    }

    @Test
    void getPatientVideoTest(){
        patientVideo.setpatientVideo_id(1);
        assertNotEquals(null, patientVideo.getpatientVideo_id());
    }

    @Test
    void setPatientVideoIdTest(){
        patientVideo.setpatientVideo_id(1);
        assertEquals(1, patientVideo.getpatientVideo_id());
    }

    @Test
    void setVideoUrlTest(){
        patientVideo.setVideo_url("www.test.com");
        assertEquals("www.test.com", patientVideo.getVideo_url());
    }

    @Test
    void setFeedbackTest(){
        patientVideo.setFeedback("Test");
        assertEquals("Test", patientVideo.getFeedback());
    }

    @Test
    void setUploadedTest(){
        Timestamp time = new Timestamp(System.currentTimeMillis());

        patientVideo.setUploaded(time);
        assertEquals(time, patientVideo.getUploaded());
    }

    @Test
    void setPatientTest(){
        patientVideo.setPatient(1);
        assertEquals(1, patientVideo.getPatient());
    }


}
