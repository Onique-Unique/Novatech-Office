let downloadBtn = document.getElementById('download');
let deleteStorage = document.getElementById('deleteStorage');


//Populate the textual areas 
document.getElementById('name').innerText = JSON.parse(localStorage.getItem('userInfo')).fullName + ',';
document.getElementById('address').innerText = JSON.parse(localStorage.getItem('userInfo')).address + ',';
document.getElementById('city').innerText = JSON.parse(localStorage.getItem('userInfo')).city + ',';
document.getElementById('state').innerText = JSON.parse(localStorage.getItem('userInfo')).state;
const interestAmount = document.getElementById('interest').innerText = "$" + JSON.parse(localStorage.getItem('userInfo')).interest;
const encashAmount = document.getElementById('encashment').innerText = "-$" + JSON.parse(localStorage.getItem('userInfo')).encashment;
const transactFeeAmount = document.getElementById('transactFee').innerText = "-$" + JSON.parse(localStorage.getItem('userInfo')).transactFee;
const managementFeeAmount = document.getElementById('manageFee').innerText = "-$" + JSON.parse(localStorage.getItem('userInfo')).manageFee;

const table2InterestDisplay = JSON.parse(localStorage.getItem('userInfo')).interest;
const table2EncashDisplay = JSON.parse(localStorage.getItem('userInfo')).encashment;
const table2transDisplay = JSON.parse(localStorage.getItem('userInfo')).transactFee;
const table2manageDisplay = JSON.parse(localStorage.getItem('userInfo')).manageFee;

document.getElementById('portNo').innerText += ' ' + localStorage.getItem('yyyy') + Math.floor(100000 + Math.random() * 900000) + '-' + Math.floor(10000 + Math.random() * 90000);
document.getElementById('portPeriod').innerText += ' ' + localStorage.getItem('fromDate') + ' - ' + localStorage.getItem('toDate');

//document.getElementById('gain').innerText = '$' + localStorage.getItem('profit');
//document.getElementById('totalInv').innerText = '$' + localStorage.getItem('amtInvested');

let totalInv = localStorage.getItem('amtInvested');
let balance = localStorage.getItem('amtReturned');

var interestNumber = Number(table2InterestDisplay);
var encashNumber = Number(table2EncashDisplay); 
var feeNumber1 = Number(table2transDisplay);
var feeNumber2 = Number(table2manageDisplay);
var feeAdded = feeNumber1 + feeNumber2;

var closingValueMath = totalInv - encashNumber - feeAdded + interestNumber;
var closingBalanceMath = balance - encashNumber - feeAdded + interestNumber;
var closingValue = document.querySelectorAll(".closingValue");
var closingBalance = document.querySelectorAll(".closingBalance");
closingValue.forEach(closingVal => closingVal.innerText = "$" + closingValueMath);
closingBalance.forEach(closingBal => closingBal.innerText = "$" + closingBalanceMath)

let roi = localStorage.getItem('roi');
let profit = localStorage.getItem('profit');

// Portfolio Statement Return
document.getElementById('portReturn').innerText += ' ' + roi + '%';


//get elements of classes profit, balance, roi, totalInv and set the values 
let profitEls = document.querySelectorAll('.profit');
let balanceEls = document.querySelectorAll('.balance');
let roiEls = document.querySelectorAll('.roi');
let totalInvEls = document.querySelectorAll('.totalInv');
let totalIntEls = document.querySelector('.totalInt');
let totalEncEls = document.querySelector('.totalEnc');
let totalFeeEls = document.querySelector('.totalFee');

//Set the values 
profitEls.forEach(profitEl => profitEl.innerText = '$' + profit);
balanceEls.forEach(balanceEl => balanceEl.innerText = '$' + balance);
roiEls.forEach(roiEl => roiEl.innerText = '%' + roi);
totalInvEls.forEach(totalInvEl => totalInvEl.innerText = '$' + totalInv);
totalIntEls.innerText = "$" + interestNumber;
totalEncEls.innerText = "-$" + encashNumber
totalFeeEls.innerText = "-$" + feeAdded;

createDoughNut1();
createBarChart1();
createDoughNut2();

