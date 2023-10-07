package utez.edu.mx.PlantNet.lugares.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utez.edu.mx.PlantNet.lugares.model.Lugares;
import utez.edu.mx.PlantNet.utils.Message;

@RestController
@RequestMapping("/api/lugares")
@CrossOrigin(origins = {"*"})
public class LugaresController {
    @Autowired
    LugaresService lugaresService;

    @GetMapping("/")
    public ResponseEntity<Message> getAll(){
        return lugaresService.findAll();
    }

    @GetMapping("/{lugar}")
    public ResponseEntity<Message> getById(@PathVariable("lugar") long id){
        return lugaresService.findById(id);
    }

    @PostMapping("/")
    public ResponseEntity<Message> save (@RequestBody LugaresDTO lugaresDTO){
        Lugares lugares = new Lugares(lugaresDTO.getId(),lugaresDTO.getNombre(),lugaresDTO.getDescripcion(),lugaresDTO.getPuntos(),lugaresDTO.getRating(),
                lugaresDTO.getLatitud(),lugaresDTO.getLongitud(),lugaresDTO.getImagen(),lugaresDTO.getReseñas());

        return lugaresService.save(lugares);
    }

    @PutMapping("/")
    public ResponseEntity<Message> update(@RequestBody LugaresDTO lugaresDTO){
        Lugares lugares = new Lugares(lugaresDTO.getId(),lugaresDTO.getNombre(),lugaresDTO.getDescripcion(),lugaresDTO.getPuntos(),lugaresDTO.getRating(),
                lugaresDTO.getLatitud(),lugaresDTO.getLongitud(),lugaresDTO.getImagen(),lugaresDTO.getReseñas());

        lugares.setId(lugaresDTO.getId());

        return lugaresService.update(lugares);
    }

    @DeleteMapping("/{lugar}")
    public ResponseEntity<Object> delete (@PathVariable("lugar")long id){
        lugaresService.delete(id);
        return ResponseEntity.ok(Boolean.TRUE);
    }
}
