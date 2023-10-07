package utez.edu.mx.PlantNet.comentarios.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utez.edu.mx.PlantNet.comentarios.model.Comentarios;
import utez.edu.mx.PlantNet.premios.controller.PremiosDTO;
import utez.edu.mx.PlantNet.premios.controller.PremiosService;
import utez.edu.mx.PlantNet.premios.model.Premios;
import utez.edu.mx.PlantNet.utils.Message;

@RestController
@RequestMapping("/api/comentarios")
@CrossOrigin(origins = {"*"})
public class ComentariosController {
    @Autowired
    ComentariosService comentariosService;

    @GetMapping("/")
    public ResponseEntity<Message> getAll(){
        return comentariosService.findAll();
    }

    @GetMapping("/{comentario}")
    public ResponseEntity<Message> getById(@PathVariable("comentario") long id){
        return comentariosService.findById(id);
    }

    @PostMapping("/")
    public ResponseEntity<Message> save (@RequestBody ComentariosDTO comentariosDTO){
        Comentarios comentarios = new Comentarios(comentariosDTO.getIdComentarios(),comentariosDTO.getTitulo(),
                comentariosDTO.getDescripcion(),comentariosDTO.getRating(),comentariosDTO.getPremios()
                ,comentariosDTO.getUsuarios());

        return comentariosService.save(comentarios);
    }

    @PutMapping("/")
    public ResponseEntity<Message> update(@RequestBody ComentariosDTO comentariosDTO){
        Comentarios comentarios = new Comentarios(comentariosDTO.getIdComentarios(),comentariosDTO.getTitulo(),
                comentariosDTO.getDescripcion(),comentariosDTO.getRating(),comentariosDTO.getPremios()
                ,comentariosDTO.getUsuarios());

        comentarios.setIdComentarios(comentarios.getIdComentarios());
        return comentariosService.update(comentarios);
    }

    @DeleteMapping("/{comentario}")
    public ResponseEntity<Object> delete (@PathVariable("comentario")long id){
        comentariosService.delete(id);
        return ResponseEntity.ok(Boolean.TRUE);
    }
}
