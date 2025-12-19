package de.philgenstock.choremaster.chore;

import de.philgenstock.choremaster.chore.execution.ChoreExecution;
import de.philgenstock.choremaster.household.Household;
import de.philgenstock.choremaster.persistence.BaseEntityBuilder;

public class ChoreBuilder extends BaseEntityBuilder<Chore, ChoreBuilder> {

    private String name = "Test Chore";
    private Household household;
    private Integer intervalDays = 7;
    private ChoreExecution lastExecution;

    public static ChoreBuilder aChore() {
        return new ChoreBuilder();
    }

    public ChoreBuilder withName(String name) {
        this.name = name;
        return this;
    }

    public ChoreBuilder withHousehold(Household household) {
        this.household = household;
        return this;
    }

    public ChoreBuilder withIntervalDays(int integerDays) {
        this.intervalDays = integerDays;
        return this;
    }

    public ChoreBuilder withLastExecution(ChoreExecution lastExecution) {
        this.lastExecution = lastExecution;
        return this;
    }

    @Override
    public Chore build() {
        Chore chore = new Chore();
        applyBaseFields(chore);
        chore.setName(name);
        chore.setHousehold(household);
        chore.setIntervalDays(intervalDays);
        chore.setLastExecution(lastExecution);
        return chore;
    }
}
