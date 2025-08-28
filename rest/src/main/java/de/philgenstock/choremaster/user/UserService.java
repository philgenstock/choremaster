package de.philgenstock.choremaster.user;

import de.philgenstock.choremaster.security.UnauthorizedException;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class UserService {

  private final UserRepository userRepository;

  public UserEntity getCurrentUser() {
    SecurityContext context = SecurityContextHolder.getContext();
    Authentication authentication = context.getAuthentication();
    if (authentication == null) throw new UnauthorizedException();

    String sub = authentication.getName();

    return userRepository
        .findByGoogleId(sub)
        .orElseGet(
            () -> {
              UserEntity userEntity = new UserEntity();
              userEntity.setGoogleId(sub);
              return userRepository.save(userEntity);
            });
  }
}
