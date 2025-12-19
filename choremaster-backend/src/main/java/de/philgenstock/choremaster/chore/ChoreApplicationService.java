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

    public List<ChoreDto> getChoresByHouseholdId(Long householdId) {
        Household household = householdRepository.findById(householdId)
                .orElseThrow(() -> new IllegalArgumentException("Household not found with id: " + householdId));
        return choreService.getChoresByHousehold(household).stream()
                .map(choreConvertService::toDto)
                .toList();
    }

    @Transactional
    public ChoreDto createChore(CreateChoreRequest request) {
        Household household = householdRepository.findById(request.householdId())
                .orElseThrow(() -> new IllegalArgumentException("Household not found with id: " + request.householdId()));
        Chore chore = choreService.createChore(request.name(), request.intervalDays(), household);
        return choreConvertService.toDto(chore);
    }

    public void deleteChore(Long choreId) {
        choreService.deleteChore(choreId);
    }

    public ChoreDto getChoreById(Long choreId) {
        return choreConvertService.toDto(choreService.getChoreById(choreId));
    }

    @Transactional
    public ChoreDto updateChore(Long choreId, UpdateChoreRequest request) {
        Chore chore = choreService.updateChore(choreId, request.name(), request.intervalDays());
        return choreConvertService.toDto(chore);
    }
}
