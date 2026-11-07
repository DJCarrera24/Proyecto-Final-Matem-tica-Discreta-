let conjuntoA = null;
let conjuntoB = null;

function crearConjunto(nombre, modo) {
  const inputCant = document.getElementById(`cant-elem-${nombre.toLowerCase()}`);
  const cantVal = parseInt(inputCant.value);
  const tipoVal = document.getElementById(`tipo-elem-${nombre.toLowerCase()}`).value;
  const msgError = document.getElementById('msg-error-conjuntos');
  
  msgError.innerText = "";

  if (isNaN(cantVal) || cantVal < 1 || cantVal > 20) {
    msgError.innerText = `La cantidad para el Conjunto ${nombre} debe estar entre 1 y 20.`;
    return;
  }

  let elementos = [];

  if (modo === 'random') {
    while (elementos.length < cantVal) {
      let val = tipoVal === 'num' 
        ? Math.floor(Math.random() * 50) + 1 
        : String.fromCharCode(97 + Math.floor(Math.random() * 26));

      if (!elementos.includes(val)) elementos.push(val);
    }
  } else {
    let entrada = prompt(`Ingresa ${cantVal} elementos para ${nombre} (separados por coma):`);
    if (!entrada) return;
    let arr = entrada.split(',').map(i => i.trim()).filter(i => i !== "");
    elementos = Array.from(new Set(arr)).slice(0, cantVal);
  }

  if (nombre === 'A') {
    conjuntoA = elementos;
    document.getElementById('display-conjunto-a').innerText = `{ ${conjuntoA.join(', ')} }`;
  } else {
    conjuntoB = elementos;
    document.getElementById('display-conjunto-b').innerText = `{ ${conjuntoB.join(', ')} }`;
  }

  if (typeof StorageController !== 'undefined') {
    StorageController.guardarRegistro('Conjuntos', `Crear ${nombre}`, `{ ${elementos.join(', ')} }`);
  }
}

function operarConjuntos(tipoOp) {
  const msgError = document.getElementById('msg-error-conjuntos');
  const txtRes = document.getElementById('res-conjuntos');
  msgError.innerText = "";

  if (!conjuntoA || !conjuntoB) {
    msgError.innerText = "Error: Debe crear el Conjunto A y el Conjunto B antes de realizar operaciones.";
    return;
  }

  let res = [];
  let simbolo = "";

  if (tipoOp === 'union') {
    res = Array.from(new Set([...conjuntoA, ...conjuntoB]));
    simbolo = "A ∪ B";
  } else if (tipoOp === 'interseccion') {
    res = conjuntoA.filter(x => conjuntoB.includes(x));
    simbolo = "A ∩ B";
  } else if (tipoOp === 'diffAB') {
    res = conjuntoA.filter(x => !conjuntoB.includes(x));
    simbolo = "A - B";
  } else if (tipoOp === 'diffBA') {
    res = conjuntoB.filter(x => !conjuntoA.includes(x));
    simbolo = "B - A";
  }

  txtRes.innerText = `${simbolo} = { ${res.join(', ')} }`;

  if (typeof StorageController !== 'undefined') {
    StorageController.guardarRegistro('Conjuntos', simbolo, `{ ${res.join(', ')} }`);
  }
}   