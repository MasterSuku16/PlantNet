package utez.edu.mx.PlantNet.usuarios.model;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuariosRepository extends JpaRepository<Usuarios,Long> {
    Optional<Usuarios> findByIdUsuario(long id);
    boolean existsByIdUsuario(long id);
    int deleteUsuariosByIdUsuario(long id);
}
