
function calculer() {
  const revenu = parseFloat(document.getElementById("emploi").value) || 0;
  const ree = parseFloat(document.getElementById("reer").value) || 0;
  const dividendes = parseFloat(document.getElementById("dividendes").value) || 0;
  const interets = parseFloat(document.getElementById("interets").value) || 0;
  const gains = parseFloat(document.getElementById("gains").value) || 0;
  const cotisation = parseFloat(document.getElementById("cotisation").value) || 0;

  const total = revenu + ree + dividendes + interets + gains - cotisation;
  const dataX = [];
  const dataY1 = [];
  const dataY2 = [];

  for (let i = 0; i <= 250000; i += 1000) {
    dataX.push(i);
    let impots = i * 0.3; // simplifié
    let temi = (impots / i) * 100;
    dataY1.push(parseFloat(temi.toFixed(1)));
    dataY2.push(parseFloat(impots.toFixed(0)));
  }

  const options = {
    chart: {
      height: 400,
      type: 'line',
      zoom: { enabled: true }
    },
    series: [{
      name: 'TEMI (%)',
      type: 'line',
      data: dataY1
    }, {
      name: 'Impôt total ($)',
      type: 'line',
      data: dataY2
    }],
    xaxis: {
      categories: dataX,
      title: { text: "Revenu brut ($)" }
    },
    yaxis: [{
      title: { text: 'TEMI (%)' },
    }, {
      opposite: true,
      title: { text: 'Impôt total ($)' }
    }],
    annotations: {
      xaxis: [{
        x: total,
        borderColor: '#FEB019',
        label: {
          style: { color: "#fff", background: "#FEB019" },
          text: "Votre revenu"
        }
      }]
    }
  };

  const chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();
}
