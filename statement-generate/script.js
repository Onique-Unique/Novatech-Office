let form = document.getElementById('form');
let amt_invested = document.getElementById('amt_invested');
let amt_returned = document.getElementById('amt_returned');
let yearsInput = document.getElementById('years');
let values = []; 
let tableEls = document.querySelectorAll('.tableEls');
let dateChoice = 1; //1 is for date picker and 2 is for length input and the program will change how it gets the 'years' value accordingly - 1 is default 
let years = 5; //default value 

let ROI = ((amt_returned.value - amt_invested.value) / amt_invested.value) * 100, yearlyInterest = 0;

//Generate button - user form and submit button 
let userForm = document.getElementById('userForm');
let userSubmit = document.getElementById('userSubmit');

let userInputs = document.querySelectorAll('#userForm .info');

let userValues = {};

console.log(amt_returned.value);
console.log(localStorage.getItem('amtReturned'));

//set default from and to dates 
let fromDate = document.getElementById('fromDate');
let toDate = document.getElementById('toDate');
const today = new Date();
const yyyy = today.getFullYear();
const yyyy1 = yyyy + 5;
let mm = today.getMonth() + 1;
let dd = today.getDate();
if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;
fromDate.value = mm + '/' + dd + '/' + yyyy;
toDate.value = mm + '/' + dd + '/' + yyyy1;

//Set the initial x (always constant), y and bar color (constant) values for the pie chart
let pieX = ["Invested", "Profit"];
let pieY = [amt_invested.value,amt_returned.value - amt_invested.value];
let pieColors = [
  "#ffffff",
  '#3333ff'
];

let barChart, pieChart;

//bar chart values 
let barX = ["Now", "Year 1", "Year 2", "Year 3", "Year 4", "Year 5"];
let principalY = [1000,1000,1000,1000,1000,1000];
let gainY = [0,148.7,319.51,515.72,741.11,1000.01];
//let barColors = ["red", "green","blue","orange","brown","yellow"];

//pie chart with the default values
createPieChart();
//bar chart with default values
createBarChart();


