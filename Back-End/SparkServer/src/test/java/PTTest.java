package test.java;

import main.server.PT.PT;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PTTest {
	@Test
	void constructorsCreatePTGivenParameters() {
		String email = "test@mail.com";
		String password = "test";
		String f_name = "John";
		String l_name = "Doe";
		String company = "Testing and Co";
		PT pt = new PT(email, password, f_name, l_name, company);
		// Passwords are tested in AES

		assertEquals(email, pt.getEmail());
		assertEquals(f_name, pt.getF_name());
		assertEquals(l_name, pt.getL_name());
		assertEquals(company, pt.getCompany());

		pt = new PT(1);
		assertEquals(1, pt.getPt_id());

		pt = new PT("mail@test.com");
		assertEquals("mail@test.com", pt.getEmail());
	}

	@Test
	void gettersAndSettersShouldReturnCorrectData() {
		PT pt = new PT(1);

		pt.setPt_id(2);
		assertEquals(2, pt.getPt_id());

		pt.setUser(3);
		assertEquals(3, pt.getUser());
	}

	@Test
	void createPT() {
		// TODO: Need to go over mocking data first.
	}

	@Test
	void getPT() {
		// TODO: Need to go over mocking data first.
	}

	// TODO: PTUtil functions, once mocking is set up.
}