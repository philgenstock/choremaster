package de.philgenstock.choremaster.user;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<UserEntity, Long> {

  Optional<UserEntity> findByGoogleId(String googleId);
}
