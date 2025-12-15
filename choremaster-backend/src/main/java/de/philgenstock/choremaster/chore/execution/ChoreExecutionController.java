package de.philgenstock.choremaster.chore.execution;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/chore")
public class ChoreExecutionController {

    private final ChoreExecutionApplicationService choreExecutionApplicationService;

    @GetMapping(value = "{choreId}/executions")
    public List<ChoreExecutionDto> getExecutionsByChore(@PathVariable Long choreId) {
        return choreExecutionApplicationService.getExecutionsByChoreId(choreId);
    }

    @PostMapping(value = "{choreId}/execute")
    public ChoreExecutionDto executeChore(@PathVariable Long choreId) {
        return choreExecutionApplicationService.executeChore(choreId);
    }
}
