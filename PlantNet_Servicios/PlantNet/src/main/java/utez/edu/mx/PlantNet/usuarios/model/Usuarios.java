package utez.edu.mx.PlantNet.usuarios.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import utez.edu.mx.PlantNet.reseñas.model.Reseñas;

import javax.persistence.*;
import java.util.List;

@Entity
public class Usuarios {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idUsuario;
    @NotNull
    private String usuario;
    @NotNull
    private String contraseña;
    @NotNull
    private boolean status;
    private byte[] imagen;
    @NotNull
    private long puntos;
    @NotNull
    private int lugares;
    @NotNull
    private int recompensas;
    @OneToMany(mappedBy = "idReseña")
    @JsonIgnore()
    List<Reseñas> reseñas;

    public Usuarios() {
    }

    public Usuarios(String usuario, String contraseña, boolean status, byte[] imagen, long puntos, int lugares, int recompensas, List<Reseñas> reseñas) {
        this.usuario = usuario;
        this.contraseña = contraseña;
        this.status = status;
        this.imagen = imagen;
        this.puntos = puntos;
        this.lugares = lugares;
        this.recompensas = recompensas;
        this.reseñas = reseñas;
    }

    public Usuarios(long idUsuario, String usuario, String contraseña, boolean status, byte[] imagen, long puntos, int lugares, int recompensas, List<Reseñas> reseñas) {
        this.idUsuario = idUsuario;
        this.usuario = usuario;
        this.contraseña = contraseña;
        this.status = status;
        this.imagen = imagen;
        this.puntos = puntos;
        this.lugares = lugares;
        this.recompensas = recompensas;
        this.reseñas = reseñas;
    }

    public long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getContraseña() {
        return contraseña;
    }

    public void setContraseña(String contraseña) {
        this.contraseña = contraseña;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public byte[] getImagen() {
        return imagen;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public long getPuntos() {
        return puntos;
    }

    public void setPuntos(long puntos) {
        this.puntos = puntos;
    }

    public int getLugares() {
        return lugares;
    }

    public void setLugares(int lugares) {
        this.lugares = lugares;
    }

    public int getRecompensas() {
        return recompensas;
    }

    public void setRecompensas(int recompensas) {
        this.recompensas = recompensas;
    }

    public List<Reseñas> getReseñas() {
        return reseñas;
    }

    public void setReseñas(List<Reseñas> reseñas) {
        this.reseñas = reseñas;
    }
}
