package utez.edu.mx.PlantNet.premios.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.edu.mx.PlantNet.premios.model.Premios;
import utez.edu.mx.PlantNet.premios.model.PremiosRepository;
import utez.edu.mx.PlantNet.utils.Message;

import java.sql.SQLException;
import java.util.Optional;

@Service
@Transactional
public class PremiosService {
    @Autowired
    PremiosRepository premiosRepository;

    @Transactional(readOnly = true)
    public ResponseEntity<Message> findAll(){
        return new ResponseEntity<>(new Message("ok",premiosRepository.findAll()), HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<Message> findById(long id){
        ResponseEntity<Message> responseEntity = null;

        if(premiosRepository.existsByIdPremios(id)){
            responseEntity = new ResponseEntity<>(new Message("Premio encontrado",premiosRepository.findByIdPremios(id)), HttpStatus.OK);
        }
        else {
            responseEntity = new ResponseEntity<>(new Message("El premio no existe", null), HttpStatus.BAD_REQUEST);
        }
        return responseEntity;
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<Message> save(Premios premios){
        Optional<Premios> optionalPremios = premiosRepository.findByIdPremios(premios.getIdPremios());

        if(optionalPremios.isPresent()){
            return new ResponseEntity<>(new Message("El premio ya existe", null)
                    , HttpStatus.BAD_REQUEST);
        }
        Premios premios1 = premiosRepository.saveAndFlush(premios);
        return new ResponseEntity<>(new Message("ok", premios1), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<Message> update (Premios premios){
        if(premiosRepository.existsByIdPremios(premios.getIdPremios())){
            Premios premios1 = premiosRepository.saveAndFlush(premios);
            return new ResponseEntity<>(new Message("ok", premios1), HttpStatus.OK);
        }
        return new ResponseEntity<>(new Message("El premio no existe", null), HttpStatus.BAD_REQUEST);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public void delete(long id){
        premiosRepository.deletePremiosByIdPremios(id);
    }
}
