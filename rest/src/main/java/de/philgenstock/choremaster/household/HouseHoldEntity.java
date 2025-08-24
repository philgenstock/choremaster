package de.philgenstock.choremaster.household;

import de.philgenstock.choremaster.persistence.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "household")
public class HouseHoldEntity extends BaseEntity {

  private String name;
}
