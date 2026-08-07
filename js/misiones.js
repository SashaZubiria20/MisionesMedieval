/*
SECCIÓN 2: TABLÓN DE MISIONES
*/

/*
tituloMision
descripcionMision
dificultadMision
*/
const formMisiones = document.getElementById('formularioMisiones');
const btnNuevaMision = document.getElementById('botonNuevaMision');
const contenedorMisiones = document.getElementById('contenedorMisiones');

const indexedDB = window.indexedDB;

let db;

if(indexedDB && formMisiones){
    const solicitud = indexedDB.open('MisionesMedievales',1);

    solicitud.onsuccess = () => {
        db = solicitud.result;
        console.log('OPEN', db);
        leerMision();
    };

    solicitud.onupgradeneeded = () => {
        db = solicitud.result;
        console.log('Create', db);
        const objectStore = db.createObjectStore('Misiones', {
            keyPath: 'id', 
            autoIncrement: true
        });
    };

    solicitud.onerror = (error) => {
        console.log('error', error);
    };

    const agregarMision = (infoMision) => {
        const transaction = db.transaction(['Misiones'],'readwrite');
        const abrirAlmacen = transaction.objectStore('Misiones');
        const agregar = abrirAlmacen.add(infoMision);

        agregar.onsuccess = () => {
            console.log('Mision guardada');
            formMisiones.reset();
            leerMision();
        };
    };

    const leerMision = () => {
        contenedorMisiones.innerHTML = '';
        const transaction = db.transaction(['Misiones'],'readonly');
        const almacen = transaction.objectStore('Misiones');
        const solicitudCursor = almacen.openCursor();
        const fragment = document.createDocumentFragment();

        solicitudCursor.onsuccess = (e) => {
            const cursor = e.target.result;
            if(cursor){
                const mision = cursor.value;

                const tarjeta = document.createElement('DIV');
                tarjeta.classList.add('tarjetaMisionIndividual');

                const titulo = document.createElement('H3');
                titulo.textContent = mision.mision;

                const parrafoDescripcion = document.createElement('P');
                parrafoDescripcion.textContent = mision.descripcion;

                tarjeta.append(titulo);
                tarjeta.append(parrafoDescripcion);
                fragment.append(tarjeta);

                cursor.continue()
            } else {
                contenedorMisiones.innerHTML = ''
                contenedorMisiones.append(fragment);
            }
        };
    };

    formMisiones.addEventListener('submit', (e) => {
        e.preventDefault();
        const infoMision = {
            mision:e.target.tituloMision.value,
            descripcion:e.target.descripcionMision.value,
            nivel:e.target.dificultadMision.value
        };
        agregarMision(infoMision);
    });
};