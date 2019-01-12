//Server data request
const jsonRequest = new XMLHttpRequest();                  
//Json URL source
var jsonUrl = 'https://design.propcom.co.uk/buildtest/accordion-data.json';

//Get / Store all Class Names for Item, Section, Button and Content elements in arrays
var accordItem = document.getElementsByClassName("accordion-item");
var accordSection = document.getElementsByClassName("accordion-section");
var accordButton = document.getElementsByClassName("accordion-button");
var accordContent = document.getElementsByClassName("accordion-content");

//Wait for page to execute and fire up Json data import
jsonRequest.onload = function(){
    //Cheks for successfull request
    if (this.status === 200){
        //Try access and display Json source. This does not check for Key names.
        try {
            var accordionJsonData = JSON.parse(this.responseText); //Parse Json data to array
            //For each Accordion Item -> Section, Item -> Content, insert Json Heading and Content
            for ( i = 0; i < accordItem.length; i++ ) {
                //Insert Json data only for H1 child element
                for ( j = 0; j < accordSection[i].children.length; j++ ) {
                    if ( accordSection[i].children[j].nodeName == "H1") {
                        accordSection[i].children[j].innerHTML = accordionJsonData.blocks[i].heading;
                    }   
                }
                //Insert Json data only for P child element
                for ( k = 0; k < accordContent[i].children.length; k++ ) {
                    if (accordContent[i].children[k].nodeName == "P") {
                        accordContent[i].children[k].innerHTML = accordionJsonData.blocks[i].content;
                    }
                }
            }
        //Alerts for error while trying to get and display Json data (both in console and on Front-End)
        } catch(e) {
            console.warn("There was an error with getting the json data from json source. Check file path.");
            alert("There was an error with getting the json data from json source. Check file path.");
        }
    //Alerts for error while trying to connect to the Json data source (both in console and on Front-End)
    } else {
        console.log("Could not get status 200 ok.");
        alert("Could not get status 200 ok.");
    }
}
//Asyncronous request to server
jsonRequest.open('GET', jsonUrl, true);
jsonRequest.send();

//Adds On Click event listener for all Accordion Buttons and sets a function to add the CSS Show Content Classes
//This Loop Through Element Parent and Child method was left intentionally as an alternative method of geting DOM elements
for ( i = 0; i < accordButton.length; i++ ) {
    //Add event listener and function for Internet Explorer (Browsers) v. 9+
    if ( accordButton[i].addEventListener ) {
        accordButton[i].addEventListener('click', function() {
                this.classList.toggle("active");                                                    //Insert CSS class for Accordion Button
                this.parentElement.classList.toggle("accordion-section-show");                      //Insert CSS class for Accordion Section
                this.parentElement.nextElementSibling.classList.toggle("accordion-content-show");   //Insert CSS class for Accordion Content
            });
    //Add event listener and function for Internet Explorer (Browsers) v. 8
    } else {
        accordButton[i].attachEvent('onclick', function() {
            this.classList.toggle("active");                                                        //Insert CSS class for Accordion Button
            this.parentElement.classList.toggle("accordion-section-show");                          //Insert CSS class for Accordion Section
            this.parentElement.nextElementSibling.classList.toggle("accordion-content-show");       //Insert CSS class for Accordion Content
        });
    }
}