
/*
SECCIÓN 1: PERFIL
*/
const avatar = document.getElementById('zonaAvatar');
const avatarOculto = document.getElementById('inputArchivo');
const imgAvatar = document.getElementById('vistaPreviaAvatar');
const txt = document.getElementById('textoAvatar');

const form = document.getElementById('formularioRegistro');
const mensaje = document.getElementById('mensajeEstado');


/*
SECCIÓN 3: LOCALIZACIÓN
*/
const textoUbicacion = document.getElementById('textoUbicacion');


/*
SECCIÓN 1: PERFIL
*/
avatar.addEventListener('click', () => {
    avatarOculto.click()
});

avatarOculto.addEventListener('change', (e) => {
    const file = e.target.files[0]
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.addEventListener('load', (e) =>{
        imgAvatar.setAttribute('src', e.target.result)
        imgAvatar.classList.remove('vistaPreviaOculta')
        txt.textContent = '';
    });
});


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const valorNombre = form.nombreAventurero.value;
    const valorRango = form.rangoAventurero.value;

    const patronNombre = /^[a-zA-Z]+[0-9]{0,2}$/
    if (valorNombre === "") {
        mensaje.textContent = "¡Error! El nombre no puede estar vacío.";
        mensaje.classList.remove('mensajeEstado');
        mensaje.classList.add('mensajeEstadoError');
        return;
    }

    if (!patronNombre.test(valorNombre)) {
        mensaje.textContent = "Nombre inválido. Usa solo una palabra y hasta 2 números (ej: Guerrero24).";
        mensaje.classList.remove('mensajeEstado');
        mensaje.classList.add('mensajeEstadoError');
        return; 
    }

    const datosAventurero = {
    nombre: valorNombre,
    rango: valorRango,
    img : imgAvatar.src
    };

    localStorage.setItem('usuario', JSON.stringify(datosAventurero));

    mensaje.textContent = `¡Registro exitoso! Bienvenido al gremio, ${valorNombre}`;
    mensaje.classList.remove('mensajeEstadoError');
    mensaje.classList.add('mensajeEstado');
});


window.addEventListener('load', () => {
    const datosGuardados = localStorage.getItem('usuario');
    if(datosGuardados !== null){
        const datos = JSON.parse(datosGuardados);
        form.nombreAventurero.value = datos.nombre;
        form.rangoAventurero.value = datos.rango;
        imgAvatar.src = datos.img;
        imgAvatar.classList.remove('vistaPreviaOculta');
        txt.textContent = '';
    }
});



/*
SECCIÓN 3: LOCALIZACIÓN
*/

const opciones = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximunAge: 0
};

const obtenerPosicion = (posicion) => {
    const lat = posicion.coords.latitude;
    const long = posicion.coords.longitude;
    textoUbicacion.textContent = `Latitud: ${lat.toFixed(4)} Longitud: ${long.toFixed(4)}`;
};

const errorPosicion = (error) => {
    textoUbicacion.textContent = 'Ubicación no disponible';
};

window.addEventListener('load', () => {
    const geo = navigator.geolocation;

    geo.getCurrentPosition(obtenerPosicion, errorPosicion, opciones)
});