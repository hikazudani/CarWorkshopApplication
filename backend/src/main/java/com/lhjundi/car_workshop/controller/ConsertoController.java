package com.lhjundi.car_workshop.controller;


import com.lhjundi.car_workshop.model.conserto.*;
import com.lhjundi.car_workshop.repository.ConsertoRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("consertos")
public class ConsertoController {

    @Autowired
    private ConsertoRepository repository;

    @PostMapping
    @Transactional
    public ResponseEntity cadastrar(@RequestBody @Valid
                                        ConsertoDTO dados,
                                    UriComponentsBuilder uriComponentsBuilder) {
        var conserto = new Conserto(dados);
        repository.save(conserto);
        var uri = uriComponentsBuilder.path("/consertos/{id}").buildAndExpand(conserto.getId()).toUri();
        return ResponseEntity.created(uri).body(new DetalhamentoConsertoDTO(conserto));
    }

    @GetMapping
    public ResponseEntity listar(Pageable paginacao){
        Page<Conserto> page = repository.findAll(paginacao);
        return ResponseEntity.ok(page);
    }

    @GetMapping("relatorios")
    public ResponseEntity relatorioConsertos(){
        List<ListagemConsertoDTO> list = repository.findAllByAtivoTrue()
                .stream()
                .map(ListagemConsertoDTO::new)
                .toList();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity getConsertoById(@PathVariable Long id){
        Optional<Conserto> consertoOptional = repository.findById(id);
        if (consertoOptional.isPresent()){
            Conserto conserto = consertoOptional.get();
            return ResponseEntity.ok(new DetalhamentoConsertoDTO(conserto));
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping
    @Transactional
    public ResponseEntity atualizar(@RequestBody @Valid AtualizacaoConsertoDTO dto){
        Conserto conserto = repository.getReferenceById(dto.id());
        conserto.atualizarInformacoes(dto);
        return ResponseEntity.ok(new DetalhamentoConsertoDTO(conserto));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity excluir(@PathVariable Long id) {
        repository.getReferenceById(id).excluir();
        return ResponseEntity.noContent().build();
    }

}
