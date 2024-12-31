const input = document.querySelector('#nuevaTarea')
const btn = document.querySelector('.boton')
const detalleTareas = document.querySelector('.detalle_tareas')
const tareasTotales = document.querySelector('#total')
const tareasRealizadas = document.querySelector('#realizada')

const tareas = 
[
    {id : 1, descripcion : "Hacer mercado", realizada : 'true'},
    {id : 2, descripcion : "Estudiar para la prueba", realizada : 'false'},
    {id : 3, descripcion : "Sacar a pasear a Tobby", realizada : 'false'}
]

let idAutoIncremental = 3;

const generarId = () => ++idAutoIncremental;

btn.addEventListener('click', () => {
    if (input.value === '') return
    tareas.push({id: generarId(), descripcion : input.value, realizada: false})

    actualizaTotales(tareas)

    input.value = ''
})

const eliminar = (id) => {
    const index = tareas.findIndex((tarea) => tarea.id === id)
    tareas.splice(index,1)
    
    actualizaTotales(tareas)
}

const modificar = (event, id) => {
    const index = tareas.findIndex((tarea) => tarea.id === id)

    event.target.checked ? tareas[index].realizada = 'true' : tareas[index].realizada = 'false'

    actualizaTotales(tareas)
}

const actualizaTotales = (tareas) => {
    tareasTotales.innerHTML = `Total: <b>${tareas.length}</b>`

    const realizadas = tareas.filter(tarea => tarea.realizada === "true");

    tareasRealizadas.innerHTML = `Realizadas: <b>${realizadas.length}</b>`

    mostrar()
}

const mostrar = () => {
    let html =`<div class="fila">
                    <div class="columna"><p><b>ID</b></p></div>
                    <div class="columna"><p><b>Tarea</b></p></div>
                </div>`

    detalleTareas.innerHTML = tareas.map((tarea) =>
        html +=    
        `
        <div class="fila">
            <div class="columna"><p>${tarea.id}</p></div>
            <div class="columna"><p>${tarea.descripcion}</p></div>
            <div class="columna">
                <input type="checkbox" 
                           ${tarea.realizada === 'true' ? 'checked' : ''} 
                           onChange="modificar(event, ${tarea.id})">
                <button class='borra' onClick='eliminar(${tarea.id})'>X</button>
            </div>
        </div>
        `
    ).join('')

    detalleTareas.innerHTML = html
}

mostrar()
