/*-------------------------------------*/
/*--|funcionalidad_apodos_divertidos|--*/
/*-------------------------------------*/
const campoApodo = document.querySelector("#campoApodo");
const apodoMostrado = document.querySelector("#apodoMostrado");
const mensajeApodo = document.querySelector("#mensajeApodo");
const contenedorHistorial = document.querySelector("#contenedorHistorial");
const botonGuardar = document.querySelector("#botonGuardar");
const botonLimpiar = document.querySelector("#botonLimpiar");
const botonRestaurar = document.querySelector("#botonRestaurar");
const botonRestablecer = document.querySelector("#botonRestablecer");
const mensajeFormulario = document.querySelector("#mensajeFormulario");
const mensajeGeneral = document.querySelector("#mensajeGeneral");
/*-----------------------------------------------*/
/*--|obtener_los_apodos_usando_el_localstorage|--*/
/*-----------------------------------------------*/
function obtenerApodo() {
    const apodoGuardado = localStorage.getItem("apodo_divertido");
    return apodoGuardado;
}
/*------------------------*/
/*--|mostrar_los_apodos|--*/
/*------------------------*/
function mostrarApodo(apodo) {
    if (apodo) {
        apodoMostrado.textContent = apodo;
        mensajeApodo.textContent = "¡Este es tu apodo divertido!";
        campoApodo.value = apodo;
    } else {
        apodoMostrado.textContent = "Sin apodo";
        mensajeApodo.textContent = "Escribe un apodo para comenzar.";
        campoApodo.value = "";
    }
}
/*--------------------------*/
/*--|mostrar_el_historial|--*/
/*--------------------------*/
function mostrarHistorial(apodo) {
    if (apodo) {
        contenedorHistorial.innerHTML = `
            <p class="apodo_guardado">${apodo}</p>
        `;
    } else {
        contenedorHistorial.innerHTML = `
            <p class="sin_historial">Todavía no hay un apodo guardado.</p>
        `;
    }
}
/*----------------------------------------------*/
/*--|guardar_los_apodo_usando_el_localstorage|--*/
/*----------------------------------------------*/
function guardarApodo() {
    const apodo = campoApodo.value.trim();
    if (!apodo) {
        mensajeFormulario.textContent = "Escribe un apodo primero.";
        return;
    }
    localStorage.setItem("apodo_divertido", apodo);
    mostrarApodo(apodo);
    mostrarHistorial(apodo);
    mensajeFormulario.textContent = "¡Apodo guardado correctamente!";
    setTimeout(() => {
        mensajeFormulario.textContent = "";
    }, 2500);
}
/*-----------------------*/
/*--|limpiar_los_campo|--*/
/*-----------------------*/
function limpiarCampo() {
    campoApodo.value = "";
    campoApodo.focus();
    mensajeFormulario.textContent = "Campo preparado para otro apodo.";
    setTimeout(() => {
        mensajeFormulario.textContent = "";
    }, 2500);
}
/*--------------------------*/
/*--|restaurar_los_apodos|--*/
/*--------------------------*/
function restaurarApodo() {
    const apodo = obtenerApodo();
    if (!apodo) {
        mensajeFormulario.textContent = "No hay ningún apodo guardado.";
        return;
    }
    mostrarApodo(apodo);
    mostrarHistorial(apodo);
    mensajeFormulario.textContent = "Apodo restaurado correctamente.";
    setTimeout(() => {
        mensajeFormulario.textContent = "";
    }, 2500);
}
/*------------------------------------------*/
/*--|restablecer_todo_usando_localstorage|--*/
/*------------------------------------------*/
function restablecerTodo() {
    localStorage.removeItem("apodo_divertido");
    mostrarApodo("");
    mostrarHistorial("");
    mensajeGeneral.textContent = "El apodo fue eliminado correctamente.";
    setTimeout(() => {
        mensajeGeneral.textContent = "";
    }, 2500);
}
/*----------------------*/
/*--|cargar_los_datos|--*/
/*----------------------*/
function cargarDatos() {
    const apodo = obtenerApodo();
    mostrarApodo(apodo);
    mostrarHistorial(apodo);
}
/*----------------------------*/
/*--|eventos_de_los_botones|--*/
/*----------------------------*/
botonGuardar.addEventListener("click", () => {
    guardarApodo();
});
botonLimpiar.addEventListener("click", () => {
    limpiarCampo();
});
botonRestaurar.addEventListener("click", () => {
    restaurarApodo();
});
botonRestablecer.addEventListener("click", () => {
    const confirmar = confirm("¿Quieres eliminar el apodo guardado?");
    if (confirmar) {
        restablecerTodo();
    }
});
/*------------------------*/
/*--|evento_tecla_enter|--*/
/*------------------------*/
campoApodo.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") {
        guardarApodo();
    }
});
cargarDatos();