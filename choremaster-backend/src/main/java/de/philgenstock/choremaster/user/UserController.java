package de.philgenstock.choremaster.user;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/")
public class UserController {

    private final UserApplicationService userApplicationService;

    @PostMapping("public/login")
    public void login(@RequestBody String token) {
        userApplicationService.login(token);
    }
}
