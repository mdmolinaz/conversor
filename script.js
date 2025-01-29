// Tasas de cambio fijas
const exchangeRates = {
  USD: { USD: 1, EUR: 0.85, MXN: 17.5 },
  EUR: { USD: 1.18, EUR: 1, MXN: 20.6 },
  MXN: { USD: 0.057, EUR: 0.049, MXN: 1 }
};

document.getElementById('convertButton').addEventListener('click', () => {
  const amount = parseFloat(document.getElementById('amount').value);
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;

  // Validar entrada
  if (isNaN(amount) || amount <= 0) {
    document.getElementById('result').textContent = 'Por favor, introduce un monto válido.';
    return;
  }

  // Realizar conversión
  const rate = exchangeRates[fromCurrency][toCurrency];
  const convertedAmount = (amount * rate).toFixed(2);

  // Mostrar resultado
  document.getElementById('result').textContent = 
    `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
});
