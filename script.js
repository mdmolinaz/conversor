document.addEventListener("DOMContentLoaded", function () {
  // Detectar si estamos en la página de configuración o de conversión
  if (document.getElementById('exchangeRateForm')) {
      // Página de configuración de tasas
      document.getElementById('exchangeRateForm').addEventListener('submit', (e) => {
          e.preventDefault();

          // Obtener los valores ingresados
          const usdRate = parseFloat(document.getElementById('usdRate').value);
          const eurRate = parseFloat(document.getElementById('eurRate').value);

          // Validar entrada
          if (!isNaN(usdRate) && !isNaN(eurRate)) {
              localStorage.setItem('usdRate', usdRate);
              localStorage.setItem('eurRate', eurRate);
              alert('Tasas guardadas exitosamente.');
              window.location.href = 'conversion.html'; // Redirigir a la página de conversión
          } else {
              alert('Por favor, ingresa valores válidos.');
          }
      });
  } 
  
  if (document.getElementById('convertButton')) {
      // Página de conversión de monedas
      const usdRate = parseFloat(localStorage.getItem('usdRate')) || 56.65; // Valor por defecto
      const eurRate = parseFloat(localStorage.getItem('eurRate')) || 59.34; // Valor por defecto

      // Definir las tasas dinámicamente
      const exchangeRates = {
          USD: { USD: 1, EUR: 0.85, VES: usdRate },
          EUR: { USD: 1.18, EUR: 1, VES: eurRate },
          VES: { USD: 1 / usdRate, EUR: 1 / eurRate, VES: 1 }
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
  }
});
