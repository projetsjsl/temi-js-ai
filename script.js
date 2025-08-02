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

  renderApexChart(revenu_total, temi);
}

function renderApexChart(revenu, temi) {
  const options = {
    chart: {
      type: 'line',
      height: 350,
      background: '#1e1e1e',
      foreColor: '#ffffff'
    },
    series: [{
      name: 'TEMI (%)',
      data: [20, temi]
    }],
    xaxis: {
      categories: [0, revenu],
      title: { text: 'Revenu ($)' }
    },
    yaxis: {
      min: 0,
      max: 60,
      title: { text: 'TEMI (%)' }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        gradientToColors: ['#e53935'],
        stops: [0, 100]
      }
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    markers: {
      size: 5
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `${val.toFixed(1)} %`
        }
      }
    }
  };

  if (window.temiChart) {
    window.temiChart.updateOptions(options);
  } else {
    window.temiChart = new ApexCharts(document.querySelector("#chart"), options);
    window.temiChart.render();
  }
}
