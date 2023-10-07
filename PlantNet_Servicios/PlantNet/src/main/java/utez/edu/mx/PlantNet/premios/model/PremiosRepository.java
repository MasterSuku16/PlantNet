package utez.edu.mx.PlantNet.premios.model;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PremiosRepository extends JpaRepository<Premios,Long>{
    Optional<Premios> findByIdPremios(long id);
    boolean existsByIdPremios(long id);
    int deletePremiosByIdPremios(long id);
}
