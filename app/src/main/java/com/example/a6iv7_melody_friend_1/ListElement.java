package com.example.a6iv7_melody_friend_1;

public class ListElement {
    public String nombre;
    public String descripcion;

    public ListElement(String nombre, String descripcion){
        this.nombre= nombre;
        this.descripcion= descripcion;
    }

    public String getNombre(){
        return nombre;
    }

    public void setNombre(String nombre){
        this.nombre= nombre;
    }

    public String getDescripcion(){
        return descripcion;
    }

    public void setDescripcion(String descripcion){
        this.descripcion= descripcion;
    }
}
