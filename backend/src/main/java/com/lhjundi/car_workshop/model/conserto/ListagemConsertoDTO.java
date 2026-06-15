package com.lhjundi.car_workshop.model.conserto;

public record ListagemConsertoDTO(
        Long id,
        String entrada,
        String saida,
        String nome,
        String marca,
        String modelo
){
    public ListagemConsertoDTO(Conserto conserto){
        this(
                conserto.getId(),
                conserto.getEntrada(),
                conserto.getSaida(),
                conserto.getMecanico().getNome(),
                conserto.getVeiculo().getMarca(),
                conserto.getVeiculo().getAno()
        );
    }
}
