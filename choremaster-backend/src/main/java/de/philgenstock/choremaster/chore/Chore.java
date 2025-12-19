package de.philgenstock.choremaster.chore;

import de.philgenstock.choremaster.household.Household;
import de.philgenstock.choremaster.persistence.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "chore")
@Data
public class Chore extends BaseEntity {

    @NotBlank(message = "Chore name cannot be empty")
    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer intervalDays;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "household_id", nullable = false)
    private Household household;

    public Chore() {
    }

    public Chore(String name, Integer intervalDays, Household household) {
        this.name = name;
        this.intervalDays = intervalDays;
        this.household = household;
    }
}
