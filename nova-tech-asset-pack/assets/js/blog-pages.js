// Cookie Settings
document.cookie = "AC-C=ac-c;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;SameSite=None;Secure";

let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
  searchIcon.classList.remove('fa-times');
  searchForm.classList.remove('active');
}

let searchIcon = document.querySelector('#search-icon');
let searchForm = document.querySelector('.search-form');

searchIcon.onclick = () =>{
  searchIcon.classList.toggle('fa-times');
  searchForm.classList.toggle('active');
  menu.classList.remove('fa-times');
  navbar.classList.remove('active');
}

window.onscroll = () =>{
  menu.classList.remove('fa-times');
  navbar.classList.remove('active');
  searchIcon.classList.remove('fa-times');
  searchForm.classList.remove('active');
}

// Accordion Script
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}

// Advisory Notice For Affiliate
const advisoryNotice = document.getElementById("advisory");
const advisoryText = document.getElementById("advisory-text");

if(advisoryNotice){
  advisoryNotice.addEventListener("click", () => {
    advisoryText.classList.toggle("hide");
  });
};

// Related Links
const relatedContainer = document.getElementById("related-link-list");
const relatedLinks = document.getElementById("related-links");
const relatedLinksAlt = document.getElementById("related-links-alt");
const relatedContainerAlt = document.getElementById("top-picks-list");
if(relatedLinks){
  relatedLinks.addEventListener("click", () => {
    relatedContainer.classList.toggle("hide");
  });
};

if(relatedLinksAlt){
  relatedLinksAlt.addEventListener("click", () => {
    relatedContainerAlt.classList.toggle("hide");
  });
};

// Share Button script
const shareBtn = document.getElementById("share-btn");
const shareTitle = document.getElementById("share-title").textContent;
const shareDescription = document.getElementById("share-description").textContent;
function shareList() {
    if (navigator.canShare) {
        navigator.share({
            title: shareTitle,
            text: shareDescription,
            url: window.location.href,
        });
    } else {
        // Desktop Functionality
    }
};

shareBtn.addEventListener("click", () => {
    shareList();
});

// Affiliate Link stored in variable
const goToAffiliateLink = "https://a2961hy2m508lpsw5akb-tpufn.hop.clickbank.net";

// Affiliate Shopping Chat Notification Bot
setTimeout( () => {
  // Create shopping container div to be positioned at end of page
  let shoppingCartContainer = document.createElement('div');
  shoppingCartContainer.className = 'shopping-cart-container';
  shoppingCartContainer.style.width = "100%";
  shoppingCartContainer.style.position = 'fixed';
  shoppingCartContainer.style.bottom = '20px';
  shoppingCartContainer.style.cursor = 'pointer';
  shoppingCartContainer.style.zIndex = '99999999';

  // Design and create the shopping cart element and style
  let shoppingCart = document.createElement('div');
  shoppingCart.className = 'shopping-cart';
  shoppingCart.style.position = "absolute";
  shoppingCart.style.right = '10px';
  shoppingCart.style.bottom = '50px';
  shoppingCart.style.width = '60px';
  shoppingCart.style.height = '60px';
  shoppingCart.style.borderRadius = '100%';
  shoppingCart.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
  shoppingCart.style.padding = '20px';
  shoppingCart.style.background = '#fff';
  shoppingCart.style.fontSize = '16px';

  // When shopping cart is clicked go to link
  shoppingCart.addEventListener("click", () => {
    document.location.href = `${goToAffiliateLink}`;
  });

  // Adding the shopping icon with style
  let shoppingCartIcon = document.createElement('div');
  shoppingCartIcon.innerHTML = `<i class="fa-solid fa-dollar-sign"></i>`;
  shoppingCartIcon.style.fontSize = "4rem";
  shoppingCartIcon.style.position = "absolute";
  shoppingCartIcon.style.top = "50%";
  shoppingCartIcon.style.left = "50%";
  shoppingCartIcon.style.transform = "translate(-50%, -50%)";
  shoppingCartIcon.style.color = "#2ea22e";
  shoppingCartIcon.style.textShadow = "2px 2px black";

  // Appending the elements
  shoppingCart.appendChild(shoppingCartIcon);
  shoppingCartContainer.appendChild(shoppingCart);

  // Create the notification display elements and design
  let notification = document.createElement('div');
  notification.className = 'shopping-cart__notification';
  notification.style.position = 'absolute';
  notification.style.bottom = '115px';
  notification.style.right = '20px';
  notification.style.padding = '1px 5px';
  notification.style.fontSize = '11px';
  notification.style.borderRadius = '0 5px 0 0';
  notification.style.color = '#fff';
  notification.style.background = '#3F51B5';
  notification.style.textAlign = 'center';
  notification.style.zIndex = '99999999';

  // Create notification text area to display
  let notificationText = document.createElement('span');
  notificationText.innerHTML = 'Our secret wealth growth strategy!';

  // Append elements
  notification.appendChild(notificationText);
  shoppingCartContainer.appendChild(notification);
  document.body.appendChild(shoppingCartContainer);

  // Start the timer
  setInterval(function() {
      // Create random notification message
      
      let messages = [ "Earn more on financial investments!", "Maximize your returns fast!", "Join successful investors today!", "Make informed investment decisions!", "Expert investment strategies available!", "Learn what we do!", "Build your portfolio from $0!", "Expert guidance for diversified portfolio!", "Grow your wealth with this!", "Make the most of your investments!", "Advanced financial planning!", "Start earning passively!", "Easy-to-use investment platform!", "Exclusive investment opportunities!", "Learn to succeed in investing!", "Join like-minded investors!", "Investment like an expert!", "Expert guide for confident investing!", "Build a solid financial future!", "Take control of your wealth!", "Invest with confidence!", "Expert investment strategies at your fingertips!", "Invest in your financial future!", "Maximize your returns!", "Join a community of successful investors!", "Take control of your wealth today!", "More money - No problem!", "Our secret strategy!",];
      let randomMessage = messages[Math.floor(Math.random() * messages.length)];
      // Update the notification text
      document.querySelector('.shopping-cart__notification span').innerHTML = randomMessage;
  }, 10000);

  // Shopping cart animation to correspond with text change timing
  shoppingCartContainer.addEventListener('animationend', () => {
    shoppingCartContainer.classList.remove('wiggle');
  });

  setInterval(function() {
    shoppingCartContainer.classList.add('wiggle');
  }, 10000);
}, 1500);

