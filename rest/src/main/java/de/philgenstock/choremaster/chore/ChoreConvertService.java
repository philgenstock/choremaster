package de.philgenstock.choremaster.chore;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;

@Component
public class ChoreConvertService {

  public ChoreDto toDto(ChoreEntity choreEntity) {
    return new ChoreDto(choreEntity.getId(), choreEntity.getName());
  }

  public List<ChoreDto> toDtos(List<ChoreEntity> choreEntities) {
    return choreEntities.stream().map(this::toDto).collect(Collectors.toList());
  }
}
