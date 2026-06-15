package com.lhjundi.car_workshop.controller;

import com.lhjundi.car_workshop.model.usuario.AutenticacaoUsuarioDTO;
import com.lhjundi.car_workshop.model.usuario.Usuario;
import com.lhjundi.car_workshop.utils.security.JWTTokenService;
import com.lhjundi.car_workshop.utils.security.TokenJWTDTO;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class AutenticacaoController {

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private JWTTokenService tokenService;

    @PostMapping
    public ResponseEntity efetuarLogin(@RequestBody @Valid AutenticacaoUsuarioDTO dto){
        var token = new UsernamePasswordAuthenticationToken(dto.login(), dto.senha());
        var authentication = manager.authenticate(token);
        var tokenJWT = tokenService.gerarToken((Usuario) authentication.getPrincipal());
        return ResponseEntity
                .ok(new TokenJWTDTO(tokenJWT));
    }
}
