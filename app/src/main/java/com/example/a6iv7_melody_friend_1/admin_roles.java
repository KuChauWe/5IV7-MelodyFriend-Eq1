package com.example.a6iv7_melody_friend_1;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import java.util.ArrayList;
import java.util.List;

public class admin_roles extends AppCompatActivity{

    List<ListElement> elements;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        init();

        Intent intencion = new Intent(getApplicationContext(), MenuDesplegable.class);
        startActivity(intencion);
    }

    public void init(){
        elements = new ArrayList<>();
        elements.add(new ListElement("Gael, Metiche Mayor", "Soy usuario Mirón B)"));
        elements.add(new ListElement("Usuario Metiche Menor", "Soy bieeeen metiche muahahaha"));
        elements.add(new ListElement("Usuario Metiche Aprendíz", "Practicando mis dotes mirones"));

        ListAdapter listAdapter = new ListAdapter(elements, this);
        RecyclerView recyclerView = findViewById(R.id.listRecyclerView);
        recyclerView.setHasFixedSize(true);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        recyclerView.setAdapter(listAdapter);

    }

    //tache botón
    public void tache(View view){

    }
}
