package de.philgenstock.choremaster.chore;

import de.philgenstock.choremaster.household.Household;
import org.springframework.stereotype.Service;

@Service
public class ChoreConvertService {

    public ChoreDto toDto(Chore chore) {
        return new ChoreDto(
                chore.getId(),
                chore.getName(),
                chore.getIntervalDays()
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
