let visNetworkInstance = null;
let totalVerticesArbol = 0;
let nodesDataSet = null;
let edgesDataSet = null;
let animacionInterval = null;

// Paleta de colores del proyecto
const ESTILO_NODO_NORMAL = {
  background: '#8A9A86',
  border: '#65594C',
  highlight: { background: '#E8DFCA', border: '#65594C' },
  hover: { background: '#E8DFCA', border: '#65594C' }
};

const ESTILO_NODO_ACTIVO = {
  background: '#E8DFCA',
  border: '#65594C',
  highlight: { background: '#E8DFCA', border: '#65594C' }
};

const ESTILO_NODO_VISITADO = {
  background: '#65594C',
  border: '#8A9A86',
  highlight: { background: '#65594C', border: '#8A9A86' }
};

function generarGrafoVis() {
  detenerAnimacion();
  const v = parseInt(document.getElementById('grafo-v').value);
  const fStr = document.getElementById('grafo-f').value;
  const err = document.getElementById('msg-error-grafos');
  err.innerText = "";

  if (isNaN(v) || v <= 0 || !fStr) {
    err.innerText = "Ingrese un número válido de vértices y las conexiones.";
    return;
  }

  const nodes = [];
  for (let i = 1; i <= v; i++) {
    nodes.push({
      id: i,
      label: `V${i}`,
      shape: 'circle',
      borderWidth: 2,
      font: { color: '#FFFFFF', size: 14, face: 'sans-serif', bold: true },
      color: { ...ESTILO_NODO_NORMAL }
    });
  }

  const edges = [];
  const aristasArr = fStr.split(',');
  aristasArr.forEach(a => {
    const partes = a.trim().split('-');
    if (partes.length === 2) {
      edges.push({
        from: parseInt(partes[0]),
        to: parseInt(partes[1]),
        arrows: { to: { enabled: true, scaleFactor: 0.8 } },
        color: { color: '#65594C', highlight: '#8A9A86' },
        width: 2
      });
    }
  });

  dibujarNetwork(nodes, edges, false);
}

function generarArbolVis() {
  detenerAnimacion();
  const v = parseInt(document.getElementById('arbol-v').value);
  const niveles = parseInt(document.getElementById('arbol-n').value);
  const err = document.getElementById('msg-error-grafos');
  err.innerText = "";

  if (isNaN(v) || isNaN(niveles) || v <= 0 || niveles <= 0) {
    err.innerText = "Ingrese valores válidos para vértices y niveles.";
    return;
  }

  totalVerticesArbol = v;
  const nodes = [];
  const edges = [];

  for (let i = 1; i <= v; i++) {
    nodes.push({
      id: i,
      label: `N${i}`,
      shape: 'circle',
      borderWidth: 2,
      font: { color: '#FFFFFF', size: 14, face: 'sans-serif', bold: true },
      color: { ...ESTILO_NODO_NORMAL }
    });
    
    let padre = Math.floor(i / 2);
    if (padre >= 1) {
      edges.push({
        from: padre,
        to: i,
        color: { color: '#65594C', highlight: '#8A9A86' },
        width: 2
      });
    }
  }

  dibujarNetwork(nodes, edges, true);
}

function dibujarNetwork(nodes, edges, esJerarquico) {
  const container = document.getElementById('vis-canvas');
  nodesDataSet = new vis.DataSet(nodes);
  edgesDataSet = new vis.DataSet(edges);

  const data = { nodes: nodesDataSet, edges: edgesDataSet };
  const options = {
    layout: esJerarquico ? { hierarchical: { direction: 'UD', sortMethod: 'directed', nodeSpacing: 90, levelSeparation: 90 } } : {},
    physics: !esJerarquico ? { solver: 'forceAtlas2Based', stabilization: { iterations: 100 } } : false,
    nodes: {
      shadow: { enabled: true, color: 'rgba(101, 89, 76, 0.25)', size: 10, x: 2, y: 4 }
    },
    edges: {
      smooth: { type: 'cubicBezier', forceDirection: 'vertical', roundness: 0.4 }
    },
    interaction: { hover: true }
  };

  if (visNetworkInstance) visNetworkInstance.destroy();
  visNetworkInstance = new vis.Network(container, data, options);
}

// Algoritmos Recursivos de Recorrido de Árbol Binario
function getPreOrder(id, max) {
  if (id > max) return [];
  return [id, ...getPreOrder(2 * id, max), ...getPreOrder(2 * id + 1, max)];
}

function getInOrder(id, max) {
  if (id > max) return [];
  return [...getInOrder(2 * id, max), id, ...getInOrder(2 * id + 1, max)];
}

function getPostOrder(id, max) {
  if (id > max) return [];
  return [...getPostOrder(2 * id, max), ...getPostOrder(2 * id + 1, max), id];
}

function detenerAnimacion() {
  if (animacionInterval) {
    clearInterval(animacionInterval);
    animacionInterval = null;
  }
}

function ejecutarRecorrido(tipo) {
  detenerAnimacion();
  const txt = document.getElementById('res-recorrido-texto');
  
  if (totalVerticesArbol <= 0 || !nodesDataSet) {
    txt.innerText = "Primero debe generar un Árbol Binario.";
    return;
  }

  let orden = [];
  if (tipo === 'pre') orden = getPreOrder(1, totalVerticesArbol);
  else if (tipo === 'in') orden = getInOrder(1, totalVerticesArbol);
  else if (tipo === 'post') orden = getPostOrder(1, totalVerticesArbol);

  txt.innerText = `Recorrido ${tipo.toUpperCase()}-ORDEN: ${orden.map(n => 'N' + n).join(' -> ')}`;

  // Resetear todos los nodos al estilo base
  const todosLosNodos = nodesDataSet.get();
  todosLosNodos.forEach(nodo => {
    nodesDataSet.update({
      id: nodo.id,
      color: { ...ESTILO_NODO_NORMAL },
      borderWidth: 2,
      font: { color: '#FFFFFF', size: 14, face: 'sans-serif', bold: true }
    });
  });

  // Animación paso a paso (Luz de seguimiento)
  let paso = 0;
  animacionInterval = setInterval(() => {
    if (paso > 0) {
      // Dejar el nodo anterior marcado como visitado en marrón oscuro
      const idPrevio = orden[paso - 1];
      nodesDataSet.update({
        id: idPrevio,
        color: { ...ESTILO_NODO_VISITADO },
        borderWidth: 2,
        font: { color: '#FFFFFF', size: 14, face: 'sans-serif', bold: true }
      });
    }

    if (paso < orden.length) {
      // Iluminar el nodo activo actual con luz crema brillante y borde ancho
      const idActual = orden[paso];
      nodesDataSet.update({
        id: idActual,
        color: { ...ESTILO_NODO_ACTIVO },
        borderWidth: 4,
        font: { color: '#65594C', size: 16, face: 'sans-serif', bold: true }
      });

      if (visNetworkInstance) {
        visNetworkInstance.selectNodes([idActual]);
      }
      paso++;
    } else {
      detenerAnimacion();
    }
  }, 900); // Tiempo por paso (900 ms)
}