package de.philgenstock.choremaster.chore;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateChoreRequest(
        @NotBlank(message = "Chore name cannot be empty")
        String name,
        @NotNull(message = "Household ID cannot be null")
        Long householdId
) {
}
