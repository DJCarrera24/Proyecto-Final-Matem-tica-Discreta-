function factorial(n) {
  if (n < 0) return 0;
  let r = 1n;
  for (let i = 1n; i <= BigInt(n); i++) r *= i;
  return r;
}

function esEnteroValido(val) {
  return Number.isInteger(val) && val >= 0;
}

function calcPermutacionSimple() {
  const n = parseInt(document.getElementById('ps-n').value);
  const r = parseInt(document.getElementById('ps-r').value);
  const err = document.getElementById('msg-error-combinatoria');
  err.innerText = "";

  if (!esEnteroValido(n) || !esEnteroValido(r) || n < r) {
    err.innerText = "Permutación Simple: Ingrese enteros donde n >= r >= 0.";
    return;
  }

  const res = factorial(n) / factorial(n - r);
  document.getElementById('res-ps').innerText = `P(${n},${r}) = ${res.toString()}`;
  if (typeof StorageController !== 'undefined') StorageController.guardarRegistro('Combinatoria', `P(${n},${r})`, res.toString());
}

function calcCombinacionSimple() {
  const n = parseInt(document.getElementById('cs-n').value);
  const r = parseInt(document.getElementById('cs-r').value);
  const err = document.getElementById('msg-error-combinatoria');
  err.innerText = "";

  if (!esEnteroValido(n) || !esEnteroValido(r) || n < r) {
    err.innerText = "Combinación Simple: Ingrese enteros donde n >= r >= 0.";
    return;
  }

  const res = factorial(n) / (factorial(r) * factorial(n - r));
  document.getElementById('res-cs').innerText = `C(${n},${r}) = ${res.toString()}`;
  if (typeof StorageController !== 'undefined') StorageController.guardarRegistro('Combinatoria', `C(${n},${r})`, res.toString());
}

function calcPermutacionRepeticion() {
  const n = parseInt(document.getElementById('pr-n').value);
  const kStr = document.getElementById('pr-k').value;
  const err = document.getElementById('msg-error-combinatoria');
  err.innerText = "";

  if (!esEnteroValido(n)) {
    err.innerText = "Permutación con Repetición: n debe ser un entero >= 0.";
    return;
  }

  const reps = kStr.split(',').map(x => parseInt(x.trim())).filter(x => esEnteroValido(x));
  const sumaReps = reps.reduce((a, b) => a + b, 0);

  if (reps.length === 0 || sumaReps !== n) {
    err.innerText = `Error: La suma de repeticiones (${sumaReps}) debe ser igual a n (${n}).`;
    return;
  }

  let denom = 1n;
  reps.forEach(k => denom *= factorial(k));

  const res = factorial(n) / denom;
  document.getElementById('res-pr').innerText = `P_rep = ${res.toString()}`;
  if (typeof StorageController !== 'undefined') StorageController.guardarRegistro('Combinatoria', `P_rep(${n})`, res.toString());
}

function calcCombinacionRepeticion() {
  const n = parseInt(document.getElementById('cr-n').value);
  const r = parseInt(document.getElementById('cr-r').value);
  const err = document.getElementById('msg-error-combinatoria');
  err.innerText = "";

  if (!esEnteroValido(n) || !esEnteroValido(r) || n === 0) {
    err.innerText = "Combinación con Repetición: Ingrese enteros donde n > 0 y r >= 0.";
    return;
  }

  const num = factorial(n + r - 1);
  const den = factorial(r) * factorial(n - 1);
  const res = num / den;

  document.getElementById('res-cr').innerText = `CR(${n},${r}) = ${res.toString()}`;
  if (typeof StorageController !== 'undefined') StorageController.guardarRegistro('Combinatoria', `CR(${n},${r})`, res.toString());
}