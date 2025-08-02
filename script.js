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

  renderApexCourbeComplete();
}

function renderApexCourbeComplete() {
  const xData = [];
  const yData = [];

  for (let i = 0; i <= 150000; i += 1000) {
    let taux;
    if (i < 50000) taux = 0.25;
    else if (i < 80000) taux = 0.30;
    else if (i < 100000) taux = 0.35;
    else if (i < 130000) taux = 0.40;
    else taux = 0.45;
    xData.push(i);
    yData.push(taux * 100);
  }

  const options = {
    chart: {
      type: 'line',
      height: 350,
      background: '#1e1e1e',
      foreColor: '#ffffff'
    },
    series: [{
      name: 'TEMI (%)',
      data: yData
    }],
    xaxis: {
      categories: xData,
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
      size: 4
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
