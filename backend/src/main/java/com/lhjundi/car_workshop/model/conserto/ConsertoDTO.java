package com.lhjundi.car_workshop.model.conserto;

import com.lhjundi.car_workshop.model.mecanico.MecanicoDTO;
import com.lhjundi.car_workshop.model.veiculo.VeiculoDTO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record ConsertoDTO(

        @NotBlank
        @Pattern(regexp = "\\d{2}/\\d{2}/\\d{4}")
        String entrada,

        @NotBlank
        @Pattern(regexp = "\\d{2}/\\d{2}/\\d{4}")
        String saida,

        @NotNull
        @Valid
        MecanicoDTO mecanico,

        @NotNull
        @Valid
        VeiculoDTO veiculo) {
}
