
function calculer() {
  const statut = document.getElementById("statut").value;
  const enfants = document.getElementById("enfants").value;
  const emploi = parseFloat(document.getElementById("emploi").value) || 0;
  const fichier = `data/${statut}_${enfants}enf_emploi.json`;

  fetch(fichier)
    .then(res => res.json())
    .then(data => {
      document.querySelector("#chart").innerHTML = ""; // Nettoyage
      const revenu = data.revenu;
      const temi = data.temi;
      const impots = data.impot;

      const options = {
        chart: {
          height: 450,
          type: 'line',
          zoom: { enabled: true }
        },
        series: [{
          name: 'TEMI (%)',
          type: 'line',
          data: temi
        }, {
          name: 'Impôt total ($)',
          type: 'line',
          data: impots
        }],
        xaxis: {
          categories: revenu,
          title: { text: "Revenu brut ($)" }
        },
        yaxis: [{
          title: { text: 'TEMI (%)' }
        }, {
          opposite: true,
          title: { text: 'Impôt total ($)' }
        }],
        annotations: {
          xaxis: [{
            x: emploi,
            borderColor: '#00E396',
            label: {
              style: { color: "#fff", background: "#00E396" },
              text: "Votre revenu"
            }
          }]
        }
      };

      const chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render();
    })
    .catch(err => {
      alert("Fichier non trouvé ou erreur de chargement");
      console.error(err);
    });
}
