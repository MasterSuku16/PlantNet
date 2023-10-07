package utez.edu.mx.PlantNet.comentarios.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.edu.mx.PlantNet.comentarios.model.Comentarios;
import utez.edu.mx.PlantNet.comentarios.model.ComentariosRepository;
import utez.edu.mx.PlantNet.premios.model.Premios;
import utez.edu.mx.PlantNet.premios.model.PremiosRepository;
import utez.edu.mx.PlantNet.utils.Message;
import java.sql.SQLException;
import java.util.Optional;

@Service
@Transactional
public class ComentariosService {
    @Autowired
    ComentariosRepository comentariosRepository;

    @Transactional(readOnly = true)
    public ResponseEntity<Message> findAll(){
        return new ResponseEntity<>(new Message("ok",comentariosRepository.findAll()), HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<Message> findById(long id){
        ResponseEntity<Message> responseEntity = null;

        if(comentariosRepository.existsByIdComentarios(id)){
            responseEntity = new ResponseEntity<>(new Message("Comentario encontrado",comentariosRepository.findByIdComentarios(id)), HttpStatus.OK);
        }
        else {
            responseEntity = new ResponseEntity<>(new Message("El comentario no existe", null), HttpStatus.BAD_REQUEST);
        }
        return responseEntity;
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<Message> save(Comentarios comentarios){
        Optional<Comentarios> optionalComentarios = comentariosRepository.findByIdComentarios(comentarios.getIdComentarios());

        if(optionalComentarios.isPresent()){
            return new ResponseEntity<>(new Message("El comentario ya existe", null)
                    , HttpStatus.BAD_REQUEST);
        }
        Comentarios comentarios1 = comentariosRepository.saveAndFlush(comentarios);
        return new ResponseEntity<>(new Message("ok", comentarios1), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<Message> update (Comentarios comentarios){
        if(comentariosRepository.existsByIdComentarios(comentarios.getIdComentarios())){
            Comentarios comentarios1 = comentariosRepository.saveAndFlush(comentarios);
            return new ResponseEntity<>(new Message("ok", comentarios1), HttpStatus.OK);
        }
        return new ResponseEntity<>(new Message("El comentario no existe", null), HttpStatus.BAD_REQUEST);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public void delete(long id){
        comentariosRepository.deleteComentariosByIdComentarios(id);
    }
}
