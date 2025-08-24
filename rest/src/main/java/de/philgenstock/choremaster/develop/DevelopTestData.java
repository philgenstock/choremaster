package de.philgenstock.choremaster.develop;

import de.philgenstock.choremaster.household.HouseHoldEntity;
import de.philgenstock.choremaster.household.HouseHoldRepository;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Profile("develop")
@Component
@AllArgsConstructor
public class DevelopTestData {

  private final HouseHoldRepository houseHoldRepository;

  @PostConstruct
  public void setupTestData() {
    if (houseHoldRepository.count() == 0) {
      HouseHoldEntity houseHoldEntity = new HouseHoldEntity();
      houseHoldEntity.setName("Glinde");
      houseHoldRepository.save(houseHoldEntity);
    }
  }
}
