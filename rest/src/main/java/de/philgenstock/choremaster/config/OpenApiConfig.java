package de.philgenstock.choremaster.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

  @Bean
  public OpenAPI customOpenAPI() {
    return new OpenAPI()
        .info(
            new Info()
                .title("Choremaster API")
                .description("API for managing household chores")
                .version("v1.0.0")
                .contact(new Contact().name("Patrick Hilgenstock"))
                .license(
                    new License().name("MIT License").url("https://opensource.org/licenses/MIT")));
  }
}
