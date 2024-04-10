package io.github.mityavasilyev.itmomastersprogramminglab2.controller;

import io.github.mityavasilyev.itmomastersprogramminglab2.model.Message;
import io.github.mityavasilyev.itmomastersprogramminglab2.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageRepository messageRepository;

    @PostMapping
    public Message createMessage(@RequestBody Message message, @AuthenticationPrincipal UserDetails userDetails) {
        message.setSenderUsername(userDetails.getUsername());
        return messageRepository.save(message);
    }

    @PostMapping("/received")
    public List<Message> getAllReceivedMessages(@AuthenticationPrincipal UserDetails userDetails) {
        return messageRepository.findAllByReceiverUsername(userDetails.getUsername());
    }

    @PostMapping("/sent")
    public List<Message> getAllSentMessages(@AuthenticationPrincipal UserDetails userDetails) {
        return messageRepository.findAllBySenderUsername(userDetails.getUsername());
    }

}