// Onpage Popup 
const userSearch = document.getElementById("main-post-1").innerText;
let popup = document.createElement('div');
popup.className = 'popup';

let popupContent = document.createElement('div');
popupContent.className = 'popup-content';

let popupInnerContent = document.createElement('div');
popupInnerContent.className = 'popup-inner-content';

let h3 = document.createElement('h3');
let h3Text = document.createTextNode('Hurry!!');
h3.appendChild(h3Text);

let h4Secondary = document.createElement('h4');
h4Secondary.style.fontSize = "1.6rem";
h4Secondary.innerHTML = `<span id="span-head">Grow Your Wealth!</span> See what we use to maximise profits and make generous returns.`;

let p = document.createElement('p');
let pText = document.createTextNode('Go quick and start making wealth without restriction or timeline..');
p.appendChild(pText);

let popupURLBtn = document.createElement('button');
popupURLBtn.className = "popup-btn";
let btnText = document.createTextNode('Take Me There');
popupURLBtn.appendChild(btnText);
popupURLBtn.onclick = gotoURL;

let exitPopup = document.createElement("div");
exitPopup.className = "exit-popup";
exitPopup.innerHTML = `<i class="fa-regular fa-circle-xmark"></i>`;
popupContent.appendChild(exitPopup);
exitPopup.onclick = closePopup;

popupInnerContent.appendChild(h3);
popupInnerContent.appendChild(h4Secondary);
popupInnerContent.appendChild(p);
popupInnerContent.appendChild(popupURLBtn);

popupContent.appendChild(popupInnerContent);
popup.appendChild(popupContent);

document.body.appendChild(popup);
let showPopup = true;

function closePopup() {
  document.getElementsByClassName('popup')[0].style.display = 'none';
  showPopup = false;
  document.querySelector(".main-section").classList.remove("popup-blur");
}

function gotoURL() {
  document.location.href = `${goToAffiliateLink}`;
}

document.onscroll = function () {
  if (window.scrollY > (window.innerHeight * 2) && showPopup) {
    document.getElementsByClassName('popup')[0].style.display = 'block';
    document.querySelector(".main-section").classList.add("popup-blur");
  }
};

let timer = setInterval(function () {
  if (showPopup == false) {
    showPopup = true;
    document.getElementsByClassName('popup')[0].style.display = 'block';
  }
}, 30000);

// Affiliate Onpage Promo Banner

// Get all h2 elements on the page
let h2Elements = document.querySelectorAll('h2');
   
