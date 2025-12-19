package de.philgenstock.choremaster.chore;

import de.philgenstock.choremaster.chore.execution.ChoreExecutionConvertService;
import de.philgenstock.choremaster.chore.execution.ChoreExecutionDto;
import de.philgenstock.choremaster.household.Household;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ChoreConvertService {

    private final ChoreExecutionConvertService choreExecutionConvertService;

    public ChoreDto toDto(Chore chore) {
        ChoreExecutionDto lastExecutionDto = chore.getLastExecution() != null
                ? choreExecutionConvertService.toDto(chore.getLastExecution())
                : null;

        return new ChoreDto(
                chore.getId(),
                chore.getName(),
                chore.getIntervalDays(),
                lastExecutionDto
        );
    }

    public Chore toNewChore(ChoreDto choreDto, Household household) {
        Chore chore = new Chore();
        chore.setName(choreDto.name());
        chore.setIntervalDays(choreDto.intervalDays());
        chore.setHousehold(household);
        return chore;
    }
}
