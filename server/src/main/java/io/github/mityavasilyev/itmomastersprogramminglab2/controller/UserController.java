package io.github.mityavasilyev.itmomastersprogramminglab2.controller;

import io.github.mityavasilyev.itmomastersprogramminglab2.dto.LoginResponse;
import io.github.mityavasilyev.itmomastersprogramminglab2.model.User;
import io.github.mityavasilyev.itmomastersprogramminglab2.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping
    public User createUser(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @GetMapping
    public List<User> getAllUsers() {
        var users = userRepository.findAll();
        users.forEach(User::clearSensitiveData);
        return users;
    }

    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public LoginResponse verifyCredentials(@AuthenticationPrincipal UserDetails userDetails) {
        return LoginResponse.builder()
                .isLoginSuccessful(true)
                .username(userDetails.getUsername())
                .build();
    }
}
