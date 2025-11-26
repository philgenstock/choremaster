package de.philgenstock.choremaster.chore.execution;

import de.philgenstock.choremaster.chore.Chore;
import de.philgenstock.choremaster.persistence.BaseEntityBuilder;
import de.philgenstock.choremaster.user.User;

public class ChoreExecutionBuilder extends BaseEntityBuilder<ChoreExecution, ChoreExecutionBuilder> {

    private Chore chore;
    private User executor;

    public static ChoreExecutionBuilder aChoreExecution() {
        return new ChoreExecutionBuilder();
    }

    public ChoreExecutionBuilder withChore(Chore chore) {
        this.chore = chore;
        return this;
    }

    public ChoreExecutionBuilder withExecutor(User executor) {
        this.executor = executor;
        return this;
    }

    @Override
    public ChoreExecution build() {
        ChoreExecution choreExecution = new ChoreExecution();
        applyBaseFields(choreExecution);
        choreExecution.setChore(chore);
        choreExecution.setExecutor(executor);
        return choreExecution;
    }
}
