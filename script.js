// Données simulées : revenu de 20 000 $ à 150 000 $
const revenus = [];
const temi = [];
const impotTotal = [];

for (let r = 20000; r <= 150000; r += 5000) {
  revenus.push(r);
  let taux = r < 50000 ? 0.25 : r < 80000 ? 0.30 : r < 100000 ? 0.35 : r < 130000 ? 0.40 : 0.45;
  temi.push(taux * 100);
  impotTotal.push(r * taux);
}

const options = {
  chart: {
    height: 400,
    type: 'line',
    stacked: false,
    background: '#1e1e1e',
    foreColor: '#ffffff'
  },
  series: [
    {
      name: "TEMI (%)",
      type: "line",
      data: temi
    },
    {
      name: "Impôt total ($)",
      type: "column",
      data: impotTotal
    }
  ],
  stroke: {
    width: [4, 0],
    curve: 'smooth'
  },
  plotOptions: {
    bar: {
      columnWidth: "40%"
    }
  },
  fill: {
    type: ['solid', 'gradient'],
    gradient: {
      shade: 'dark',
      type: 'vertical',
      gradientToColors: ['#e53935'],
      stops: [0, 100]
    }
  },
  labels: revenus,
  xaxis: {
    title: {
      text: "Revenu ($)"
    }
  },
  yaxis: [
    {
      seriesName: "TEMI (%)",
      axisTicks: { show: true },
      axisBorder: {
        show: true,
        color: "#FF4560"
      },
      labels: {
        style: { colors: "#FF4560" },
        formatter: function (val) {
          return val.toFixed(0) + " %";
        }
      },
      title: {
        text: "TEMI (%)",
        style: { color: "#FF4560" }
      }
    },
    {
      seriesName: "Impôt total ($)",
      opposite: true,
      axisTicks: { show: true },
      axisBorder: {
        show: true,
        color: "#00E396"
      },
      labels: {
        style: { colors: "#00E396" },
        formatter: function (val) {
          return "$" + val.toFixed(0);
        }
      },
      title: {
        text: "Impôt total ($)",
        style: { color: "#00E396" }
      }
    }
  ],
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: function (val) {
        return typeof val === "number" ? val.toFixed(1) : val;
      }
    }
  }
};

const chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();
