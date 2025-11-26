package de.philgenstock.choremaster.chore;

import de.philgenstock.choremaster.household.Household;
import de.philgenstock.choremaster.household.HouseholdRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class ChoreApplicationService {

    private final ChoreService choreService;
    private final ChoreConvertService choreConvertService;
    private final HouseholdRepository householdRepository;

    public List<ChoreDto> getAllChores() {
        return choreService.getAllChores().stream()
                .map(choreConvertService::toDto)
                .toList();
    }

    @Transactional
    public ChoreDto createChore(CreateChoreRequest request) {
        Household household = householdRepository.findById(request.householdId())
                .orElseThrow(() -> new IllegalArgumentException("Household not found with id: " + request.householdId()));
        Chore chore = choreService.createChore(request.name(), household);
        return choreConvertService.toDto(chore);
    }

    public void deleteChore(Long choreId) {
        choreService.deleteChore(choreId);
    }
}
