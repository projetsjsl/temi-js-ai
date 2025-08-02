function calculTEMI() {
  const emploi = parseFloat(document.getElementById('emploi').value);
  const reer = parseFloat(document.getElementById('reer').value);
  const dividendes = parseFloat(document.getElementById('dividendes').value);
  const interets = parseFloat(document.getElementById('interets').value);
  const gain = parseFloat(document.getElementById('gain').value);

  const revenu_total = emploi + reer + dividendes + interets + gain;
  const taux_marginal = (revenu_total > 90997) ? 0.45 : 0.35;
  const temi = taux_marginal * 100;

  document.getElementById('resultat').innerText =
    `Revenu total : ${revenu_total.toFixed(2)} $, TEMI estimé : ${temi.toFixed(1)} %`;

  renderGraph(revenu_total, temi);
}

function renderGraph(revenu, temi) {
  const canvas = document.getElementById('temiChart');
  if (!canvas || typeof Chart === 'undefined') {
    alert("Erreur d'affichage du graphique.");
    return;
  }

  const ctx = canvas.getContext('2d');
  const ChartLib = Chart.Chart || Chart;

  if (window.temiChart) window.temiChart.destroy();

  window.temiChart = new ChartLib(ctx, {
    type: 'line',
    data: {
      labels: [0, revenu],
      datasets: [{
        label: 'TEMI (%)',
        data: [20, temi],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        pointBackgroundColor: 'white',
        pointRadius: 5,
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: 'white',
            font: { size: 14 }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `À ${context.label}$, TEMI: ${context.raw.toFixed(1)}%`;
            }
          }
        }
      },
      scales: {
        x: {
          ticks: { color: 'white' },
          title: { display: true, text: "Revenu", color: 'white' }
        },
        y: {
          beginAtZero: true,
          max: 60,
          ticks: { color: 'white' },
          title: { display: true, text: "TEMI (%)", color: 'white' }
        }
      }
    }
  });
}
