package utez.edu.mx.PlantNet.usuarios.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.edu.mx.PlantNet.usuarios.model.Usuarios;
import utez.edu.mx.PlantNet.usuarios.model.UsuariosRepository;
import utez.edu.mx.PlantNet.utils.Message;
import java.sql.SQLException;
import java.util.Optional;

@Service
@Transactional
public class UsuariosService {
    @Autowired
    UsuariosRepository usuariosRepository;

    @Transactional(readOnly = true)
    public ResponseEntity<Message> findAll(){
        return new ResponseEntity<>(new Message("ok",usuariosRepository.findAll()), HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<Message> findById(long id){
        ResponseEntity<Message> responseEntity = null;

        if(usuariosRepository.existsById(id)){
            responseEntity = new ResponseEntity<>(new Message("Usuario encontrado",usuariosRepository.findById(id)), HttpStatus.OK);
        }
        else {
            responseEntity = new ResponseEntity<>(new Message("El usuario no existe", null), HttpStatus.BAD_REQUEST);
        }
        return responseEntity;
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<Message> save(Usuarios usuarios){
        Optional<Usuarios> optionalUsuarios = usuariosRepository.findById(usuarios.getIdUsuario());

        if(optionalUsuarios.isPresent()){
            return new ResponseEntity<>(new Message("El usuario ya existe", null)
                    , HttpStatus.BAD_REQUEST);
        }
        Usuarios usuarios1 = usuariosRepository.saveAndFlush(usuarios);
        return new ResponseEntity<>(new Message("ok", usuarios1), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<Message> update (Usuarios usuarios){
        if(usuariosRepository.existsById(usuarios.getIdUsuario())){
            Usuarios usuarios1 = usuariosRepository.saveAndFlush(usuarios);
            return new ResponseEntity<>(new Message("ok", usuarios1), HttpStatus.OK);
        }
        return new ResponseEntity<>(new Message("El premio no existe", null), HttpStatus.BAD_REQUEST);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public void delete(long id){
        usuariosRepository.deleteUsuariosByIdUsuario(id);
    }
}
