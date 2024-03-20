$(document).ready(function(){

    $("#searchForm").submit(function(e){
        e.preventDefault();
        validarSubmit();
        buscardId();
    })

    function validarSubmit(){
        let id = $('#inputSearch').val();
        let permitido = /^(?!0)[0-9]+$/
        
        if(id.match(permitido)){
            
        }else {
            alert("Solo estan permitidos numeros del 1 al 731")
        }
    }
   //Creamos una funcion para obtener el ID del search.
   //FUncion tiene varialbe de la url de la api junto con el id del heroe
    function buscardId(){
        const id = parseInt(document.getElementById("inputSearch").value);
        const apiUrl = `https://superheroapi.com/api.php/4905856019427443/${id}`;

        //Se hace peticion api ajax 
        $.ajax({
            url: apiUrl,
            type: "GET",
            dataType: "json",
            success: function(heroe){
              displayHeroInfo(heroe)
              console.log(heroe)
            }
            
         })
       
    }
    function displayHeroInfo(hero) {
        const heroInfo = `
        
            <div class="container py-5 d-flex flex-row justify-content-around">
            <div class="card d-flex flex-row align-items-center bg-white shadow-sm rounded border border-0" style="flex: 1;">
            <img src="${hero.image.url}" class="card-img-top " alt="${hero.name}">
            <div class="d-flex flex-column">
            <div class="card-body">
            <p class="card-text">Nombre: ${hero.name}</p>
            <p class="card-text">Conexiones: ${hero.connections['group-affiliation']}. ${hero.connections.relatives}</p>

            </div>
            <ul class="list-group list-group-flush">
    <li class="list-group-item">Publicado por: ${hero.biography.publisher}</li>
    <li class="list-group-item">Ocupación: ${hero.work.occupation}</li>
    <li class="list-group-item">Primera aparición: ${hero.biography["first-appearance"]}</li>
    <li class="list-group-item">Altura: ${hero.appearance.height[0]} - ${hero.appearance.height[1]}</li>
    <li class="list-group-item">Peso: ${hero.appearance.weight[0]} - ${hero.appearance.weight[1]}</li>
    <li class="list-group-item">Alianzas: ${hero.biography.aliases.join(' ')}</li>
  </ul>
            </div>
            </div>
            <div id="grafico" class="bg-white shadow-sm rounded d-flex align-items-center justify-content-center" style="flex: 1; ">
              
            </div>
            </div>
        `;
        $('#heroInfo').html(heroInfo);
        // Grafico Canvasjs
     let opciones = {
        animationEnabled: true,
        title: {
          text: `Estadisticas para ${hero.name}`
        },
        width: 300,
        height: 300,
        data: [{
          type: "doughnut",
          innerRadius: "60%",
          showInLegend: true,
          legendText: "{label}",
          indexLabel: "{label}: {y}",
          dataPoints: [
            { label: "Combat", y: parseInt(hero.powerstats.combat)},
            { label: "Durability", y: parseInt(hero.powerstats.durability)},
            {label: "Intelligence", y: parseInt(hero.powerstats.intelligence)},
            {label: "Power", y: parseInt(hero.powerstats.power)},
            {label: "Speed", y: parseInt(hero.powerstats.speed)},
            {label: "Strength", y: parseInt(hero.powerstats.strength)}
          ]
        }]
      };

      $("#grafico").CanvasJSChart(opciones);
      $('.canvasjs-chart-credit').html('');
    }
})