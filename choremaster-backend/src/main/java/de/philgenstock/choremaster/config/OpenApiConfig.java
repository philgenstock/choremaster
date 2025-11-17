package de.philgenstock.choremaster.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Choremaster API")
                        .version("1.0.0")
                        .description("Backend API for managing your chores")
                        .contact(new Contact()
                                .name("Patrick Hilgenstock")
                        ));
    }
}
