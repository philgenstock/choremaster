package de.philgenstock.choremaster.household;

import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/household")
public class HouseholdController {
    private final HouseholdApplicationService householdApplicationService;


    @GetMapping(value = "households", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<HouseholdDto> getAllHouseholdForCurrentUser() {
        return householdApplicationService.getHouseholdsForCurrentUser();
    }
}
