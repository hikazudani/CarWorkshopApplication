package com.lhjundi.car_workshop.model.usuario;

import jakarta.validation.constraints.NotBlank;

public record AutenticacaoUsuarioDTO(

        @NotBlank
        String login,

        @NotBlank
        String senha) {
}
