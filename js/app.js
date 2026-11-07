function navegarAModulo(idModulo) {
  // 1. Ocultar todas las secciones de contenido
  document.querySelectorAll('.modulo-content').forEach(sec => sec.classList.add('hidden'));
  
  // 2. Mostrar la sección seleccionada
  const target = document.getElementById(`sec-${idModulo}`);
  if (target) target.classList.remove('hidden');

  // 3. Quitar el resalte activo de todos los botones de la navegación
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('bg-brand-sage', 'font-semibold', 'shadow-sm');
    btn.classList.add('hover:bg-brand-sage/40');
  });

  // 4. Aplicar el resalte activo al botón actual
  const btnActivo = document.getElementById(`nav-${idModulo}`);
  if (btnActivo) {
    btnActivo.classList.remove('hover:bg-brand-sage/40');
    btnActivo.classList.add('bg-brand-sage', 'font-semibold', 'shadow-sm');
  }
}

function cerrarAplicacion() {
  if (confirm("¿Desea finalizar la sesión?")) {
    document.body.innerHTML = `
      <div class="flex items-center justify-center w-full h-screen bg-brand-dark text-white flex-col gap-4">
        <h1 class="text-3xl font-bold text-brand-cream">Aplicación Finalizada</h1>
        <button onclick="location.reload()" class="px-4 py-2 bg-brand-sage rounded text-sm font-semibold hover:brightness-110">Reiniciar</button>
      </div>`;
  }
}