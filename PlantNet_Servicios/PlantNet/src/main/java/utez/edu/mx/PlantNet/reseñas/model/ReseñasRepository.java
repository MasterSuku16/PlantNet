package utez.edu.mx.PlantNet.reseñas.model;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ReseñasRepository extends JpaRepository<Reseñas, Long> {
    Optional<Reseñas> findByIdReseña(long id);
    boolean existsByIdReseña(long id);
    int deleteReseñasByIdReseña(long id);
}
