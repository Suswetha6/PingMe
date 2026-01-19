package com.example.demo;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(classes = PingmeApplication.class)
class PingmeApplicationTests {

	@Test
	void contextLoads() {
		assertTrue(true);
	}

}
