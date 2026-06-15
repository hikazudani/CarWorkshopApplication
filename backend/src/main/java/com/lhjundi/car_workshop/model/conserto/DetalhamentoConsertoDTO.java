package com.lhjundi.car_workshop.model.conserto;

import com.lhjundi.car_workshop.model.mecanico.Mecanico;
import com.lhjundi.car_workshop.model.veiculo.Veiculo;

public record DetalhamentoConsertoDTO(
        Long id,
        String entrada,
        String saida,
        Mecanico mecanico,
        Veiculo veiculo
) {
    public DetalhamentoConsertoDTO(Conserto conserto) {
        this(
                conserto.getId(),
                conserto.getEntrada(),
                conserto.getSaida(),
                conserto.getMecanico(),
                conserto.getVeiculo()
        );
    }
}
