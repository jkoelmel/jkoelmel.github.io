package test.java;

import main.server.PTMessage.PTMessage;
import org.junit.jupiter.api.Test;

import java.sql.Timestamp;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class PTMessageTest {
	@Test
	void constructorsCreatePTMessagesGivenParameters() {
		Integer message_id = 1;
		PTMessage ptMessage = new PTMessage(message_id);

		assertEquals(message_id, ptMessage.getmessage_id());

		Timestamp timestamp = Timestamp.valueOf("2020-11-13 19:14:01");
		String sender = "test@mail.com";
		ptMessage = new PTMessage(sender, timestamp);

		assertEquals(sender, ptMessage.getSender());
		assertEquals(timestamp, ptMessage.getCreated_On());
	}

	@Test
	void gettersAndSettersShouldReturnCorrectData() {
		// TODO: these rely on mock data
	}

	@Test
	void getMessageContents() {
		// TODO
	}

	@Test
	void createMessage() {
		// TODO
	}

	// TODO: PTMessageUtil once we have mocking
}
