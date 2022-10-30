// ==UserScript==
// @name           meds test
// @namespace      oscar
// @include        */oscarRx/choosePatient.do*
// @include        */oscarRx/SearchDrug3.jsp*
// @description    Within Medications, Alt+1 to 'Save And Print', Alt+A to set focus to 'Drug Name' text area (to enter a new medication), Alt+Q to close the window. When the prescription print window pops up, Alt+1 to 'Print & Paste into EMR'. Alt+2 to 'Fax & Paste into EMR'. When closing the Medications page, a pop-up confirmation dialog will appear if there are medications pending submission.
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @grant          none
// ==/UserScript==

window.addEventListener("load", function(e) {
	
	console.log(document.querySelectorAll("#drugProfile"));
}, false);

