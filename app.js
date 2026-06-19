const btnTheme = document.getElementById('btn-theme');
const themeText = document.getElementById('theme-text');
const htmlElement = document.documentElement;

btnTheme.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');

    if (currentTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'light');
        themeText.textContent = 'Modo Oscuro';
    } else {
        htmlElement.setAttribute('data-theme', 'dark');
        themeText.textContent = 'Modo Claro';
    }
});

let solicitudes = [];

const formSolicitud = document.getElementById('form-solicitud');
const inputNombre = document.getElementById('nombre');
const inputCorreo = document.getElementById('correo');
const inputArea = document.getElementById('area');
const selectTipo = document.getElementById('tipo');
const txtDescripcion = document.getElementById('descripcion');

const contenedorFeedback = document.getElementById('mensaje-feedback');
const tablaCuerpo = document.getElementById('lista-solicitudes');
const txtContadorTotal = document.getElementById('contador-total');

const btnRegistrar = document.getElementById('btn-registrar');
const btnLimpiar = document.getElementById('btn-limpiar');

function registrarSolicitud() {
    let nombre = inputNombre.value.trim();
    let correo = inputCorreo.value.trim();
    let area = inputArea.value.trim();
    let tipo = selectTipo.value;
    let descripcion = txtDescripcion.value.trim();

    if (nombre === "" || correo === "" || area === "" || tipo === "" || descripcion === "") {
        mostrarFeedback("Error: Todos los campos son obligatorios.", "error");
        return;
    }

    if (!correo.includes("@")) {
        mostrarFeedback("Error: El correo electrónico debe contener un caracter @ válido.", "error");
        return;
    }

    let nuevaSolicitud = {
        nombre: nombre,
        correo: correo,
        area: area,
        tipo: tipo,
        descripcion: descripcion
    };

    solicitudes.push(nuevaSolicitud);

    mostrarFeedback("Solicitud registrada exitosamente.", "success");
    actualizarTabla();
    limpiarFormulario();
}

function limpiarFormulario() {
    inputNombre.value = "";
    inputCorreo.value = "";
    inputArea.value = "";
    selectTipo.value = "";
    txtDescripcion.value = "";
}

function mostrarFeedback(mensaje, tipo) {
    contenedorFeedback.textContent = mensaje;
    contenedorFeedback.className = `msg-box ${tipo}`;

    setTimeout(() => {
        contenedorFeedback.className = "msg-box hidden";
    }, 4000);
}

function actualizarTabla() {
    tablaCuerpo.innerHTML = "";

    solicitudes.forEach((solicitud, index) => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>
                <div>${solicitud.nombre}</div>
                <div style="font-size: 0.75rem; color: var(--text-secondary);">${solicitud.correo}</div>
            </td>
            <td>${solicitud.area}</td>
            <td><span class="badge badge-${solicitud.tipo.toLowerCase()}">${solicitud.tipo}</span></td>
            <td>${solicitud.descripcion}</td>
        `;

        tablaCuerpo.appendChild(fila);
    });

    txtContadorTotal.textContent = solicitudes.length;
}

btnRegistrar.addEventListener('click', registrarSolicitud);
btnLimpiar.addEventListener('click', () => {
    limpiarFormulario();
    mostrarFeedback("Campos del formulario limpiados.", "success");
});