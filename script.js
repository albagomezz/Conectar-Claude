// Calculadora básica con soporte de teclado
const displayEl = document.getElementById('display');
let current = ''; // expresión actual mostrada

function updateDisplay(){
  displayEl.textContent = current || '0';
}

function append(value){
  // Evitar entradas duplicadas como '..' o operadores seguidos
  if (value === '.' && /(?:^|[\+\-\*\/\%])[^.]*\.$/.test(current)) return;
  if(/[\+\-\*\/\%]/.test(value)) {
    // reemplazar último operador si ya hay uno (permitir '-' para signo negativo al inicio)
    if (current === '' && value === '-') {
      current = '-';
      updateDisplay();
      return;
    }
    if (/[\+\-\*\/\%]$/.test(current)) {
      current = current.slice(0, -1) + value;
      updateDisplay();
      return;
    }
  }
  current += value;
  updateDisplay();
}

function clearAll(){
  current = '';
  updateDisplay();
}

function del(){
  current = current.slice(0, -1);
  updateDisplay();
}

function percent(){
  if (!current) return;
  try {
    const val = evaluateExpression(current);
    current = String(val / 100);
    updateDisplay();
  } catch {
    displayEl.textContent = 'Error';
  }
}

function evaluateExpression(expr){
  // Normalizar multiplicación/división visual a operadores JS
  expr = expr.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
  // Evitar caracteres no permitidos (solo dígitos, operadores, punto, paréntesis, espacios)
  if (/[^0-9+\-*/%.() ]/.test(expr)) throw new Error('Invalid characters');
  // Usamos Function para evaluar de forma simple (no recomendado para inputs arbitrarios en producción).
  return Function('"use strict";return (' + expr + ')')();
}

function compute(){
  if (!current) return;
  try {
    const result = evaluateExpression(current);
    current = String(result);
    updateDisplay();
  } catch (e) {
    displayEl.textContent = 'Error';
    current = '';
  }
}

// Events
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const num = btn.dataset.number;
    const action = btn.dataset.action;
    if (num !== undefined) {
      append(num);
      return;
    }
    if (!action) return;
    if (action === 'clear') clearAll();
    else if (action === 'delete') del();
    else if (action === '%') percent();
    else if (action === '=') compute();
    else {
      // operator string like + - * /
      append(action);
    }
  });
});

// Keyboard support
window.addEventListener('keydown', (e) => {
  const k = e.key;
  if ((k >= '0' && k <= '9') || k === '.') {
    append(k);
    return;
  }
  if (k === 'Enter' || k === '=') {
    e.preventDefault();
    compute();
    return;
  }
  if (k === 'Backspace') {
    del();
    return;
  }
  if (k === 'Escape') {
    clearAll();
    return;
  }
  if (k === '+' || k === '-' || k === '*' || k === '/') {
    append(k);
    return;
  }
  if (k === '%') {
    percent();
    return;
  }
});