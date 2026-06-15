package com.lhjundi.car_workshop.model.conserto;

import com.lhjundi.car_workshop.model.mecanico.Mecanico;
import com.lhjundi.car_workshop.model.veiculo.Veiculo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Optional;

@Table(name = "consertos")
@Entity(name = "Conserto")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Conserto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String entrada;
    private String saida;
    @Embedded
    private Mecanico mecanico;
    @Embedded
    private Veiculo veiculo;
    private Boolean ativo;

    public Conserto(ConsertoDTO dto){
        this.entrada = dto.entrada();
        this.saida = dto.saida();
        this.mecanico = new Mecanico(dto.mecanico());
        this.veiculo = new Veiculo(dto.veiculo());
        this.ativo = true;
    }

    public void atualizarInformacoes(AtualizacaoConsertoDTO dto) {
        Optional<String> saida = Optional.ofNullable(dto.saida());
        Optional<String> nome = Optional.ofNullable(dto.nome());
        Optional<String> experiencia = Optional.ofNullable(dto.experiencia());
        saida.ifPresent(s -> this.saida = s);
        nome.ifPresent(s -> this.mecanico.setNome(s));
        experiencia.ifPresent(s -> this.mecanico.setExperiencia(s));
    }

    public void excluir() {
        this.ativo = false;
    }
}