function createDoughNut1() {
    // const doughnutPercent = document.getElementById("doughnutPercent");
    // doughnutPercent.innerText = "%" + roi;
    pieChart = new Chart("doughNut1", {
        type: "doughnut",
        data: {
        labels: ['',''],
        datasets: [{
            backgroundColor: ['#53c68c',''],
            data: [roi , roi - roi ]
        }]
        },
        options: {

            title: {
                display: false,
                text: "Result"
            },
            responsive: true,
            maintainAspectRaio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        title: (context) => {
                            return `${context[0].label}`
                        },
                        label: (context) => {
                            return `$${context.parsed}`;
                        }
                    }
                },
                // legend: {
                //     labels: {
                //         boxWidth: 0
                //     }
                // },
                filter: function(item, data) {
                    var label = data.labels[item.index];
                    if (label) return item;
                  },
                  datalabels: {
                    formatter: (value, context) => {
                        if(value != 0) {
                            return `%` + `${roi}`;
                        }
                        else {
                            return '';
                        }
                    }
                }
            }
        },
        plugins: [ChartDataLabels],
    });
    
}

console.log(profit);

function createDoughNut2() {
    // const doughnutAmount = document.getElementById("doughnutAmount");
    // doughnutAmount.innerText = "$" + profit;
    pieChart = new Chart("doughNut2", {
        type: "doughnut",
        data: {
        labels: ['',''],
        datasets: [{
            backgroundColor: ['#ffcc80',''],
            data: [profit , profit - profit ]
        }]
        },
        options: {
            title: {
                display: false,
                text: "Result"
            },
            responsive: true,
            maintainAspectRaio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        title: (context) => {
                            return `${context[0].label}`
                        },
                        label: (context) => {
                            return `$${context.parsed}`;
                        }
                    }
                },
                // legend: {
                //     labels: {
                //         boxWidth: 0
                //     }
                // },
                datalabels: {
                    formatter: (value, context) => {
                        if(value != 0) {
                            return `$` + `${closingValueMath}`; 
                        }
                        else {
                            return '';
                        }
                    }
                }
            }
        },
        plugins: [ChartDataLabels]
    });
    
}

function createBarChart1() {
    barChart = new Chart("barChart1", {
        type: "bar",
        data: {
          labels: JSON.parse(localStorage.getItem('barX')),
          datasets: [
            {
                label: 'Total Principal',
                backgroundColor: '#0d0d0d',
                borderColor: 'rgba(97, 188, 109, .8)',
                data: JSON.parse(localStorage.getItem('principalY'))
            }, {
                label: 'Total Interest',
                backgroundColor: '#f2f2f2',
                borderColor: 'rgba(236, 107, 86, .8)',
                data: JSON.parse(localStorage.getItem('gainY'))
            }
            ]
        },
        options: {
            legend: {display: false},
            title: {
              display: true,
              text: "Balance By Year"
            },
            responsive: true,
            maintainAspectRaio: false,
            interaction: {
                intersect: false,
                mode: 'index',
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            return `${context.dataset.label}: $${context.raw}`
                        },
                        footer: (context) => {
                            return `Total: $${(context[0].raw + context[1].raw)}`
                        }
                    }
                },
                datalabels: {
                    formatter: (value, context) => {
                        if(value == 0 || context.dataset.label == 'Total Principal') { return ''; }
                        else { return `$${value}` } 
                    }
                }
            },
            scales: {
                yAxes: {
                    ticks: {
                        beginAtZero: true
                    },
                    stacked: true
                },
                xAxes: {
                    stacked: true,
                }
            }
          },
          plugins: [ChartDataLabels]
      });
}

//pdf options setup
/*const options = {
    margin: 0.1,
    filename: 'statement.pdf',
    image: { 
      type: 'jpeg', 
      quality: 1
    },
    html2canvas: { 
      letterRendering: true, 
      useCORS: true,     
      logging: true,  
      scale: 4 
    },
    jsPDF: { 
      format: 'a4', 
    }
  }*/


//Download the statement - only that element 
downloadBtn.addEventListener('click', (e) => {
    //download should happen for the entire page here 
    e.preventDefault();
    /*const printElement = document.getElementById('statement');
    console.log(printElement);
    html2pdf().from(printElement).set(options).save();*/

    // window.print();
});

//Delete storage 
deleteStorage.addEventListener('click', () => {
    localStorage.clear();
    window.location = '/statement-generate/index';
});