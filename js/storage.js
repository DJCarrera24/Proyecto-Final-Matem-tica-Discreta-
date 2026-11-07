const StorageController = {
  guardarRegistro: (modulo, entrada, resultado) => {
    const historial = StorageController.obtenerHistorial();
    const item = { id: Date.now(), modulo, entrada, resultado };
    historial.unshift(item);
    localStorage.setItem('historial_discreta', JSON.stringify(historial.slice(0, 10)));
    StorageController.actualizarUI();
  },
  obtenerHistorial: () => {
    const d = localStorage.getItem('historial_discreta');
    return d ? JSON.parse(d) : [];
  },
  actualizarUI: () => {
    const prev = document.getElementById('sidebar-historial-preview');
    const h = StorageController.obtenerHistorial();
    if (h.length > 0 && prev) {
      prev.innerHTML = `<p class="font-bold text-emerald-400">${h[0].modulo}</p><p>${h[0].entrada}</p>`;
    }
  }
};
document.addEventListener('DOMContentLoaded', () => StorageController.actualizarUI());