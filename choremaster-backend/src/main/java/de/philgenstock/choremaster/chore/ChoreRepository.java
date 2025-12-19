package de.philgenstock.choremaster.chore;

import de.philgenstock.choremaster.household.Household;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ChoreRepository extends CrudRepository<Chore, Long> {
    @Query("SELECT c FROM Chore c LEFT JOIN FETCH c.lastExecution WHERE c.household = :household")
    List<Chore> findByHouseholdWithLastExecution(@Param("household") Household household);

    @Query("SELECT c FROM Chore c LEFT JOIN FETCH c.lastExecution WHERE c.id = :id")
    Optional<Chore> findByIdWithLastExecution(@Param("id") Long id);

}
