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

// Iconos SVG para los tipos de solicitud y botón eliminar
const iconHardware = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px; vertical-align: middle;"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`;
const iconSoftware = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px; vertical-align: middle;"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`;
const iconRedes = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px; vertical-align: middle;"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><circle cx="12" cy="20" r="1"></circle></svg>`;
const iconSeguridad = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px; vertical-align: middle;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`;
const iconTrash = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>`;

function obtenerIconoTipo(tipo) {
    if (tipo === 'Hardware') return iconHardware;
    if (tipo === 'Software') return iconSoftware;
    if (tipo === 'Redes') return iconRedes;
    if (tipo === 'Seguridad') return iconSeguridad;
    return '';
}

function actualizarTabla() {
    tablaCuerpo.innerHTML = "";

    solicitudes.forEach((solicitud, index) => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>
                <div style="font-weight: 600;">${solicitud.nombre}</div>
                <div style="font-size: 0.75rem; color: var(--text-secondary);">${solicitud.correo}</div>
            </td>
            <td>${solicitud.area}</td>
            <td>
                <span class="badge badge-${solicitud.tipo.toLowerCase()}">
                    ${obtenerIconoTipo(solicitud.tipo)}
                    ${solicitud.tipo}
                </span>
            </td>
            <td>${solicitud.descripcion}</td>
            <td style="text-align: center;">
                <button type="button" class="btn-delete" onclick="eliminarSolicitud(${index})" title="Eliminar solicitud">
                    ${iconTrash}
                </button>
            </td>
        `;

        tablaCuerpo.appendChild(fila);
    });

    txtContadorTotal.textContent = solicitudes.length;
}

// Función global para eliminar una solicitud
window.eliminarSolicitud = function(index) {
    solicitudes.splice(index, 1);
    actualizarTabla();
    mostrarFeedback("Solicitud eliminada correctamente.", "success");
};

btnRegistrar.addEventListener('click', registrarSolicitud);
btnLimpiar.addEventListener('click', () => {
    limpiarFormulario();
    mostrarFeedback("Campos del formulario limpiados.", "success");
});