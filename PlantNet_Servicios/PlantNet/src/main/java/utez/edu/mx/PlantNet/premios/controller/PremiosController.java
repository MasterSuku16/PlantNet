package utez.edu.mx.PlantNet.premios.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utez.edu.mx.PlantNet.premios.model.Premios;
import utez.edu.mx.PlantNet.utils.Message;

@RestController
@RequestMapping("/api/premios")
@CrossOrigin(origins = {"*"})
public class PremiosController {
    @Autowired
    PremiosService premiosService;

    @GetMapping("/")
    public ResponseEntity<Message> getAll(){
        return premiosService.findAll();
    }

    @GetMapping("/{premio}")
    public ResponseEntity<Message> getById(@PathVariable("premio") long id){
        return premiosService.findById(id);
    }

    @PostMapping("/")
    public ResponseEntity<Message> save (@RequestBody PremiosDTO premiosDTO){
        Premios premios = new Premios(premiosDTO.getIdPremios(),premiosDTO.getNombre(),premiosDTO.getDescripcion(),premiosDTO.getPuntos(),premiosDTO.getRating(),
                premiosDTO.getLatitud(),premiosDTO.getLongitud(),premiosDTO.getImagen(),premiosDTO.getComentarios());

        return premiosService.save(premios);
    }

    @PutMapping("/")
    public ResponseEntity<Message> update(@RequestBody PremiosDTO premiosDTO){
        Premios premios = new Premios(premiosDTO.getIdPremios(),premiosDTO.getNombre(),premiosDTO.getDescripcion(),premiosDTO.getPuntos(),premiosDTO.getRating(),
                premiosDTO.getLatitud(),premiosDTO.getLongitud(),premiosDTO.getImagen(),premiosDTO.getComentarios());

        premios.setIdPremios(premios.getIdPremios());
        return premiosService.update(premios);
    }

    @DeleteMapping("/{premio}")
    public ResponseEntity<Object> delete (@PathVariable("premio")long id){
        premiosService.delete(id);
        return ResponseEntity.ok(Boolean.TRUE);
    }
}
