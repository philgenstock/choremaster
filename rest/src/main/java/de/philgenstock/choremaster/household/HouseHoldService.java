package de.philgenstock.choremaster.household;

import de.philgenstock.choremaster.user.UserEntity;
import de.philgenstock.choremaster.user.UserService;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class HouseHoldService {

  private final HouseHoldConvertService houseHoldConvertService;
  private final UserService userService;

  public List<HouseHoldDto> getAllHouseHolds() {
    UserEntity currentUser = userService.getCurrentUser();
    return houseHoldConvertService.toDtos(currentUser.getHouseHolds());
  }
}
