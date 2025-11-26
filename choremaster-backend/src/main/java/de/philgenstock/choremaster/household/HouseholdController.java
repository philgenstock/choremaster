package de.philgenstock.choremaster.household;

import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping(value = "create", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public HouseholdDto createHousehold(@RequestBody CreateHouseholdRequest request) {
        return householdApplicationService.createHouseholdForCurrentUser(request);
    }
}
