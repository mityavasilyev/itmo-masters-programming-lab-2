package io.github.mityavasilyev.itmomastersprogramminglab2.repository;

import io.github.mityavasilyev.itmomastersprogramminglab2.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);

    Boolean existsByUsernameAndPassword(String username, String password);
}
