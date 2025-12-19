package de.philgenstock.choremaster.chore;

import de.philgenstock.choremaster.household.Household;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class ChoreService {

    private final ChoreRepository choreRepository;

    public List<Chore> getChoresByHousehold(Household household) {
        return choreRepository.findByHousehold(household);
    }

    public Chore createChore(String name, Integer intervalDays, Household household) {
        Chore chore = new Chore(name, intervalDays, household);
        return choreRepository.save(chore);
    }

    public Chore getChoreById(Long choreId) {
        return choreRepository.findById(choreId)
                .orElseThrow(() -> new IllegalArgumentException("Chore not found with id: " + choreId));
    }

    public void deleteChore(Long choreId) {
        choreRepository.deleteById(choreId);
    }

    public Chore updateChore(Long choreId, String name, Integer intervalDays) {
        Chore chore = getChoreById(choreId);
        chore.setName(name);
        chore.setIntervalDays(intervalDays);
        return choreRepository.save(chore);
    }
}
