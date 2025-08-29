package de.philgenstock.choremaster.chore;

import java.util.List;
import org.springframework.data.repository.CrudRepository;

public interface ChoreRepository extends CrudRepository<ChoreEntity, Long> {

  List<ChoreEntity> findByHouseHoldId(Long houseHoldId);
}
