package de.philgenstock.choremaster.chore;

import de.philgenstock.choremaster.household.HouseHoldEntity;
import de.philgenstock.choremaster.persistence.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "chore")
public class ChoreEntity extends BaseEntity {
  private String name;

  @ManyToOne
  @JoinColumn(name = "household_id")
  private HouseHoldEntity household;
}
