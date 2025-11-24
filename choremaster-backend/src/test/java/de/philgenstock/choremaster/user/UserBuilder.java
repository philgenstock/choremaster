package de.philgenstock.choremaster.user;

import de.philgenstock.choremaster.persistence.BaseEntityBuilder;

public class UserBuilder extends BaseEntityBuilder<User, UserBuilder> {

    private String name = "Test User";
    private String email = "test@example.com";

    public static UserBuilder aUser() {
        return new UserBuilder();
    }

    public UserBuilder withName(String name) {
        this.name = name;
        return this;
    }

    public UserBuilder withEmail(String email) {
        this.email = email;
        return this;
    }

    @Override
    public User build() {
        User user = new User();
        applyBaseFields(user);
        user.setName(name);
        user.setEmail(email);
        return user;
    }
}
