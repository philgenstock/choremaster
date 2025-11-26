package de.philgenstock.choremaster.chore;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ChoreRepository extends CrudRepository<Chore, Long> {
    List<Chore> findAll();
}
