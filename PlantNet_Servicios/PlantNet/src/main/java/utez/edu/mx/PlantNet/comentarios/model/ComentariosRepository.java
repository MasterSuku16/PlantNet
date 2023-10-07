package utez.edu.mx.PlantNet.comentarios.model;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ComentariosRepository extends JpaRepository<Comentarios, Long> {
    Optional<Comentarios> findByIdComentarios(long id);
    boolean existsByIdComentarios(long id);
    int deleteComentariosByIdComentarios(long id);
}