//Radio buttons on change event - to show the date picker or date input 
let dateRadio = document.getElementsByName('yearsPick');
for(let i=0; i < dateRadio.length; i++) {
    dateRadio[i].addEventListener('click', () => {
        if(dateRadio[i].checked) {
            if(dateRadio[i].value == 'dateChoice') {
                document.getElementById('useDates').classList.remove('hidden');
                document.getElementById('useLength').classList.add('hidden');
                dateChoice = 1;
            }

            else {
                document.getElementById('useDates').classList.add('hidden');
                document.getElementById('useLength').classList.remove('hidden');
                dateChoice = 2;
            }
        }
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    //Rest values on a resubmit 
    values = [];
    barX = [];
    principalY = [];
    gainY = [];

    //Push all the values - get the profit value first 
    values.push(amt_returned.value - amt_invested.value);

    //calculate the number of years 
    //date picker 
    if(dateChoice == 1) {

        let fromArray = fromDate.value.split('/'); //split the string so only the numbers of month, date and years will be left in the array for a date of this format Month/Date/Year
        let toArray = toDate.value.split('/');
        let yearsDiff = Number(toArray[2]) - Number(fromArray[2]); //find the difference in number of years first
        let monthsDiff = (yearsDiff * 12) + (Number(toArray[0]) - Number(fromArray[0]));
        years = (monthsDiff / 12).toFixed(2);
    }
    //length input 
    else {
        years = yearsInput.value;
    }

    //Calculate the ROI
    ROIBefore = ((amt_returned.value - amt_invested.value) / amt_invested.value) * 100;
    ROI = Math.round(ROIBefore * 10) / 10;
    yearlyInterest = (Math.pow((amt_returned.value / amt_invested.value), (1/years)) - 1) * 100;
    values.push(ROI); //2nd value to push - ROI
    //Calculate the yearly ROI
    yearlyInterest = yearlyInterest.toFixed(2);
    values.push(yearlyInterest); //3rd value to push - yearly ROI
    //set the y values for the pie chart
    pieY = [amt_invested.value,amt_returned.value - amt_invested.value];
    values.push(years); //last value to push - number of years

    //Populate the table 
    for(let i=0; i<values.length; i++) {
        switch(i) {
            case 0: tableEls[i].innerHTML = `$${values[i]}`;
                    break;
            case 1: tableEls[i].innerHTML = `${values[i]}%`;
                    break;
            case 2: tableEls[i].innerHTML = `${values[i]}%`;
                    break;
            case 3: tableEls[i].innerHTML = `${values[i]} years`;
                    break;
        }
    }

    //update pie chart
    pieChart.data.datasets[0].data = pieY;
    pieChart.tool
    pieChart.update();

    //Populate bar chart values based on number of years, principal and calculated yearly ROI
    let principal = 0;
    let newPrincipal = 0;
    let gain = 0;
    for(let i=0; i <= years; i++) {

        if(i == 0) {
            principal = amt_invested.value;
            barX.push('Now');
            principalY.push(principal);
            gainY.push(gain);
        }
        else {
            newPrincipal = ((principal * (yearlyInterest/100)) + Number(principal)).toFixed(2);
            gain = (newPrincipal - amt_invested.value).toFixed(2);
            principal = newPrincipal;
            barX.push(`Year ${i}`);
            principalY.push(amt_invested.value);
            gainY.push(gain);
        }
    }
    
    //if number is a floating number, add another year
    if(!Number.isInteger(years)) {
        let floatVal = years - Math.floor(years); //so, calculate the principal for only the remaining number of months left 
        newPrincipal = ((principal * ((yearlyInterest * floatVal)/100)) + Number(principal)).toFixed(2);
        if(newPrincipal !== principal) {
            gain = (newPrincipal - amt_invested.value).toFixed(2);
            principal = newPrincipal;
            barX.push(`Year ${Math.floor(years) + 1}`);
            principalY.push(amt_invested.value);
            gainY.push(gain);
        }
    }
    //update bar chart with new values
    barChart.data.labels = barX;
    barChart.data.datasets[0].data = principalY;
    barChart.data.datasets[1].data = gainY;
    barChart.update();
});

function createPieChart() {
    //Pie chart
    pieChart = new Chart("pieChart", {
        type: "pie",
        data: {
        labels: pieX,
        datasets: [{
            backgroundColor: pieColors,
            data: pieY
        }]
        },
        options: {
            title: {
                display: true,
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
                datalabels: {
                    formatter: (value, context) => {
                        const datapoints = context.chart.data.datasets[0].data;
                        function totalSum(total, datapoint) {
                            return total + datapoint;
                        }
                        const totalValue = datapoints.reduce(totalSum,0);
                        const percentageValue = ((value / totalValue) * 100).toFixed(1);
                        return `$${value}\n${percentageValue}%`
                    }
                }
            }
        },
        plugins: [ChartDataLabels]
    });
}

function createBarChart() {
    barChart = new Chart("barChart", {
        type: "bar",
        data: {
          labels: barX,
          datasets: [
            {
                label: 'Total Principal',
                backgroundColor: '#0d0d0d',
                borderColor: 'rgba(97, 188, 109, .8)',
                data: principalY
            }, {
                label: 'Total Interest',
                backgroundColor: '#f2f2f2',
                borderColor: 'rgba(236, 107, 86, .8)',
                data: gainY
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


//User form submission 
userSubmit.addEventListener('click', () => {
    //get all the user details and put it inside userValues object 
    userValues = {
        fullName: userInputs[0].value,
        address: userInputs[1].value,
        city: userInputs[2].value,
        state: userInputs[3].value,
        interest: userInputs[4].value,
        encashment: userInputs[5].value,
        transactFee: userInputs[6].value,
        manageFee: userInputs[7].value
    }

    localStorage.setItem('roi', ROI);
    localStorage.setItem('yyyy', yyyy);
    localStorage.setItem('userInfo', JSON.stringify(userValues));

    localStorage.setItem('amtInvested', amt_invested.value);
    localStorage.setItem('amtReturned', amt_returned.value);
    localStorage.setItem('profit', amt_returned.value - amt_invested.value);

    //Pie chart info
    localStorage.setItem('pieX', JSON.stringify(pieX));
    localStorage.setItem('pieY', JSON.stringify(pieY));
    localStorage.setItem('pieColors', JSON.stringify(pieColors));

    //Bar chart info 
    localStorage.setItem('barX', JSON.stringify(barX));
    localStorage.setItem('principalY', JSON.stringify(principalY));
    localStorage.setItem('gainY', JSON.stringify(gainY));

    //data info 
    localStorage.setItem('fromDate',fromDate.value);
    localStorage.setItem('toDate',toDate.value);

    window.location.href="to-PDF/statement";

    

});