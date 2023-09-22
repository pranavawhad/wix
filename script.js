console.log("shopifyrun")


const shopName = document.getElementById('shopNamePlaceholder').innerText;
const shopEmail = document.getElementById('shopEmailPlaceholder').innerText;
const shopDomain = document.getElementById('shopDomainPlaceholder').innerText;
console.log('Shop Name:', shopName);
console.log('Shop Email:', shopEmail);
console.log('Shop Domain:', shopDomain);

fetch('https://api.ipify.org?format=json')
.then(response => response.json())
.then(data => {
         userIPAddress = data.ip;
         console.log('User IP address:', userIPAddress);
})
var  currentUrl = window.location.href;
    let current = 'Home Page';
  
    if (currentUrl.includes('/pages/')) {
      current = 'Contacts Page';
    } else if (currentUrl.includes('/cart')) {

      current = 'Cart Page';
    } else if (currentUrl.includes('/collections/')) {
      current = 'Collection Page';
    }console.log('Currently at:', current)


// // TIME FOR EACH PAGE CLOSURE

var pageAccessCloseInfo = JSON.parse(sessionStorage.getItem('pageAccessCloseInfo')) || [];

window.addEventListener('load', function () {
  var currentPage = window.location.href;
  let current = 'Home Page';
  
    if (currentPage.includes('/pages/')) {
      current = 'Contacts Page';
    } else if (currentPage.includes('/cart')) {
      current = 'Cart Page';
    } else if (currentPage.includes('/collections/')) {
      current = 'Collection Page';
    }
  var accessTime = new Date();
  accessTime.setHours(accessTime.getHours()+5);
  accessTime.setMinutes(accessTime.getMinutes()+30)
  var accessTimeISO = accessTime.toISOString(); // Store access time in ISO format
  sessionStorage.setItem('pageAccessCloseInfo', JSON.stringify(pageAccessCloseInfo));
  pageAccessCloseInfo.push({ page: current, accessTime: accessTimeISO});
  
});

window.addEventListener('beforeunload', function () {
  var currentPage = window.location.href;
  let current = 'Home Page';
  
    if (currentPage.includes('/pages/')) {
      current = 'Contacts Page';
    } else if (currentPage.includes('/cart')) {
      current = 'Cart Page';
    } else if (currentPage.includes('/collections/')) {
      current = 'Collection Page';
    }


  var currentTime = new Date();
  currentTime.setHours(currentTime.getHours() + 5);   // Add 5 hours
  currentTime.setMinutes(currentTime.getMinutes() + 30); // Add 30 minutes
  var currentTimeISO = currentTime.toISOString(); // Store close time in ISO format
  
  var currentPageInfo = pageAccessCloseInfo.find(item => item.page === current);
  if (currentPageInfo) {
    currentPageInfo.closeTime = currentTimeISO;
  }
  
  sessionStorage.setItem('pageAccessCloseInfo', JSON.stringify(pageAccessCloseInfo));
});
function displayPageAccessCloseInfoFromSessionStorage() {
  var storedPageAccessCloseInfo = JSON.parse(sessionStorage.getItem('pageAccessCloseInfo'));
  if (storedPageAccessCloseInfo) {
    for (var i = 0; i < storedPageAccessCloseInfo.length; i++) {
      var pageInfo = storedPageAccessCloseInfo[i];
      console.log('Page:',pageInfo.page, 'Accessed at:', pageInfo.accessTime, 'Closed at:', pageInfo.closeTime);
    }
  } else {
    console.log('No page access and close information found in session storage.');
  }
}





function timedata(){
       
          
          var pacData = JSON.parse(sessionStorage.getItem('pageAccessCloseInfo'))
          console.log(pacData)
          var dataVar = { 'pacData':pacData }
          console.log(dataVar)
          var tosend = {'pacData':pacData, userIPAddress:userIPAddress  }

        var endpoint = 'https://89d0-110-226-179-60.ngrok-free.app/time/'    
        fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }, body: JSON.stringify(tosend),
        })
          .then(response => response.json())
          .then(data => {
            console.log('Data sent to Django backend:', data);
          })
        
      
}
let hoverTimer

function handleClick(event) {

  var x = event.clientX + window.scrollX;
  var y = event.clientY + window.scrollY;
  var timeStamp = new Date();
  timeStamp.setHours(timeStamp.getHours() + 5);   // Add 5 hours
  timeStamp.setMinutes(timeStamp.getMinutes() + 30); // Add 30 minutes
  var timestamp = timeStamp.toISOString();

  const type  = 'MouseClick';

  if (event.type==='click'){
    const clickedElement = event.target;
    elementName = clickedElement.innerText || clickedElement.textContent;
    



    if (typeof(Storage) !== "undefined") {
      var existingClicks = JSON.parse(sessionStorage.getItem('clickData')) ||  [] ;
      existingClicks.push({ x_click: x, y_click: y, timestamp: timestamp,page: current, 'event-type': type , name:elementName});
  
  
      sessionStorage.setItem('clickData', JSON.stringify(existingClicks));
    }


  }else if (event.type === 'mouseover') {
    const type = 'MouseHover';
    
    const hoveredElement = event.target;
    const elementName = hoveredElement.innerText || hoveredElement.textContent;
    
    const elementAttributes = Array.from(hoveredElement.attributes).reduce((attrs, attr) => {
      if (attr.name !== 'class' && !attr.name.startsWith('aria')) {
        attrs[attr.name] = attr.value;
 }
      
      return attrs;
    }, {});
  

 
    hoverTimer = setTimeout(() => {
    const hoverData = {
      // attributes:elementAttributes,
      x_hover: x,
      y_hover: y,
      timestamp: timestamp,
      page: current, 
      place_where_hovered : elementName,
      'event-type': type 
      }
      if (Object.keys(elementAttributes).length === 0) {
        hoverData.attributes = 'none';
      } else {
        hoverData.attributes = elementAttributes;
      }

      if (typeof Storage !== "undefined") {
      var existingHovers = JSON.parse(sessionStorage.getItem('hoverData')) ||  [];
      
      existingHovers.push(hoverData)

      sessionStorage.setItem('hoverData', JSON.stringify(existingHovers));
    } else {
      console.log("Local storage is not supported by this browser.");
    }
  },1500);
  }
    if (event.type === 'mouseout') {
    clearTimeout(hoverTimer);
}
}
  

