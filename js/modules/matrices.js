let matrizA = [];
let matrizB = [];

function generarMatrices() {
  const dim = parseInt(document.getElementById('mat-dimension').value);
  matrizA = [];
  matrizB = [];

  for (let i = 0; i < dim; i++) {
    let filaA = [], filaB = [];
    for (let j = 0; j < dim; j++) {
      filaA.push(Math.floor(Math.random() * 10) + 1);
      filaB.push(Math.floor(Math.random() * 10) + 1);
    }
    matrizA.push(filaA);
    matrizB.push(filaB);
  }

  renderTablaMatriz('container-matriz-a', matrizA);
  renderTablaMatriz('container-matriz-b', matrizB);
  document.getElementById('container-matriz-res').innerHTML = "";

  verificarIdentidad();
}

function renderTablaMatriz(idContenedor, matriz) {
  let html = '<table class="border-collapse border border-slate-300 font-mono text-xs bg-slate-50 w-full text-center">';
  matriz.forEach(fila => {
    html += '<tr>';
    fila.forEach(val => {
      html += `<td class="border border-slate-300 p-2">${val}</td>`;
    });
    html += '</tr>';
  });
  html += '</table>';
  document.getElementById(idContenedor).innerHTML = html;
}

function verificarIdentidad() {
  const statusDiv = document.getElementById('status-matrices-identicas');
  let identicas = true;

  for (let i = 0; i < matrizA.length; i++) {
    for (let j = 0; j < matrizA.length; j++) {
      if (matrizA[i][j] !== matrizB[i][j]) {
        identicas = false;
        break;
      }
    }
  }

  statusDiv.classList.remove('hidden', 'bg-emerald-100', 'text-emerald-800', 'bg-amber-100', 'text-amber-800');
  if (identicas) {
    statusDiv.classList.add('bg-emerald-100', 'text-emerald-800');
    statusDiv.innerText = "¡Atención: Las Matrices A y B son IDÉNTICAS!";
  } else {
    statusDiv.classList.add('bg-amber-100', 'text-amber-800');
    statusDiv.innerText = "Las Matrices A y B son DIFERENTES.";
  }
}

function operarMatrices(tipo) {
  const err = document.getElementById('msg-error-matrices');
  err.innerText = "";

  if (matrizA.length === 0 || matrizB.length === 0) {
    err.innerText = "Debe generar las matrices antes de operar.";
    return;
  }

  const dim = matrizA.length;
  let res = Array.from({ length: dim }, () => Array(dim).fill(0));

  if (tipo === 'suma') {
    for (let i = 0; i < dim; i++) {
      for (let j = 0; j < dim; j++) {
        res[i][j] = matrizA[i][j] + matrizB[i][j];
      }
    }
  } else if (tipo === 'producto') {
    for (let i = 0; i < dim; i++) {
      for (let j = 0; j < dim; j++) {
        for (let k = 0; k < dim; k++) {
          res[i][j] += matrizA[i][k] * matrizB[k][j];
        }
      }
    }
  }

  renderTablaMatriz('container-matriz-res', res);
  if (typeof StorageController !== 'undefined') StorageController.guardarRegistro('Matrices', `Operación: ${tipo}`, `${dim}x${dim}`);
}