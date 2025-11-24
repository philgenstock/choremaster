package de.philgenstock.choremaster;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class ChoremasterApplication {

    static void main(String[] args) {
        SpringApplication.run(ChoremasterApplication.class, args);
    }

}
