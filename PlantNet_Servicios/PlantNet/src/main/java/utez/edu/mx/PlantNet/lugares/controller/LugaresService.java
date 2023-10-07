package utez.edu.mx.PlantNet.lugares.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.edu.mx.PlantNet.lugares.model.Lugares;
import utez.edu.mx.PlantNet.lugares.model.LugaresRepository;
import utez.edu.mx.PlantNet.utils.Message;

import java.sql.SQLException;
import java.util.Optional;

@Service
@Transactional
public class LugaresService {
    @Autowired
    LugaresRepository lugaresRepository;

    @Transactional(readOnly = true)
    public ResponseEntity<Message> findAll(){
        return new ResponseEntity<>(new Message("ok",lugaresRepository.findAll()), HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<Message> findById(long id){
        ResponseEntity<Message> responseEntity = null;

        if(lugaresRepository.existsById(id)){
            responseEntity = new ResponseEntity<>(new Message("Lugar encontrado",lugaresRepository.findById(id)), HttpStatus.OK);
        }
        else {
            responseEntity = new ResponseEntity<>(new Message("El lugar no existe", null), HttpStatus.BAD_REQUEST);
        }
        return responseEntity;
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<Message> save(Lugares lugares){
        Optional<Lugares> optionalLugares = lugaresRepository.findById(lugares.getId());

        if(optionalLugares.isPresent()){
            return new ResponseEntity<>(new Message("El lugar ya existe", null)
                    , HttpStatus.BAD_REQUEST);
        }
        Lugares lugares1 = lugaresRepository.saveAndFlush(lugares);
        return new ResponseEntity<>(new Message("ok", lugares1), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<Message> update (Lugares lugares){
        if(lugaresRepository.existsById(lugares.getId())){
            Lugares lugares1 = lugaresRepository.saveAndFlush(lugares);
            return new ResponseEntity<>(new Message("ok", lugares1), HttpStatus.OK);
        }
        return new ResponseEntity<>(new Message("El lugar no existe", null), HttpStatus.BAD_REQUEST);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public void delete(long id){
        lugaresRepository.deleteLugaresById(id);
    }
}
