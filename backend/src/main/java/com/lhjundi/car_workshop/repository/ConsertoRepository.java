package com.lhjundi.car_workshop.repository;

import com.lhjundi.car_workshop.model.conserto.Conserto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConsertoRepository extends JpaRepository<Conserto, Long> {
    List<Conserto> findAllByAtivoTrue();
}
