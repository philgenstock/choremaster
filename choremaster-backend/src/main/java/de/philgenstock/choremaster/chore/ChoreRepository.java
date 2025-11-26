package de.philgenstock.choremaster.chore;

import de.philgenstock.choremaster.household.Household;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ChoreRepository extends CrudRepository<Chore, Long> {
    List<Chore> findByHousehold(Household household);
}
