package de.philgenstock.choremaster.chore;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UpdateChoreRequest(
        @NotBlank(message = "Chore name cannot be empty")
        String name,
        @NotNull(message = "Interval days cannot be null")
        Integer intervalDays
) {
}
