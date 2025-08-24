package de.philgenstock.choremaster.household;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;

@Component
public class HouseHoldConvertService {

  public HouseHoldDto toDto(HouseHoldEntity houseHoldEntity) {
    return new HouseHoldDto(houseHoldEntity.getId(), houseHoldEntity.getName());
  }

  public List<HouseHoldDto> toDtos(List<HouseHoldEntity> houseHoldEntities) {
    return houseHoldEntities.stream().map(this::toDto).collect(Collectors.toList());
  }
}