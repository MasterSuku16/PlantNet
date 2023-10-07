package utez.edu.mx.PlantNet.comentarios.model;

import com.sun.istack.NotNull;
import utez.edu.mx.PlantNet.premios.model.Premios;
import utez.edu.mx.PlantNet.usuarios.model.Usuarios;
import javax.persistence.*;

@Entity
public class Comentarios {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idComentarios;
    @NotNull
    private String titulo;
    @NotNull
    private String descripcion;
    @NotNull
    private double rating;
    @ManyToOne
    @JoinColumn(name = "idPremios")
    @NotNull
    private Premios premios;
    @ManyToOne
    @JoinColumn(name = "idUsuario")
    @NotNull
    private Usuarios usuarios;

    public Comentarios() {
    }

    public Comentarios(String titulo, String descripcion, double rating, Premios premios, Usuarios usuarios) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.rating = rating;
        this.premios = premios;
        this.usuarios = usuarios;
    }

    public Comentarios(long idComentarios, String titulo, String descripcion, double rating, Premios premios, Usuarios usuarios) {
        this.idComentarios = idComentarios;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.rating = rating;
        this.premios = premios;
        this.usuarios = usuarios;
    }

    public long getIdComentarios() {
        return idComentarios;
    }

    public void setIdComentarios(long idComentarios) {
        this.idComentarios = idComentarios;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
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

    public Premios getPremios() {
        return premios;
    }

    public void setPremios(Premios premios) {
        this.premios = premios;
    }

    public Usuarios getUsuarios() {
        return usuarios;
    }

    public void setUsuarios(Usuarios usuarios) {
        this.usuarios = usuarios;
    }
}
