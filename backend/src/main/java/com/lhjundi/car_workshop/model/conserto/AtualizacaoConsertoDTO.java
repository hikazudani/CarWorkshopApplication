package com.lhjundi.car_workshop.model.conserto;

import jakarta.validation.constraints.NotNull;

public record AtualizacaoConsertoDTO(
        @NotNull
        Long id,
        String saida,
        String nome,
        String experiencia
) {

}
