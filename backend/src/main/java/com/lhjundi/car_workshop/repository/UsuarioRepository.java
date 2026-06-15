package com.lhjundi.car_workshop.repository;

import com.lhjundi.car_workshop.model.usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {


    UserDetails findByLogin(String username);
}
