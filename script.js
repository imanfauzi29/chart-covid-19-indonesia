$(document).ready(function(){
  function covid(url) {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": url,
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
        "x-rapidapi-key": "e6a49aea13msh66ea6553b3ec58dp104bbbjsnf505ca16853e"
      }
    }

    return settings;
  }



  // chart
  function chart(confirmed, recovered, deaths, newKasus, newDead) {
    var ctx = document.getElementById('myChart');

    var dataChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Positif', 'Sembuh', 'Meninggal'],
        datasets: [{
          label: 'DATA COVID-19',
          data: [confirmed, recovered, deaths],
          data2: [newKasus, 0, newDead],
          backgroundColor: [
            'rgba(255, 206, 86, 0.4)', //Yellow
            'rgba(109, 193, 75, 0.4)', //Green
            'rgba(255, 99, 132, 0.4)' //red
          ],
          borderColor: [
            'rgba(255, 206, 86, 1)',
            'rgba(77, 193, 75, 1)',
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        animation: {
          easing: 'linear'
        },
        tooltips: {
          callbacks: {
            afterLabel: function(tooltipItem, data) {

              let index, cases;
              index = tooltipItem.index;
              cases = data.datasets[tooltipItem.datasetIndex].data2[index];

              if (cases > 0) {
                return 'Meningkat: ' + cases;
              }

            }
          }
        },
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 12,
            fontSize: 16
          }
        }
      }
    });
  }

  // mengambil semua data negara (option list)

  url = "https://covid-193.p.rapidapi.com/statistics?country=indonesia";

  $.ajax(covid(url)).done(function(result) {
    let response = result.response;
    $.each(response, function(i, data) {
      let kasus, sembuh, meninggal;
      kasus = data.cases.active;
      newKasus = data.cases.new;
      sembuh = data.cases.recovered;
      meninggal = data.deaths.total;
      newDead = data.deaths.new;
      chart(kasus, sembuh, meninggal, newKasus, newDead);
    })
  });

})
