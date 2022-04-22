const btnToggle = document.querySelector('.toggle-btn')

btnToggle.addEventListener('click', function() {
    document.getElementById('barraLateral').classList.toggle('active');
    document.getElementById('contenidoGeneral').classList.toggle('active');
})

var grafica = document.getElementById("usuActMes");
var myPieChart = new Chart(grafica, {
    type: "line",
    data: {
        labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"], /* when cambias el valor por el nombre de las canciones/playlists xdddd:v */
        datasets:[{
            label: "Usuarios activos en el mes.",
            data: [0,10,20,30], /* but cambias el valor de los datos por la chaviza que escucha la playlist/canción xdddddddddddddBv */ 
            backgroundColor: ["rgb(136,204,5)", "rgb(122, 179, 11 )", "rgb(111, 160, 17)", "rgb(99, 136, 28)"]
        }]
    },
});
var grafica = document.getElementById("usuActDia");
var myPieChart = new Chart(grafica, {
    type: "line",
    data: {
        labels: ["0hrs-6hrs", "6hrs-12hrs", "12hrs-18hrs", "18hrs-24hrs"], /* when cambias el valor por el nombre de las canciones/playlists xdddd:v */
        datasets:[{
            label: "Usuarios activos en el día.",
            data: [10,15,20,15], /* but cambias el valor de los datos por la chaviza que escucha la playlist/canción xdddddddddddddBv */ 
            backgroundColor: ["rgb(136,204,5)", "rgb(122, 179, 11 )", "rgb(111, 160, 17)", "rgb(99, 136, 28)"]
        }]
    },
});