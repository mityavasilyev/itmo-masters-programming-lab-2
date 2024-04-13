#!/bin/bash

# Function to send a command to the server and check the response
test_command() {
    local command=$1
    local expected_response=$2
    echo "Sending command: $command"
    response=$(echo "$command" | curl -s --max-time 5)
    if [[ "$response" == "$expected_response" ]]; then
        echo "Test passed: $command"
    else
        echo "Test failed: $command. Expected: $expected_response, Got: $response"
        exit 1
    fi
}

# Test commands
# Create user
test_command "curl --location 'localhost:8080/api/users' --header 'Content-Type: application/json' --data '{\"username\": \"boba\",\"password\": \"boba\"}'" "{\"id\": 7,\"username\": \"boba\"}"

# Login user
test_command "curl --location --request POST 'localhost:8080/api/users/login' --header 'Authorization: Basic Ym9iYTpib2Jh' --data ''" "{\"username\": \"boba\",\"isLoginSuccessful\": true}"

# Send message
test_command "curl --location 'localhost:8080/api/messages' --header 'Content-Type: application/json' --header 'Authorization: Basic cGlkcjpwaWRy' --data '{\"content\": \"Privet loshara\",\"receiverUsername\": \"boba\"}'" "HTTP CODE 200"

# Verify sent messages
test_command "curl --location --request POST 'localhost:8080/api/messages/sent' --header 'Authorization: Basic cGlkcjpwaWRy' --header 'Cookie: JSESSIONID=BCF7925F43CA992DDA6058165165B3E7'" "{\"id\": 1,\"content\": \"Privet pidr\",\"senderUsername\": \"pidr\",\"receiverUsername\": \"boba\"}"

# Create another user
test_command "curl --location 'localhost:8080/api/users' --header 'Content-Type: application/json' --data '{\"username\": \"newuser\",\"password\": \"newuser\"}'" "{\"id\": 8,\"username\": \"newuser\"}"

# Verify received messages
test_command "curl --location --request POST 'localhost:8080/api/messages/received' --header 'Authorization: Basic cGlkcjpwaWRy' --header 'Cookie: JSESSIONID=BCF7925F43CA992DDA6058165165B3E7'" "{\"id\": 5,\"content\": \"Privet loshara\",\"senderUsername\": \"pidr\",\"receiverUsername\": \"boba\"}"

echo "All tests passed."
