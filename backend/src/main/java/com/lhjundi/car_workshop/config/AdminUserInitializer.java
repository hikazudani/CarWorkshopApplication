package com.lhjundi.car_workshop.config;

import com.lhjundi.car_workshop.model.usuario.Usuario;
import com.lhjundi.car_workshop.repository.UsuarioRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

/**
 * Cria um usuario administrador inicial caso ele ainda nao exista.
 *
 * As credenciais vem das variaveis de ambiente APP_ADMIN_LOGIN e
 * APP_ADMIN_PASSWORD (ver application.properties), evitando versionar
 * credenciais no repositorio. A senha e armazenada com hash BCrypt.
 */
@Component
public class AdminUserInitializer implements ApplicationRunner {

    private static final Logger log = LoggerFactory.getLogger(AdminUserInitializer.class);

    private final UsuarioRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final String adminLogin;
    private final String adminSenha;

    public AdminUserInitializer(
            UsuarioRepository repository,
            PasswordEncoder passwordEncoder,
            @Value("${app.admin.login}") String adminLogin,
            @Value("${app.admin.senha}") String adminSenha) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.adminLogin = adminLogin;
        this.adminSenha = adminSenha;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (!StringUtils.hasText(adminLogin) || !StringUtils.hasText(adminSenha)) {
            log.warn("APP_ADMIN_LOGIN/APP_ADMIN_PASSWORD nao definidos; "
                    + "nenhum usuario administrador inicial foi criado.");
            return;
        }
        if (repository.findByLogin(adminLogin) != null) {
            return;
        }
        var usuario = new Usuario(null, adminLogin, passwordEncoder.encode(adminSenha));
        repository.save(usuario);
        log.info("Usuario administrador inicial criado: {}", adminLogin);
    }
}