package de.philgenstock.choremaster.chore;

import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chore")
@AllArgsConstructor
public class ChoreController {

  private final ChoreService choreService;

  @GetMapping("/household/{householdId}")
  public List<ChoreDto> getChoresFor(@PathVariable Long houseHoldId) {
    return choreService.getChoresFor(houseHoldId);
  }
}
