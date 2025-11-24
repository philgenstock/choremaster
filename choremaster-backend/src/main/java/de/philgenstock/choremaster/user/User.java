package de.philgenstock.choremaster.user;

import de.philgenstock.choremaster.household.Household;
import de.philgenstock.choremaster.persistence.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.HashSet;
import java.util.Set;

@EqualsAndHashCode(callSuper = true, exclude = "households")
@Entity
@Table(name = "users")
@Data
public class User extends BaseEntity {

    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String email;

    @ManyToMany
    @JoinTable(
        name = "household_members",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "household_id")
    )
    private Set<Household> households = new HashSet<>();

    public User() {
    }
}