// Loop through all h2 elements
h2Elements.forEach((h2Element, index) => {
// Skip the first and last h2 elements
        if (index === 0 || index === h2Elements.length - 1) {
            return;
        }

    // Generate a random number between 0 and 1
    let randomNumber = Math.random();

    // Create the mini-banner div element
    let miniBannerDiv = document.createElement('div');
    miniBannerDiv.className = 'mini-banner aff-banner';
    miniBannerDiv.style.transform = 'scale(.8)';
    miniBannerDiv.style.transition = 'transform 0.5s ease';

    // Create the link element
    let link = document.createElement('a');
    link.href = `${goToAffiliateLink}`;
    link.target = '_blank';
    link.rel = 'nofollow';

    // Create the button element
    let button = document.createElement('button');
    button.className = 'mini-banner-btn aff-banner-btn';

    // Create the text element
    let text = document.createElement('p');
    text.className = 'mini-banner-text';
    text.innerHTML = 'How We Make Money - <br> $ For You!';
    text.style.fontSize = "1.6rem";
    // Create the icon element
    let icon = document.createElement('i');
    icon.className = 'fa-solid fa-circle-chevron-right';

    // Append the text and icon to the button
    button.appendChild(text);
    button.appendChild(icon);

    // Append the button to the link
    link.appendChild(button);

    // Append the link to the mini-banner div
    miniBannerDiv.appendChild(link);

    // If the index of the h2 element is 1 (second h2)
    // and the h2 element does not have an id of 'main-post-3'
    // then place the div above the h2
    if (index === 1 && h2Element.id !== 'main-post-3') {
        h2Element.parentNode.insertBefore(miniBannerDiv, h2Element);
    } 

    // If the index of the h2 element is greater than 1
    // and the h2 element does not have an id of 'main-post-3'
    // and the random number is greater than 0.5
    // then place the div below the h2
    if (index > 1 && h2Element.id !== 'main-post-3' && randomNumber > 0.5) {
        h2Element.parentNode.insertBefore(miniBannerDiv, h2Element.nextSibling);
    }

    // Add an event listener for when the mini-banner div comes into view
    // When the div comes into view, scale it up to 1.2
    window.addEventListener('scroll', () => {
        if (isInViewport(miniBannerDiv)) {
            miniBannerDiv.style.transform = 'scale(1)';
        } else {
            miniBannerDiv.style.transform = 'scale(.8)';
        }
    });
});

// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Exit Intent Modal Detect

 // Get the current mouse position
 let mouseX;
 let mouseY;
 
 // Create the exit intent modal
 let exitIntentModal = document.createElement('div');
 exitIntentModal.classList.add('exit-intent-modal');
 document.body.appendChild(exitIntentModal);
 
 // Add the modal content
     let modalContent = `
     <div class="modal-div-container">
         <h2>Wait! Before You Go...</h2>
         <p>We know you're about to leave, but before you go, take a look at this!</p>
         <div class="special-offer">
             <h3>$$ Make money $$<br> Like we do!</h3>
             <p><strong>Grow Your Wealth</strong> - Learn our strategies, by visiting any of our links on page to secure your financial growth.</p>
         </div>
         <button class="close-modal-btn">Close</button>
     </div>`
     exitIntentModal.innerHTML = modalContent;
 
 // Listen for mouse movement
 document.addEventListener('mousemove', (e) => {
   mouseX = e.clientX;
   mouseY = e.clientY;
   // Check if the mouse is near the header element
   if (mouseY < document.querySelector('header').offsetHeight) {
     // Trigger custom action
     exitIntentModal.style.display = 'block';
   } else {
     exitIntentModal.style.display = 'none';
   }
 });
 
 // Listen for close modal button click
 document.querySelector('.close-modal-btn').addEventListener('click', () => {
 exitIntentModal.remove();
 });

//  Highlght text when in view onpage
 // Get all elements with text content
const elementsWithTextContent = document.querySelectorAll('h2, li, p');

// Add event listener to window
window.addEventListener('scroll', function() {
  // Loop through each element
  elementsWithTextContent.forEach(element => {
    // Get element's position relative to the viewport
    const elementPosition = element.getBoundingClientRect();

    // When element is out of view
    if (elementPosition.top < 0 || elementPosition.bottom > window.innerHeight) {
      const initialOpacity = 0.4;
      element.style.transition = 'opacity 0.5s';
      element.style.opacity = initialOpacity;
    }

    // When element is in view
    else if (elementPosition.top > 0 && elementPosition.bottom < window.innerHeight) {
      const fullOpacity = 1;
      element.style.transition = 'opacity 0.5s';
      element.style.opacity = fullOpacity;
    }
  });
});

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