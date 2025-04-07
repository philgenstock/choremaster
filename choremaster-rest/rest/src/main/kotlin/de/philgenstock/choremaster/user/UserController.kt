package de.philgenstock.choremaster.user

import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/user")
class UserController(
    private val userService: UserService,
) {
    @PostMapping("/login")
    fun login(
        @RequestParam("token") googleToken: String,
    ) = userService.login(googleToken)
}
