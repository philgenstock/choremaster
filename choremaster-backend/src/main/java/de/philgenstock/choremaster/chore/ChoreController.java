package de.philgenstock.choremaster.chore;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/chore")
public class ChoreController {
    private final ChoreApplicationService choreApplicationService;

    @GetMapping(value = "chores", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ChoreDto> getAllChores() {
        return choreApplicationService.getAllChores();
    }

    @PostMapping(value = "create", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ChoreDto createChore(@RequestBody CreateChoreRequest request) {
        return choreApplicationService.createChore(request);
    }

    @DeleteMapping(value = "{choreId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteChore(@PathVariable Long choreId) {
        choreApplicationService.deleteChore(choreId);
    }
}
