function verificarPrimoPasoAPaso() {
  const n = parseInt(document.getElementById('primo-n').value);
  const err = document.getElementById('msg-error-division');
  const res = document.getElementById('res-primo-pasos');
  err.innerText = "";
  res.innerHTML = "";

  if (isNaN(n) || n < 1 || n >= 1000) {
    err.innerText = "Ingrese un número entero positivo menor a 1000.";
    return;
  }

  if (n === 1) {
    res.innerHTML = "<div>1 no se considera un número primo por definición.</div>";
    return;
  }

  let esPrimo = true;
  let html = `<div>Probando divisores para N = ${n}:</div>`;

  for (let i = 2; i < n; i++) {
    let exacto = (n % i === 0);
    html += `<div>${n} ÷ ${i} = ${(n / i).toFixed(2)} ${exacto ? '<strong class="text-rose-600">[EXACTA]</strong>' : '[Inexacta]'}</div>`;
    if (exacto) {
      esPrimo = false;
      break;
    }
  }

  html += `<div class="font-bold mt-2 ${esPrimo ? 'text-emerald-600' : 'text-rose-600'}">Resultado: ${n} ${esPrimo ? 'ES PRIMO' : 'NO ES PRIMO'}</div>`;
  res.innerHTML = html;

  if (typeof StorageController !== 'undefined') StorageController.guardarRegistro('División', `Primo(${n})`, esPrimo ? 'Es Primo' : 'No es Primo');
}

function calcTeorema6() {
  const a = parseInt(document.getElementById('teo-a').value);
  const b = parseInt(document.getElementById('teo-b').value);
  const err = document.getElementById('msg-error-division');
  const res = document.getElementById('res-mcd-mcm');
  err.innerText = "";
  res.innerHTML = "";

  if (isNaN(a) || isNaN(b) || a < 1 || a >= 500 || b < 1 || b >= 500) {
    err.innerText = "Ingrese enteros positivos menores a 500 para A y B.";
    return;
  }

  const mcdCalc = (x, y) => y === 0 ? x : mcdCalc(y, x % y);
  const mcdVal = mcdCalc(a, b);
  const mcmVal = (a * b) / mcdVal;

  let html = `<div>MCD(${a}, ${b}) = ${mcdVal}</div>`;
  html += `<div>MCM(${a}, ${b}) = ${mcmVal}</div>`;
  html += `<div class="mt-1 border-t pt-1 text-indigo-600 font-bold">Demostración Teorema 6:</div>`;
  html += `<div>MCD * MCM = ${mcdVal} * ${mcmVal} = ${mcdVal * mcmVal}</div>`;
  html += `<div>a * b = ${a} * ${b} = ${a * b}</div>`;
  html += `<div class="text-emerald-600 font-bold mt-1">¡Se cumple el Teorema 6!</div>`;

  res.innerHTML = html;

  if (typeof StorageController !== 'undefined') StorageController.guardarRegistro('Teorema 6', `MCD/MCM(${a},${b})`, `MCD:${mcdVal}, MCM:${mcmVal}`);
}