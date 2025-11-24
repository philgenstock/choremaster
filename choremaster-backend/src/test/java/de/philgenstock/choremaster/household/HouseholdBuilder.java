package de.philgenstock.choremaster.household;

import de.philgenstock.choremaster.persistence.BaseEntityBuilder;
import de.philgenstock.choremaster.user.User;

public class HouseholdBuilder extends BaseEntityBuilder<Household, HouseholdBuilder> {

    private String name = "Test Household";
    private User owner;

    public static HouseholdBuilder aHousehold() {
        return new HouseholdBuilder();
    }

    public HouseholdBuilder withName(String name) {
        this.name = name;
        return this;
    }

    public HouseholdBuilder withOwner(User owner) {
        this.owner = owner;
        return this;
    }

    @Override
    public Household build() {
        Household household = new Household();
        applyBaseFields(household);
        household.setName(name);
        household.setOwner(owner);
        return household;
    }
}
