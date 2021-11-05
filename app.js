//variables globales
const formularioUI = document.querySelector('#formulario');
const listaActividadesUI = document.querySelector('#activityList');
let arrayActividades = [];

//funciones
const CrearItem = (actividad) =>{

    let item = {
        actividad: actividad,
        estado: false
    }

    arrayActividades.push(item);
    return item;
}

const GuardarDB = () => {
    localStorage.setItem('rutina', JSON.stringify(arrayActividades));
    RenderDB();
}   

const RenderDB = () => {

    listaActividadesUI.innerHTML = '';
    arrayActividades = JSON.parse(localStorage.getItem('rutina'));
    
    if(arrayActividades === null){
        arrayActividades = [];
    }else{
        arrayActividades.forEach(element =>{

            if(element.estado){
                listaActividadesUI.innerHTML += `<div class="alert alert-success mt-4 " ><i class="material-icons  float-left"> accessibility_new</i>
             <b>${element.actividad}</b> - ${element.estado}<span class="d-flex justify-content-end"><i class="material-icons ">done</i><i class="material-icons ">delete</i></span>
          </div>`
            }else{
                listaActividadesUI.innerHTML += `<div class="alert alert-warning mt-4 " ><i class="material-icons  float-left"> accessibility_new</i>
             <b>${element.actividad}</b> - ${element.estado}<span class="d-flex justify-content-end"><i class="material-icons ">done</i><i class="material-icons ">delete</i></span>
          </div>`
            }
            
        });
    }

}
const EliminarDB = (actividad) =>{
    let indexArray;
    arrayActividades.forEach((elemento, index) =>{
        
        if(elemento.actividad === actividad){
            indexArray = index;
        }
    });

    arrayActividades.splice(indexArray,1)
    GuardarDB();
}

const  EditarDB = (actividad) =>{
    let indexArray = arrayActividades.findIndex((elemento) =>elemento.actividad === actividad
    );

    arrayActividades[indexArray].estado = true;

    GuardarDB();
}
//eventos

formularioUI.addEventListener('submit', (e) =>{
    e.preventDefault();
    let actividadUI = document.querySelector('#activity').value;
    CrearItem(actividadUI);
    GuardarDB ();

    formularioUI.reset();

});

document.addEventListener('DOMContentLoaded', RenderDB);

listaActividadesUI.addEventListener('click', (e) =>{
    e.preventDefault();
    
    if(e.target.innerHTML === 'done' || e.target.innerHTML === 'delete' ){
        let texto = e.path[2].childNodes[2].innerHTML;
        if(e.target.innerHTML === 'delete'){

            EliminarDB(texto)
        }
        if(e.target.innerHTML === 'done'){
            EditarDB(texto);
        }
    }
});