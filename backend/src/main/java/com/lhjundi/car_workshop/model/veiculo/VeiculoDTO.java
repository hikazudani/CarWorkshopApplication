package com.lhjundi.car_workshop.model.veiculo;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record VeiculoDTO(

        @NotBlank
        String marca,

        @NotBlank
        String modelo,

        String cor,

        @NotBlank
        @Pattern(regexp = "\\d{4}")
        String ano) {
}
