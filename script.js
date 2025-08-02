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
  if (window.temiChart) window.temiChart.destroy();

  const ChartLib = Chart.Chart || Chart; // pour compatibilité UMD vs global
  window.temiChart = new ChartLib(ctx, {
    type: 'line',
    data: {
      labels: [0, revenu],
      datasets: [{
        label: 'TEMI (%)',
        data: [20, temi],
        borderColor: 'red',
        tension: 0.3
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 60
        }
      }
    }
  });
}
