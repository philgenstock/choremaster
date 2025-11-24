package de.philgenstock.choremaster.security;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import de.philgenstock.choremaster.user.UserDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class TokenService {

    private final GoogleIdTokenVerifier verifier;

    public TokenService(@Value("${google.oauth.client-id}") String clientId) {
        this.verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                .setAudience(Collections.singletonList(clientId))
                .build();
    }

    public UserDto getUserFromToken(String token) {
        try {
            GoogleIdToken idToken = verifier.verify(token);
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                return new UserDto((String) payload.get("name"), payload.getEmail());
            }
        } catch (Exception e) {
            return null;
        }
        return null;
    }

    public String extractEmailFromToken(String token) {
        try {
            GoogleIdToken idToken = verifier.verify(token);
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                return payload.getEmail();
            }
        } catch (Exception e) {
            return null;
        }
        return null;
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        try {
            GoogleIdToken idToken = verifier.verify(token);
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                String email = payload.getEmail();
                return email != null && email.equals(userDetails.getUsername());
            }
        } catch (Exception e) {
            return false;
        }
        return false;
    }
}
