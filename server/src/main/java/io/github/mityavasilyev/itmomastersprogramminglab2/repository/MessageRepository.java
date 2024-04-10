package io.github.mityavasilyev.itmomastersprogramminglab2.repository;

import io.github.mityavasilyev.itmomastersprogramminglab2.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findAllBySenderUsername(String username);
    List<Message> findAllByReceiverUsername(String username);
}
