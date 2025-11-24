package de.philgenstock.choremaster.household;

import de.philgenstock.choremaster.persistence.BaseEntity;
import de.philgenstock.choremaster.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.HashSet;
import java.util.Set;

@EqualsAndHashCode(callSuper = true, exclude = "members")
@Entity
@Table(name = "households")
@Data
public class Household extends BaseEntity {

    @NotBlank(message = "Household name cannot be empty")
    @Column(nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @ManyToMany(mappedBy = "households")
    private Set<User> members = new HashSet<>();

    public Household() {
    }

    public Household(String name, User owner) {
        this.name = name;
        this.owner = owner;
    }
}
