package de.philgenstock.choremaster.chore;

import de.philgenstock.choremaster.household.Household;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class ChoreService {

    private final ChoreRepository choreRepository;

    public List<Chore> getAllChores() {
        return choreRepository.findAll();
    }

    public Chore createChore(String name, Household household) {
        Chore chore = new Chore(name, household);
        return choreRepository.save(chore);
    }

    public void deleteChore(Long choreId) {
        choreRepository.deleteById(choreId);
    }
}
