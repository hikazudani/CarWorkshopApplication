package com.lhjundi.car_workshop.model.veiculo;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Veiculo {
    private String marca;
    private String modelo;
    private String cor;
    private String ano;

    public Veiculo(VeiculoDTO dto){
        this.marca = dto.marca();
        this.modelo = dto.modelo();
        this.cor = dto.cor();
        this.ano = dto.ano();
    }
}
