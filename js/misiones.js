/*
SECCIÓN 2: TABLÓN DE MISIONES
*/

/*
tituloMision
descripcionMision
dificultadMision
*/

// Accedemos al objeto indexedDB // Almacenar el accedo a indexedDB
const indexedDB = window.indexedDB;

const formMisiones = document.getElementById('formularioMisiones');
const contenedorMisiones = document.getElementById('contenedorMisiones');
const botonGuardarMisiones = document.getElementById('publicarMisión');

//Almacena la base de datos
let db;
//
let idEdicion = null;

if (indexedDB && formMisiones) {
    const solicitud = indexedDB.open('MisionesMedievales',1);

    // Abrir
    solicitud.onsuccess = () => {
        db = solicitud.result;
        console.log('OPEN', db);
        leerMision();
    };

    // Creacion
    solicitud.onupgradeneeded = () => {
        db = solicitud.result;
        console.log('Create', db);
        const objectStore = db.createObjectStore('Misiones', {
            keyPath: 'id', 
            autoIncrement: true
        });
    };

    // Manejo de errores
    solicitud.onerror = (error) => {
        console.log('error', error);
    };


    // Funcion de agregar nueva mision
    const agregarMision = (infoMision) => {
        const transaction = db.transaction(['Misiones'],'readwrite');
        const almacen = transaction.objectStore('Misiones');
        const agregar = almacen.add(infoMision);

        agregar.onsuccess = () => {
            console.log('Mision guardada');
            formMisiones.reset();
            leerMision();
        };
    };


    // Funcion de leer y agregar al contenedor
    const leerMision = () => {
        contenedorMisiones.textContent = '';
        const transaction = db.transaction(['Misiones'],'readonly');
        const almacen = transaction.objectStore('Misiones');
        const solicitudCursor = almacen.openCursor();
        const fragment = document.createDocumentFragment();

        let contador = 0;

        solicitudCursor.onsuccess = (e) => {
            const cursor = e.target.result;

            if(cursor){
                contador++;
                const mision = cursor.value;

                const tarjeta = document.createElement('DIV');
                tarjeta.classList.add('tarjetaMisionIndividual');
                switch (mision.nivel) {
                    case 'facil':
                    tarjeta.classList.add('bordeFacil');
                    break;
                    case 'intermedia':
                    tarjeta.classList.add('bordeIntermedia');
                    break;
                    case 'dificil':
                    tarjeta.classList.add('bordeDificil');
                    break;
                    case 'epica':
                    tarjeta.classList.add('bordeEpica');
                    break;
                };

                const titulo = document.createElement('H3');
                titulo.textContent = mision.mision;

                const parrafoDescripcion = document.createElement('P');
                parrafoDescripcion.textContent = mision.descripcion;

                const parrafoNivel = document.createElement('P');
                parrafoNivel.textContent = `Nivel de Peligro: ${mision.nivel}`;
                parrafoNivel.classList.add('nivelMision');

                const botonEliminar = document.createElement('BUTTON');
                botonEliminar.textContent = 'Abandonar Misión';
                botonEliminar.classList.add('botonEliminarMision');
                botonEliminar.dataset.idMision = mision.id;
                botonEliminar.onclick = () => {
                    eliminarMision(mision.id);
                };

                const botonEditar = document.createElement('BUTTON');
                botonEditar.textContent = 'Editar Misión';
                botonEditar.classList.add('botonEditarMision');
                botonEditar.dataset.idMision = mision.id;
                botonEditar.onclick = () => {
                    prepararEdicion(mision);
                };

                tarjeta.append(titulo);
                tarjeta.append(parrafoDescripcion);
                tarjeta.append(parrafoNivel);
                tarjeta.append(botonEliminar);
                tarjeta.append(botonEditar);
                fragment.append(tarjeta);

                cursor.continue();
            }else{
                if(contador === 0) {
                    const aviso = document.createElement('DIV');
                    aviso.classList.add('mensajeVacio');
                    aviso.textContent = "No hay misiones disponibles en este momento. Agrega una mision desde el Tablón de anuncios";
                    contenedorMisiones.append(aviso);
                } else {
                    contenedorMisiones.append(fragment);
                };
            };
        };
    };


// Funcion de eliminar
    const eliminarMision = (id) => {
        const confirmar = confirm("¿Estás seguro de que deseas abandonar esta misión?");

        if(confirmar){
            const transaction = db.transaction(['Misiones'],'readwrite');
            const almacen = transaction.objectStore('Misiones');
            const eliminar = almacen.delete(id);

            eliminar.onsuccess = () => {
                console.log(` //Misión ${id} eliminada`);
                leerMision();
            };

            eliminar.onerror = () => {
                console.error("Error al intentar borrar la misión");
            };
        };
    };


    // Funcion de preparado de edicion
    const prepararEdicion = (mision) => {
        formMisiones.tituloMision.value = mision.mision;
        formMisiones.descripcionMision.value = mision.descripcion;
        formMisiones.dificultadMision.value = mision.nivel;
        botonGuardarMisiones.textContent = 'Guardar Cambios';
        idEdicion = mision.id;
    };


        // Funcion de Actualizar
    const actualizarMision = (misionEditada) => {
        const transaction = db.transaction(['Misiones'],'readwrite');
        const almacen = transaction.objectStore('Misiones');
        const editar = almacen.put(misionEditada);

        editar.onsuccess = () => {
            console.log('Mision Actualizada');
            // falta un formMisiones.reset(); que lo saque porque lo puse en la escucha del form al ultimo
            botonGuardarMisiones.textContent = 'Publicar Misión';
            idEdicion = null;
            leerMision();
        };
    };


    // Escucha formulario
    formMisiones.addEventListener('submit', (e) => {
        e.preventDefault();
        const infoMision = {
            mision:e.target.tituloMision.value,
            descripcion:e.target.descripcionMision.value,
            nivel:e.target.dificultadMision.value
        };
        if(idEdicion === null){
            agregarMision(infoMision);
            formMisiones.reset();
        }else{
            infoMision.id = idEdicion;
            actualizarMision(infoMision);
            formMisiones.reset();
        }
    });
};