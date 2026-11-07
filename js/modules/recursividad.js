function factorialRec(n) {
  if (n === 0n || n === 1n) return 1n;
  return n * factorialRec(n - 1n);
}

function calcFactorial() {
  const input = document.getElementById('fac-n');
  const n = parseInt(input.value);
  const err = document.getElementById('msg-error-recursividad');
  const resDiv = document.getElementById('res-factorial');
  err.innerText = "";
  resDiv.innerText = "";

  if (isNaN(n) || n < 1 || n > 50) {
    err.innerText = "Error: Ingrese un entero entre 1 y 50.";
    return;
  }

  const res = factorialRec(BigInt(n));
  resDiv.innerText = `${n}! = ${res.toString()}`;

  if (typeof StorageController !== 'undefined') {
    StorageController.guardarRegistro('Recursividad', `Factorial(${n})`, res.toString());
  }
}

function traspasoRec(a, b, pasos = []) {
  pasos.push(`(${a}) + (${b})`);
  if (b === 0) return { resultado: a, pasos };
  return traspasoRec(a + 1, b - 1, pasos);
}

function calcSumaTraspaso() {
  const a = parseInt(document.getElementById('sum-a').value);
  const b = parseInt(document.getElementById('sum-b').value);
  const err = document.getElementById('msg-error-recursividad');
  const resDiv = document.getElementById('res-traspaso');
  err.innerText = "";
  resDiv.innerHTML = "";

  if (isNaN(a) || isNaN(b) || a < 1 || a > 10 || b < 1 || b > 10) {
    err.innerText = "Error: A y B deben estar entre 1 y 10.";
    return;
  }

  if (a <= b) {
    err.innerText = "Error: A debe ser estrictamente mayor que B (A > B).";
    return;
  }

  const { resultado, pasos } = traspasoRec(a, b);
  
  let html = "<p class='font-bold text-slate-700 mb-1'>Pasos:</p>";
  pasos.forEach((p, idx) => {
    html += `<div>Paso ${idx + 1}: ${p}</div>`;
  });
  html += `<div class='font-bold text-emerald-600 mt-2'>Resultado = ${resultado}</div>`;
  
  resDiv.innerHTML = html;

  if (typeof StorageController !== 'undefined') {
    StorageController.guardarRegistro('Recursividad', `Suma (${a}+${b})`, resultado.toString());
  }
}

function fibonacciSerie(n) {
  if (n <= 0) return [];
  if (n === 1) return [1];
  let serie = [1, 1];
  for (let i = 2; i < n; i++) {
    serie.push(serie[i - 1] + serie[i - 2]);
  }
  return serie;
}

function calcFibonacciPiramide() {
  const n = parseInt(document.getElementById('fib-n').value);
  const err = document.getElementById('msg-error-recursividad');
  const container = document.getElementById('container-fib-piramide');
  const resPre = document.getElementById('res-fibonacci');
  err.innerText = "";
  resPre.innerText = "";

  if (isNaN(n) || n < 5 || n > 20) {
    err.innerText = "Error: Ingrese un entero entre 5 y 20.";
    container.classList.add('hidden');
    return;
  }

  const serie = fibonacciSerie(n);
  let piramideText = "";

  for (let i = 1; i <= n; i++) {
    piramideText += serie.slice(0, i).join("  ") + "\n";
  }

  resPre.innerText = piramideText;
  container.classList.remove('hidden');

  if (typeof StorageController !== 'undefined') {
    StorageController.guardarRegistro('Recursividad', `Fibonacci Pirámide (${n})`, serie.join(', '));
  }
}