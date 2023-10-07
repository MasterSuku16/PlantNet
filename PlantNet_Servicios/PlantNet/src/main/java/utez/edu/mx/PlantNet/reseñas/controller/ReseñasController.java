package utez.edu.mx.PlantNet.reseñas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utez.edu.mx.PlantNet.reseñas.model.Reseñas;
import utez.edu.mx.PlantNet.utils.Message;

@RestController
@RequestMapping("/api/reseñas")
@CrossOrigin(origins = {"*"})
public class ReseñasController {

    @Autowired
    ReseñasService reseñasService;

    @GetMapping("/")
    public ResponseEntity<Message> getAll(){
        return reseñasService.findAll();
    }

    @GetMapping("/{reseña}")
    public ResponseEntity<Message> getById(@PathVariable("reseña") long id){
        return reseñasService.findById(id);
    }

    @PostMapping("/")
    public ResponseEntity<Message> save (@RequestBody ReseñasDTO reseñasDTO){
        Reseñas reseñas = new Reseñas(reseñasDTO.getIdReseña(),reseñasDTO.getDescripcion(),reseñasDTO.getRating(),
                reseñasDTO.getImagenEvi(),reseñasDTO.getLugares(),reseñasDTO.getUsuarios());

        return reseñasService.save(reseñas);
    }

    @PutMapping("/")
    public ResponseEntity<Message> update(@RequestBody ReseñasDTO reseñasDTO){
        Reseñas reseñas = new Reseñas(reseñasDTO.getIdReseña(),reseñasDTO.getDescripcion(),reseñasDTO.getRating(),
                reseñasDTO.getImagenEvi(),reseñasDTO.getLugares(),reseñasDTO.getUsuarios());

        reseñas.setIdReseña(reseñasDTO.getIdReseña());

        return reseñasService.update(reseñas);
    }

    @DeleteMapping("/{reseña}")
    public ResponseEntity<Object> delete (@PathVariable("reseña")long id){
        reseñasService.delete(id);
        return ResponseEntity.ok(Boolean.TRUE);
    }
}
