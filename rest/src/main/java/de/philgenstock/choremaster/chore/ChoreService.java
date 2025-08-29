package de.philgenstock.choremaster.chore;

import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class ChoreService {

  private final ChoreRepository choreRepository;
  private final ChoreConvertService choreConvertService;

  public List<ChoreDto> getChoresFor(Long houseHoldId) {
    return choreConvertService.toDtos(choreRepository.findByHouseholdId(houseHoldId));
  }
}
