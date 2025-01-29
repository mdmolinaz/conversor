document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById('exchangeRateForm')) {
      document.getElementById('exchangeRateForm').addEventListener('submit', (e) => {
          e.preventDefault();

          const usdRate = parseFloat(document.getElementById('usdRate').value);
          const eurRate = parseFloat(document.getElementById('eurRate').value);

          if (!isNaN(usdRate) && usdRate > 0 && !isNaN(eurRate) && eurRate > 0) {
              localStorage.setItem('usdRate', usdRate.toFixed(2));
              localStorage.setItem('eurRate', eurRate.toFixed(2));
              alert('Tasas guardadas exitosamente.');
              window.location.href = 'conversion.html';
          } else {
              alert('Por favor, ingresa valores válidos.');
          }
      });
  } 
  
  if (document.getElementById('convertButton')) {
      const usdRate = parseFloat(localStorage.getItem('usdRate')) || 56.65;
      const eurRate = parseFloat(localStorage.getItem('eurRate')) || 59.34;

      const exchangeRates = {
          USD: { USD: 1, EUR: 0.85, VES: usdRate },
          EUR: { USD: 1.18, EUR: 1, VES: eurRate },
          VES: { USD: 1 / usdRate, EUR: 1 / eurRate, VES: 1 }
      };

      document.getElementById('convertButton').addEventListener('click', () => {
          const amount = parseFloat(document.getElementById('amount').value);
          const fromCurrency = document.getElementById('fromCurrency').value;
          const toCurrency = document.getElementById('toCurrency').value;

          if (isNaN(amount) || amount <= 0) {
              document.getElementById('result').textContent = 'Introduce un monto válido.';
              return;
          }

          const rate = exchangeRates[fromCurrency][toCurrency];
          const convertedAmount = (amount * rate).toFixed(2);

          document.getElementById('result').textContent = 
              `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
      });
  }
});
