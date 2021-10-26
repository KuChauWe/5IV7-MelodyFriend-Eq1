const btnToggle = document.querySelector('.toggle-btn')

btnToggle.addEventListener('click', function() {
    document.getElementById('barraLateral').classList.toggle('active');
    document.getElementById('contenidoGeneral').classList.toggle('active');
})

var grafica = document.getElementById("cancionesBatiz");
    var myPieChart = new Chart(grafica, {
        type: "doughnut",
        data: {
            labels: ["Hugo", "Sofo", "Edu", "Gael", "Rodrigo"], /* when cambias el valor por el nombre de las canciones/playlists xdddd:v */
            datasets:[{
                label: "Nombres de gente que le mueve",
                data: [50,50,50,50,50], /* but cambias el valor de los datos por la chaviza que escucha la playlist/canción xdddddddddddddBv */ 
                backgroundColor: ["rgb(136,204,5)", "rgb(122, 179, 11 )", "rgb(111, 160, 17)", "rgb(99, 136, 28)", "rgb(88, 118, 31 )"]
            }]
        },
    });

var grafica = document.getElementById("playlistsBatiz");
    var myPieChart = new Chart(grafica, {
        type: "doughnut",
        data: {
            labels: ["Hugo", "Sofo", "Edu", "Gael", "Rodrigo"],
            datasets:[{
            label: "Nombres de gente que le mueve",
            data: [50,50,50,50,50],
            backgroundColor: ["rgb(136,204,5)", "rgb(122, 179, 11 )", "rgb(111, 160, 17)", "rgb(99, 136, 28)", "rgb(88, 118, 31 )"]
        }]
    },
});

var grafica = document.getElementById("playlistsTC");
    var myPieChart = new Chart(grafica, {
        type: "doughnut",
        data: {
            labels: ["Hugo", "Sofo", "Edu", "Gael", "Rodrigo"],
            datasets:[{
            label: "Nombres de gente que le mueve",
            data: [50,50,50,50,50],
            backgroundColor: ["rgb(136,204,5)", "rgb(122, 179, 11 )", "rgb(111, 160, 17)", "rgb(99, 136, 28)", "rgb(88, 118, 31 )"]
        }]
    },
});

var grafica = document.getElementById("playlistsProgra");
    var myPieChart = new Chart(grafica, {
        type: "doughnut",
        data: {
            labels: ["Hugo", "Sofo", "Edu", "Gael", "Rodrigo"],
            datasets:[{
            label: "Nombres de gente que le mueve",
            data: [50,50,50,50,50],
            backgroundColor: ["rgb(136,204,5)", "rgb(122, 179, 11 )", "rgb(111, 160, 17)", "rgb(99, 136, 28)", "rgb(88, 118, 31 )"]
        }]
    },
});

var grafica = document.getElementById("playlistsMSA");
    var myPieChart = new Chart(grafica, {
        type: "doughnut",
        data: {
            labels: ["Hugo", "Sofo", "Edu", "Gael", "Rodrigo"],
            datasets:[{
            label: "Nombres de gente que le mueve",
            data: [50,50,50,50,50],
            backgroundColor: ["rgb(136,204,5)", "rgb(122, 179, 11 )", "rgb(111, 160, 17)", "rgb(99, 136, 28)", "rgb(88, 118, 31 )"]
        }]
    },
});

var grafica = document.getElementById("playlistsSD");
    var myPieChart = new Chart(grafica, {
        type: "doughnut",
        data: {
            labels: ["Hugo", "Sofo", "Edu", "Gael", "Rodrigo"],
            datasets:[{
            label: "Nombres de gente que le mueve",
            data: [50,50,50,50,50],
            backgroundColor: ["rgb(136,204,5)", "rgb(122, 179, 11 )", "rgb(111, 160, 17)", "rgb(99, 136, 28)", "rgb(88, 118, 31 )"]
        }]
    },
});
var grafica = document.getElementById("playlistsMeca");
    var myPieChart = new Chart(grafica, {
        type: "doughnut",
        data: {
            labels: ["Hugo", "Sofo", "Edu", "Gael", "Rodrigo"],
            datasets:[{
            label: "Nombres de gente que le mueve",
            data: [50,50,50,50,50],
            backgroundColor: ["rgb(136,204,5)", "rgb(122, 179, 11 )", "rgb(111, 160, 17)", "rgb(99, 136, 28)", "rgb(88, 118, 31 )"]
        }]
    },
});
