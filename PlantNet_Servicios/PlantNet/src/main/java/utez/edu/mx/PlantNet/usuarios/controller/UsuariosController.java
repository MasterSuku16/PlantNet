package utez.edu.mx.PlantNet.usuarios.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utez.edu.mx.PlantNet.usuarios.model.Usuarios;
import utez.edu.mx.PlantNet.utils.Message;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = {"*"})
public class UsuariosController {
    @Autowired
    UsuariosService usuariosService;

    @GetMapping("/")
    public ResponseEntity<Message> getAll(){
        return usuariosService.findAll();
    }

    @GetMapping("/{usuario}")
    public ResponseEntity<Message> getById(@PathVariable("usuario") long id){
        return usuariosService.findById(id);
    }

    @PostMapping("/")
    public ResponseEntity<Message> save (@RequestBody UsuariosDTO usuariosDTO){
        Usuarios usuarios = new Usuarios(usuariosDTO.getIdUsuario(), usuariosDTO.getUsuario(),usuariosDTO.getContraseña(),
                usuariosDTO.isStatus(),usuariosDTO.getImagen(),usuariosDTO.getPuntos(),usuariosDTO.getLugares(),
                usuariosDTO.getRecompensas(),usuariosDTO.getReseñas());

        return usuariosService.save(usuarios);
    }

    @PutMapping("/")
    public ResponseEntity<Message> update(@RequestBody UsuariosDTO usuariosDTO){
        Usuarios usuarios = new Usuarios(usuariosDTO.getIdUsuario(), usuariosDTO.getUsuario(),usuariosDTO.getContraseña(),
                usuariosDTO.isStatus(),usuariosDTO.getImagen(),usuariosDTO.getPuntos(),usuariosDTO.getLugares(),
                usuariosDTO.getRecompensas(),usuariosDTO.getReseñas());

        usuarios.setIdUsuario(usuarios.getIdUsuario());
        return usuariosService.update(usuarios);
    }

    @DeleteMapping("/{usuario}")
    public ResponseEntity<Object> delete (@PathVariable("usuario")long id){
        usuariosService.delete(id);
        return ResponseEntity.ok(Boolean.TRUE);
    }
}
