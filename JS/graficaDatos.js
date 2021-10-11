var grafica = document.getElementById("miGrafica");
    var myPieChart = new Chart(grafica, {
        type: "pie",
        data: {
            labels: ["Hugo", "Sofo", "Edu", "Gael", "Rodrigo"],
            datasets:[{
                label: "Nombres de gente que le mueve",
                data: [50,50,50,50,50],
                backgroundColor: ["rgb(136,204,5)", "rgb(122, 179, 11 )", "rgb(111, 160, 17)", "rgb(99, 136, 28)", "rgb(88, 118, 31 )"]
            }]
        },
    });