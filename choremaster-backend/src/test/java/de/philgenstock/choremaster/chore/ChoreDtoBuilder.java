package de.philgenstock.choremaster.chore;

import de.philgenstock.choremaster.chore.execution.ChoreExecutionDto;

public class ChoreDtoBuilder {

    private Long id = 1L;
    private String name = "Test Chore";
    private Integer intervalDays = 7;
    private ChoreExecutionDto lastExecution = null;

    public static ChoreDtoBuilder aChoreDto() {
        return new ChoreDtoBuilder();
    }

    public ChoreDtoBuilder withId(Long id) {
        this.id = id;
        return this;
    }

    public ChoreDtoBuilder withName(String name) {
        this.name = name;
        return this;
    }

    public ChoreDtoBuilder withIntervalDays(Integer intervalDays) {
        this.intervalDays = intervalDays;
        return this;
    }

    public ChoreDtoBuilder withLastExecution(ChoreExecutionDto lastExecution) {
        this.lastExecution = lastExecution;
        return this;
    }

    public ChoreDto build() {
        return new ChoreDto(id, name, intervalDays, lastExecution);
    }
}
