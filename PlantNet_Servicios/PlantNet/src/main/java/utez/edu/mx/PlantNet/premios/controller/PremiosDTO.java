package utez.edu.mx.PlantNet.premios.controller;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import utez.edu.mx.PlantNet.comentarios.model.Comentarios;

import javax.persistence.OneToMany;
import java.util.List;

public class PremiosDTO {
    private long idPremios;
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
    List<Comentarios> comentarios;

    public PremiosDTO() {
    }

    public PremiosDTO(String nombre, String descripcion, long puntos, double rating, double latitud, double longitud, byte[] imagen, List<Comentarios> comentarios) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.puntos = puntos;
        this.rating = rating;
        this.latitud = latitud;
        this.longitud = longitud;
        this.imagen = imagen;
        this.comentarios = comentarios;
    }

    public PremiosDTO(long idPremios, String nombre, String descripcion, long puntos, double rating, double latitud, double longitud, byte[] imagen, List<Comentarios> comentarios) {
        this.idPremios = idPremios;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.puntos = puntos;
        this.rating = rating;
        this.latitud = latitud;
        this.longitud = longitud;
        this.imagen = imagen;
        this.comentarios = comentarios;
    }

    public long getIdPremios() {
        return idPremios;
    }

    public void setIdPremios(long idPremios) {
        this.idPremios = idPremios;
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

    public List<Comentarios> getComentarios() {
        return comentarios;
    }

    public void setComentarios(List<Comentarios> comentarios) {
        this.comentarios = comentarios;
    }
}
