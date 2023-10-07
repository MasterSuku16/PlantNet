package utez.edu.mx.PlantNet.reseñas.model;

import com.sun.istack.NotNull;
import utez.edu.mx.PlantNet.lugares.model.Lugares;
import utez.edu.mx.PlantNet.usuarios.model.Usuarios;

import javax.persistence.*;

@Entity
public class Reseñas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idReseña;
    @NotNull
    private String descripcion;
    @NotNull
    private double rating;
    @NotNull
    private byte[] imagenEvi;
    @ManyToOne
    @JoinColumn(name = "id")
    @NotNull
    private Lugares lugares;
    @ManyToOne
    @JoinColumn(name = "idUsuario")
    @NotNull
    private Usuarios usuarios;

    public Reseñas() {
    }

    public Reseñas(String descripcion, double rating, byte[] imagenEvi, Lugares lugares, Usuarios usuarios) {
        this.descripcion = descripcion;
        this.rating = rating;
        this.imagenEvi = imagenEvi;
        this.lugares = lugares;
        this.usuarios = usuarios;
    }

    public Reseñas(long idReseña, String descripcion, double rating, byte[] imagenEvi, Lugares lugares, Usuarios usuarios) {
        this.idReseña = idReseña;
        this.descripcion = descripcion;
        this.rating = rating;
        this.imagenEvi = imagenEvi;
        this.lugares = lugares;
        this.usuarios = usuarios;
    }

    public long getIdReseña() {
        return idReseña;
    }

    public void setIdReseña(long idReseña) {
        this.idReseña = idReseña;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public byte[] getImagenEvi() {
        return imagenEvi;
    }

    public void setImagenEvi(byte[] imagenEvi) {
        this.imagenEvi = imagenEvi;
    }

    public Lugares getLugares() {
        return lugares;
    }

    public void setLugares(Lugares lugares) {
        this.lugares = lugares;
    }

    public Usuarios getUsuarios() {
        return usuarios;
    }

    public void setUsuarios(Usuarios usuarios) {
        this.usuarios = usuarios;
    }
}
