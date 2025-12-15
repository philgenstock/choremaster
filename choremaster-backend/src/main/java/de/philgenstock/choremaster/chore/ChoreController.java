package de.philgenstock.choremaster.chore;

import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/chore")
public class ChoreController {
    private final ChoreApplicationService choreApplicationService;

    @GetMapping(value = "chores", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ChoreDto> getChoresByHousehold(@RequestParam Long householdId) {
        return choreApplicationService.getChoresByHouseholdId(householdId);
    }

    @PostMapping(value = "create", produces = MediaType.APPLICATION_JSON_VALUE)
    public ChoreDto createChore(@RequestBody CreateChoreRequest request) {
        return choreApplicationService.createChore(request);
    }

    @GetMapping(value = "chore/{choreId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ChoreDto getChoreById(@PathVariable Long choreId) {
        return choreApplicationService.getChoreById(choreId);
    }

    @DeleteMapping(value = "chore/{choreId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public void deleteChore(@PathVariable Long choreId) {
        choreApplicationService.deleteChore(choreId);
    }
}
