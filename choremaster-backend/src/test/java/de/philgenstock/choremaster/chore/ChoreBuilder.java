package de.philgenstock.choremaster.chore;

import de.philgenstock.choremaster.household.Household;
import de.philgenstock.choremaster.persistence.BaseEntityBuilder;

public class ChoreBuilder extends BaseEntityBuilder<Chore, ChoreBuilder> {

    private String name = "Test Chore";
    private Household household;

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

    @Override
    public Chore build() {
        Chore chore = new Chore();
        applyBaseFields(chore);
        chore.setName(name);
        chore.setHousehold(household);
        return chore;
    }
}
