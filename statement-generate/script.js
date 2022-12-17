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

// Protect Page from unwanted content stealing, plagiarism etc such as copying content or inspect element...
// Create error message box and design
let errorMessage = document.createElement('div');
errorMessage.className = 'error-message';
errorMessage.style.background = 'ghostwhite';
errorMessage.style.color = 'red';
errorMessage.style.padding = '10px';
errorMessage.style.position = 'fixed';
errorMessage.style.top = '50%';
errorMessage.style.left = '50%';
errorMessage.style.transform = 'translate(-50%, -50%)';
errorMessage.style.borderRadius = '5px';
errorMessage.style.zIndex = '2';
errorMessage.style.fontSize = '1.2rem';
errorMessage.style.display = 'none';
errorMessage.style.textAlign = "center";
errorMessage.style.minWidth = "280px";
errorMessage.innerText = 'Not Allowed: This page is protected!';
document.body.style.userSelect = "none";
document.body.style.WebkitUserSelect = "none";
document.body.style.msUserSelect = "none";
document.body.style.oUserSelect = "none";
document.body.appendChild(errorMessage);

// Detect attempts to copy any text on page
document.addEventListener('copy', event => {
  // Block the copy event and display error message
  errorMessage.style.display = 'block';
    setTimeout(function(){
      errorMessage.style.display = 'none';
    }, 1000);
  event.preventDefault();
});

// Listen for right click on page then display error message
document.addEventListener("contextmenu", function(event) {
	errorMessage.style.display = 'block';
  setTimeout(function(){
    errorMessage.style.display = 'none';
  }, 1000);
	event.preventDefault();
});

// Find all text elements on page excluding anchor tags, images etc, listen for mousedown/ long press then display error message
let textElements = document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6');

for (let i = 0; i < textElements.length; i++) {
	textElements[i].addEventListener("mousedown", function(event) {
		if (event.target.tagName != "a") {
			event.preventDefault();
		}
	});
}

// Listen for keyboard control A or control C or control U or control shift J or control shift I or F12 on page then display error message
document.addEventListener("keydown", function(event) {
	if (event.ctrlKey && event.keyCode == 65 || event.ctrlKey && event.keyCode == 67 || event.ctrlKey && event.shiftKey && event.keyCode == 74 || event.ctrlKey && event.keyCode == 85 || event.keyCode == 123 || event.ctrlKey && event.shiftKey && event.keyCode == 73) {
		errorMessage.style.display = 'block';
    setTimeout(function(){
      errorMessage.style.display = 'none';
    }, 1000);
		event.preventDefault();
	}
});

// Check every 1 second if body user select has been removed then run the following function:
setInterval(function(){
  if (document.body.style.userSelect !== "none") {
    document.body.style.display = "none";
    window.location.reload();
    alert("Really?! - You are attempting to do something that is not allowed!");
  }
}, 1000);

// Free tries statement generator over
// Create a popup element when user free tries have surpassed 3 to generate statement
let popupElement = document.createElement("div");
popupElement.setAttribute("id", "popup");
popupElement.style.position = "fixed";
popupElement.style.top = "50%";
popupElement.style.left = "50%";
popupElement.style.transform = "translate(-50%, -50%)";
popupElement.style.backgroundColor = "#ffffff";
popupElement.style.padding = "20px";
popupElement.style.borderRadius = "5px";
popupElement.style.zIndex = "99999";
popupElement.style.minWidth = "350px";
popupElement.style.visibility = "hidden";

// Create a message element
let messageElement = document.createElement("p");
messageElement.innerText = "You have used all your free tries. Pay $1.99 to continue!";
messageElement.style.fontWeight = "bold";
messageElement.style.marginTop = "10px";

// Create a close button
let closeButtonElement = document.createElement("div");
closeButtonElement.innerHTML = `<i class="fa-regular fa-circle-xmark"></i>`;
closeButtonElement.style.padding = "5px 10px";
closeButtonElement.style.position = "absolute";
closeButtonElement.style.top = "0";
closeButtonElement.style.right = "2%";
closeButtonElement.addEventListener("click", function() {
    popupElement.style.visibility = "hidden";
    document.getElementById("userInfoModal").classList.remove("background-filter");
});

// Create a continue button
let continueButtonElement = document.createElement("div");
continueButtonElement.style.textAlign = "center";
continueButtonElement.innerHTML = `
    <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
    <input type="hidden" name="cmd" value="_s-xclick">
    <input type="hidden" name="hosted_button_id" value="AFAYJVCWWRYDL">
    <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_paynowCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
    <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
    </form>

`;

// Create a price element
let priceElement = document.createElement("span");
priceElement.innerText = "$1.99";
priceElement.style.color = "#ff0000";
priceElement.style.fontWeight = "bold";
priceElement.style.margin = "0 20px";

// Append all the elements to the popup
popupElement.appendChild(messageElement);
popupElement.appendChild(priceElement);
popupElement.appendChild(closeButtonElement);
popupElement.appendChild(continueButtonElement);

// Append the popup to the body
document.body.appendChild(popupElement);


//User form submission 
userSubmit.addEventListener('click', () => {
    // Check if localStorage has a counter, if not, create it
    if (!localStorage.getItem("freeTriesCounter")) {
        localStorage.setItem("freeTriesCounter", 0);
    }

    // Increment the counter
    let counter = parseInt(localStorage.getItem("freeTriesCounter"));
    localStorage.setItem("freeTriesCounter", counter + 1);

    // Check if the counter is 3, if yes, display a popup
    if (counter >= 3) {
        document.getElementById("userInfoModal").classList.add("background-filter");
        popupElement.style.visibility = "visible";
    }

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

    // Check if the counter is less than 3, if yes go to location
    if (counter < 3) {
        window.location.href="to-PDF/statement";
    }    

});