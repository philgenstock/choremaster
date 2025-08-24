package de.philgenstock.choremaster.household;

import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/household")
@AllArgsConstructor
public class HouseHoldController {

  private final HouseHoldService houseHoldService;

  @GetMapping("/all")
  public List<HouseHoldDto> getAllHouseHolds() {
    return houseHoldService.getAllHouseHolds();
  }
}