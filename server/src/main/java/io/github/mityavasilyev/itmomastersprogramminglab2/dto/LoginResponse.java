package io.github.mityavasilyev.itmomastersprogramminglab2.dto;

import lombok.Builder;
import lombok.Data;


@Builder
@Data
public class LoginResponse {

    private String username;
    private Boolean isLoginSuccessful;

}
