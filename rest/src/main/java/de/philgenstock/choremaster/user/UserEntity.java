package de.philgenstock.choremaster.user;

import de.philgenstock.choremaster.household.HouseHoldEntity;
import de.philgenstock.choremaster.persistence.BaseEntity;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import lombok.Data;

@Data
@Table(name = "users")
@Entity
public class UserEntity extends BaseEntity {

  private String googleId;
  private String name;
  private String email;

  @ManyToMany(
      cascade = {CascadeType.ALL},
      fetch = FetchType.LAZY)
  @JoinTable(
      name = "users_to_household",
      joinColumns = {@JoinColumn(name = "user_id")},
      inverseJoinColumns = {@JoinColumn(name = "household_id")})
  private List<HouseHoldEntity> houseHolds = new ArrayList<>();

  public void addHouseHold(HouseHoldEntity houseHold) {
    houseHolds.add(houseHold);
  }
}