document.addEventListener('click', handleClick);
document.addEventListener('mouseover', handleClick);
document.addEventListener('mouseout', handleClick);
  

function sendclickData(){
    
var clickdata = JSON.parse(sessionStorage.getItem('clickData'))
var click = { 'clickdata':clickdata }
var send =  {'clickdata':clickdata, userIPAddress:userIPAddress }
                    

var clickpoint = 'https://89d0-110-226-179-60.ngrok-free.app/click/'
                    
fetch(clickpoint, {
method: 'POST',
headers: {
'Content-Type': 'application/json',
   }, body: JSON.stringify(send),
})
 .then(response => response.json())
.then(data => {
   console.log('Data sent to Django backend:', data);
 })            

  }


function sendhoverdata(){


  var hoverdata = JSON.parse(sessionStorage.getItem('hoverData'))
  console.log(hoverdata)
  var hover = {'hoverdata':hoverdata}
  console.log(hover)
  var senddd = { 'hoverdata':hoverdata, userIPAddress:userIPAddress}
  var hoverpoint = 'https://89d0-110-226-179-60.ngrok-free.app/hover/'

  
  fetch(hoverpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }, body: JSON.stringify(senddd),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Data sent to Django backend:', data);
    })
}

               
function sendshopdata(){
          var shopdataendpoint = 'https://89d0-110-226-179-60.ngrok-free.app/info/'
          const dataToSendshop = {shopName:shopName,shopEmail:shopEmail,userIPAddress:userIPAddress};
          fetch(shopdataendpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            }, body: JSON.stringify(dataToSendshop),
          })
            .then(response => response.json())
            .then(data => {
              console.log('Data sent to Django backend:', data);
            })
           }










// PAGES INFO

     

      

document.addEventListener('DOMContentLoaded', function() {
        var isRevisitingPage = false;

        var currentPage = window.location.href;
        let current = 'Home Page';
  
    if (currentPage.includes('/pages/')) {
      current = 'Contacts Page';
    } else if (currentPage.includes('/cart')) {
      current = 'Cart Page';
    } else if (currentPage.includes('/collections/')) {
      current = 'Collection Page';
    }
        var visitedPages = sessionStorage.getItem('visitedPages');
        if (!visitedPages) {
          visitedPages = [];
        } else {
          visitedPages = JSON.parse(visitedPages);
        }
        var lastVisitedPage = visitedPages.length > 0 ? visitedPages[visitedPages.length - 1] : null;
        isRevisitingPage = current === lastVisitedPage;
        if (!isRevisitingPage) {
          visitedPages.push(current);
          sessionStorage.setItem('visitedPages', JSON.stringify(visitedPages));
          if (visitedPages.length === 1) {
            var timeStamp = new Date();
              timeStamp.setHours(timeStamp.getHours() + 5);   // Add 5 hours
             timeStamp.setMinutes(timeStamp.getMinutes() + 30); // Add 30 minutes
            var timestamp = timeStamp.toISOString();



            sessionStorage.setItem('firstAccessTime', timestamp);
   }
  };




        // Display the complete list of visited pages in sequence
        var visitedPagesList = document.getElementById('visitedPagesList');
        if (visitedPagesList) {
          visitedPagesList.textContent = visitedPages.join(', ');
        }
        

          
          
      });
function sendpagedata(){
var visitedPages = JSON.parse(sessionStorage.getItem('visitedPages'));
var accesstime = sessionStorage.getItem('firstAccessTime')

            
            
            
var apiEndpoint = 'https://89d0-110-226-179-60.ngrok-free.app/pages/';
var dataToSend = {first_page: visitedPages[0], other_pages: visitedPages.slice(1),userIPAddress:userIPAddress,first:accesstime};
console.log(dataToSend)
    fetch(apiEndpoint, {
         method: 'POST',
         headers: {
          'Content-Type': 'application/json',
        },
                      body: JSON.stringify(dataToSend),
       })
        .then(response => response.json())
        .then(data => {
           console.log('Data sent to Django backend:', data);
          localStorage.setItem('visitedPages', JSON.stringify(visitedPages)); 
}) 
}


function runonload() {
                Promise.all([sendclickData(), sendhoverdata(), timedata(),sendshopdata()]).then(() => {
                  sendpagedata();
                
                
              }
                )};           
  window.addEventListener('unload', runonload);








      



  

//  // Extract the shop name using JavaScript
 
