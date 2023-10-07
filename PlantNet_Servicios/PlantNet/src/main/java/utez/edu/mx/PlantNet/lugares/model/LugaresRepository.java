package utez.edu.mx.PlantNet.lugares.model;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LugaresRepository extends JpaRepository<Lugares,Long> {
    Optional<Lugares> findById(long id);
    boolean existsById(long id);
    int deleteLugaresById(long id);
}
