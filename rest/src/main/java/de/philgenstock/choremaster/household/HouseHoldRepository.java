package de.philgenstock.choremaster.household;

import java.util.List;
import org.springframework.data.repository.CrudRepository;

public interface HouseHoldRepository extends CrudRepository<HouseHoldEntity, Long> {

  List<HouseHoldEntity> findAll();
}