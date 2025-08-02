
function calculerTEMI() {
    const emploi = parseFloat(document.getElementById("emploi").value) || 0;
    const reer = parseFloat(document.getElementById("reer").value) || 0;
    const dividende = parseFloat(document.getElementById("dividende").value) || 0;
    const interets = parseFloat(document.getElementById("interets").value) || 0;
    const gain = parseFloat(document.getElementById("gain").value) || 0;
    const cotisation = parseFloat(document.getElementById("cotisation").value) || 0;

    const revenu_brut = emploi + reer + dividende + interets + gain - cotisation;
    const temi = revenu_brut <= 50000 ? 30 :
                 revenu_brut <= 75000 ? 35 :
                 revenu_brut <= 100000 ? 40 :
                 revenu_brut <= 125000 ? 45 : 50;

    document.getElementById("resultat").innerText = 
        `Revenu total : ${revenu_brut.toFixed(2)} $, TEMI estimé : ${temi.toFixed(1)} %`;

    const revenus = Array.from({length: 250}, (_, i) => i * 1000);
    const temiSerie = revenus.map(r => {
        if (r <= 50000) return 30;
        else if (r <= 75000) return 35;
        else if (r <= 100000) return 40;
        else if (r <= 125000) return 45;
        else return 50;
    });
    const impotSerie = revenus.map(r => r * temiSerie[revenus.indexOf(r)] / 100);

    var options = {
        chart: { type: 'line', height: 350, zoom: { enabled: true } },
        series: [{
            name: 'TEMI (%)',
            type: 'line',
            data: temiSerie
        }, {
            name: 'Impôt total ($)',
            type: 'line',
            data: impotSerie
        }],
        xaxis: {
            categories: revenus,
            title: { text: "Revenu total ($)" }
        },
        yaxis: [{
            title: { text: "Impôt ($)" }
        }, {
            opposite: true,
            title: { text: "TEMI (%)" }
        }],
        annotations: {
            xaxis: [{
                x: revenu_brut,
                borderColor: '#FF4560',
                label: {
                    borderColor: '#FF4560',
                    style: { color: '#fff', background: '#FF4560' },
                    text: `Revenu actuel`
                }
            }]
        }
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
}
