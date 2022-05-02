package com.example.a6iv7_melody_friend_1;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.graphics.Color;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.Spinner;

import java.util.ArrayList;

import com.github.mikephil.charting.charts.BarChart;
import com.github.mikephil.charting.charts.Chart;
import com.github.mikephil.charting.components.Legend;
import com.github.mikephil.charting.components.LegendEntry;
import com.github.mikephil.charting.components.XAxis;
import com.github.mikephil.charting.components.YAxis;
import com.github.mikephil.charting.data.BarData;
import com.github.mikephil.charting.data.BarDataSet;
import com.github.mikephil.charting.data.BarEntry;
import com.github.mikephil.charting.data.DataSet;
import com.github.mikephil.charting.formatter.IndexAxisValueFormatter;


public class MainActivity extends AppCompatActivity {

    private BarChart barChart;
    private String[]months=new String[]{"Enero","Febrero","Marzo","Abril","Mayo"};
    private int[]sale=new int[]{25,20,28,10,15};
    private int[]colors= new int[]{Color.BLACK,Color.GREEN,Color.BLACK,Color.GREEN,Color.BLACK};

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        /*Esto de abajo es de las graficas*/
        barChart=(BarChart)findViewById(R.id.barChart);
        createCharts();


        /*Esto de abajo es del spiner, lo que sirve para la entrada de datos*/
        Spinner spinnerSemestre = findViewById(R.id.spinner_semestre);
        ArrayAdapter<CharSequence>adapter=ArrayAdapter.createFromResource(this, R.array.Semestre, android.R.layout.simple_spinner_item);

        adapter.setDropDownViewResource(android.R.layout.simple_spinner_item);
        spinnerSemestre.setAdapter(adapter);

    }
    private Chart getSameChart(Chart chart,String description,int textColor,int background,int animateY){
        chart.getDescription().setText(description);
        chart.getDescription().setTextSize(15);
        chart.setBackgroundColor(background);
        chart.animateY(animateY);
        legend(chart);
        return chart;
    }

    private void legend(Chart chart){
        Legend legend=chart.getLegend();
        legend.setForm(Legend.LegendForm.CIRCLE);
        legend.setHorizontalAlignment(Legend.LegendHorizontalAlignment.CENTER);

        ArrayList<LegendEntry>entries=new ArrayList<>();
        for (int i=0; i<months.length;i++){
            LegendEntry entry=new LegendEntry();
            entry.formColor=colors[i];
            entry.label=months[i];
            entries.add(entry);
        }
        legend.setCustom(entries);
    }
    private ArrayList<BarEntry>getBarEntries(){
        ArrayList<BarEntry> entries = new ArrayList<>();
        for (int i=0; i<sale.length;i++)
            entries.add(new BarEntry(i,sale[i]));
        return entries;
    }
    private void axisX(XAxis axis){
        axis.setGranularityEnabled(true);
        axis.setPosition(XAxis.XAxisPosition.BOTTOM);
        axis.setValueFormatter(new IndexAxisValueFormatter(months));
    }
    private void axisLeft(YAxis axis){
        axis.setSpaceTop(30);
        axis.setAxisMinimum(0);
    }
    private void axisRight(YAxis axis){
        axis.setEnabled(false);
    }

    public void createCharts(){
        barChart=(BarChart)getSameChart(barChart,"Series",Color.RED,Color.CYAN, 3000);
        barChart.setDrawGridBackground(true);
        barChart.setDrawBarShadow(false);
        barChart.setData(getBarData());
        barChart.invalidate();
        axisX(barChart.getXAxis());
        axisLeft(barChart.getAxisLeft());
        axisRight(barChart.getAxisRight());
    }
    private DataSet getData(DataSet dataSet){
        dataSet.setColors(colors);
        dataSet.setValueTextSize(Color.WHITE);
        dataSet.setValueTextSize(10);
        return dataSet;
    }

    private BarData getBarData(){
        BarDataSet barDataSet=(BarDataSet)getData(new BarDataSet(getBarEntries(),""));

        BarData barData=new BarData(barDataSet);
        barData.setBarWidth(0.50f);
        return barData;

    }

}
