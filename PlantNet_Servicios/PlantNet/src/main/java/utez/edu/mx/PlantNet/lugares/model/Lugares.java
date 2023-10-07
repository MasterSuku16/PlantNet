package utez.edu.mx.PlantNet.lugares.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import utez.edu.mx.PlantNet.reseñas.model.Reseñas;

import javax.persistence.*;
import java.util.List;

@Entity
public class Lugares {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @NotNull
    private String nombre;
    @NotNull
    private String descripcion;
    @NotNull
    private long puntos;
    @NotNull
    private double rating;
    @NotNull
    private double latitud;
    @NotNull
    private double longitud;
    @NotNull
    private byte[] imagen;
    @OneToMany(mappedBy = "idReseña")
    @JsonIgnore()
    List<Reseñas> reseñas;

    public Lugares() {
    }

    public Lugares(long id, String nombre, String descripcion, long puntos, double rating, double latitud, double longitud, byte[] imagen, List<Reseñas> reseñas) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.puntos = puntos;
        this.rating = rating;
        this.latitud = latitud;
        this.longitud = longitud;
        this.imagen = imagen;
        this.reseñas = reseñas;
    }

    public Lugares(String nombre, String descripcion, long puntos, double rating, double latitud, double longitud, byte[] imagen, List<Reseñas> reseñas) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.puntos = puntos;
        this.rating = rating;
        this.latitud = latitud;
        this.longitud = longitud;
        this.imagen = imagen;
        this.reseñas = reseñas;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public long getPuntos() {
        return puntos;
    }

    public void setPuntos(long puntos) {
        this.puntos = puntos;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public double getLatitud() {
        return latitud;
    }

    public void setLatitud(double latitud) {
        this.latitud = latitud;
    }

    public double getLongitud() {
        return longitud;
    }

    public void setLongitud(double longitud) {
        this.longitud = longitud;
    }

    public byte[] getImagen() {
        return imagen;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public List<Reseñas> getReseñas() {
        return reseñas;
    }

    public void setReseñas(List<Reseñas> reseñas) {
        this.reseñas = reseñas;
    }
}
