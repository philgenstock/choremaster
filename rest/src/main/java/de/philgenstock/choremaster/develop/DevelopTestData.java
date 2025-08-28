package de.philgenstock.choremaster.develop;

import de.philgenstock.choremaster.household.HouseHoldEntity;
import de.philgenstock.choremaster.household.HouseHoldRepository;
import de.philgenstock.choremaster.user.UserEntity;
import de.philgenstock.choremaster.user.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Profile("develop")
@Component
@AllArgsConstructor
public class DevelopTestData {

  private final HouseHoldRepository houseHoldRepository;
  private final UserRepository userRepository;

  @PostConstruct
  public void setupTestData() {
    if (houseHoldRepository.count() == 0) {
      HouseHoldEntity houseHoldEntity = new HouseHoldEntity();
      houseHoldEntity.setName("Glinde");
      houseHoldRepository.save(houseHoldEntity);

      UserEntity userEntity = new UserEntity();
      userEntity.setName("Patrick");
      userEntity.setGoogleId("113912209918713002255");

      userEntity = userRepository.save(userEntity);

      userEntity.addHouseHold(houseHoldEntity);
      userRepository.save(userEntity);
    }
  }
}
