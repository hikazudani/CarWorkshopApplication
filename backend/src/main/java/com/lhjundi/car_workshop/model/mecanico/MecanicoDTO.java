package com.lhjundi.car_workshop.model.mecanico;

import jakarta.validation.constraints.NotBlank;

public record MecanicoDTO(

        @NotBlank
        String nome,

        String experiencia) {
}
