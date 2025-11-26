package de.philgenstock.choremaster.household;

import jakarta.validation.constraints.NotBlank;

public record CreateHouseholdRequest(
        @NotBlank(message = "Household name cannot be empty")
        String name
) {
}
