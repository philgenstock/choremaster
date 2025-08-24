package de.philgenstock.choremaster.household;

import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class HouseHoldService {

  private final HouseHoldRepository houseHoldRepository;
  private final HouseHoldConvertService houseHoldConvertService;

  public List<HouseHoldDto> getAllHouseHolds() {
    return houseHoldConvertService.toDtos(houseHoldRepository.findAll());
  }
}