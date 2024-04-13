#!/bin/bash

# Function to send a command to the server and check the response
test_command() {
    local command=$1
    local expected_response=$2
    echo "Sending command: $command"
    response=$(eval "$command")
    if [[ "$response" == "$expected_response" ]]; then
        echo "Test passed: $command"
    else
        echo "Test failed: $command. Expected: $expected_response, Got: $response"
        exit 1
    fi
}

generate_basic_auth_header() {
    local username=$1
    local password=$2
    local auth_string="$username:$password"
    local auth_base64=$(echo -n "$auth_string" | base64)
    echo "Authorization: Basic $auth_base64"
}

# Test commands
# Create user
test_command "curl --location 'localhost:8080/api/users' --header 'Content-Type: application/json' --data '{\"username\": \"boba\",\"password\": \"boba\"}'" "{\"id\":[0-9]+,\"username\": \"boba\",\"password\":\".*\"}"
basic_auth_header=$(generate_basic_auth_header "boba" "boba")

# Login user
test_command "curl --location --request POST 'localhost:8080/api/users/login' --header '$basic_auth_header' --data ''" "{\"username\": \"boba\",\"isLoginSuccessful\": true}"

# Send message
test_command "curl --location 'localhost:8080/api/messages' --header 'Content-Type: application/json' --header '$basic_auth_header' --data '{\"content\": \"Privet loshara\",\"receiverUsername\": \"loshara\"}'" "HTTP CODE 200"

# Verify sent messages
test_command "curl --location --request POST 'localhost:8080/api/messages/sent' --header '$basic_auth_header' --header 'Cookie: JSESSIONID=BCF7925F43CA992DDA6058165165B3E7'" "{\"id\": [0-9]+,\"content\": \"Privet loshara\",\"senderUsername\": \"boba\",\"receiverUsername\": \"loshara\"}"

# Create another user
test_command "curl --location 'localhost:8080/api/users' --header 'Content-Type: application/json' --data '{\"username\": \"loshara\",\"password\": \"loshara\"}'" "{\"id\":[0-9]+,\"username\": \"loshara\",\"password\":\".*\"}"
basic_auth_header=$(generate_basic_auth_header "loshara" "loshara")

# Verify received messages
test_command "curl --location --request POST 'localhost:8080/api/messages/received' --header '$basic_auth_header' --header 'Cookie: JSESSIONID=BCF7925F43CA992DDA6058165165B3E7'" "{\"id\": [0-9]+,\"content\": \"Privet loshara\",\"senderUsername\": \"boba\",\"receiverUsername\": \"loshara\"}"

echo "All tests passed."
