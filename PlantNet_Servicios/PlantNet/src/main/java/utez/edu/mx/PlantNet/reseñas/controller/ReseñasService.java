package utez.edu.mx.PlantNet.reseñas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.edu.mx.PlantNet.reseñas.model.Reseñas;
import utez.edu.mx.PlantNet.reseñas.model.ReseñasRepository;
import utez.edu.mx.PlantNet.utils.Message;
import java.sql.SQLException;
import java.util.Optional;

@Service
@Transactional
public class ReseñasService {
    @Autowired
    ReseñasRepository reseñasRepository;

    @Transactional(readOnly = true)
    public ResponseEntity<Message> findAll(){
        return new ResponseEntity<>(new Message("ok",reseñasRepository.findAll()), HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<Message> findById(long id){
        ResponseEntity<Message> responseEntity = null;

        if(reseñasRepository.existsByIdReseña(id)){
            responseEntity = new ResponseEntity<>(new Message("Reseña encontrada",reseñasRepository.findByIdReseña(id)), HttpStatus.OK);
        }
        else {
            responseEntity = new ResponseEntity<>(new Message("La reseña no existe", null), HttpStatus.BAD_REQUEST);
        }
        return responseEntity;
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<Message> save(Reseñas reseñas){
        Optional<Reseñas> reseñasOptional = reseñasRepository.findByIdReseña(reseñas.getIdReseña());

        if(reseñasOptional.isPresent()){
            return new ResponseEntity<>(new Message("La reseña ya existe", null)
                    , HttpStatus.BAD_REQUEST);
        }
        Reseñas reseñas1 = reseñasRepository.saveAndFlush(reseñas);
        return new ResponseEntity<>(new Message("ok", reseñas1), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<Message> update (Reseñas reseñas){
        if(reseñasRepository.existsById(reseñas.getIdReseña())){
            Reseñas reseñas1 = reseñasRepository.saveAndFlush(reseñas);
            return new ResponseEntity<>(new Message("ok", reseñas1), HttpStatus.OK);
        }
        return new ResponseEntity<>(new Message("La reseña no existe", null), HttpStatus.BAD_REQUEST);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public void delete(long id){
        reseñasRepository.deleteReseñasByIdReseña(id);
    }
}
