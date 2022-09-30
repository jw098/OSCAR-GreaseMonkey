// ==UserScript==
// @name           Medications_KeyboardShortcuts
// @namespace      oscar
// @include        */oscarRx/choosePatient.do*
// @description		Within Ticklers, Alt+1 to 'Submit and EXIT', Alt+2 to 'Submit & Write to Encounter', Alt+A to set focus to text box. When the Tickler page loads, it also automatically sets focus to the text box. Note: if not already done, you should consider setting a 'Default Tickler Recipient' under OSCAR Preferences.
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @grant	   none
// ==/UserScript==


const medPage = /oscarRx\/choosePatient\.do/
let currentURL = window.location.href;
// let rxPageLoaded = false;

window.addEventListener('keydown', function(theEvent) {
	//theEvent.stopPropagation();
	//theEvent.preventDefault();
	// var theKeyCode = theEvent.charCode;// || event.which;
	// var theKey = String.fromCharCode(theKeyCode);
	const theKey = theEvent.key;
	const theAltKey = theEvent.altKey;
	const theCtrlKey = theEvent.ctrlKey;
	const theShiftKey= theEvent.shiftKey;

	switch(true){
		case theAltKey && theKey == 1:
			var theTarget = document.evaluate("//*[@id='saveButton']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			window.scrollTo(0, 30);

			// console.log('hi1')
			// let contents = document.getElementById("lightwindow_contents");
			// console.log(contents);
			// // let iframeDoc = iframe.contentWindow.document || iframe.contentWindow;
			// // console.log(iframeDoc);

			// contents.ready(function(){
			// 	console.log('hi3')
			// });

			// let lw = document.getElementById("lightwindow");
			// console.log(lw);

			// window.addEventListener('keydown', function(theEvent) {
			// 	console.log('hi3')
			// 	prescriptionIFrame2();
			// }, true);


			setTimeout(prescriptionIFrame, 5000);  // wait for the lightwindow to load, before the iframe can be 
			// referenced

			// setTimeout(testFn, 1000);
			// setTimeout(testFn2, 2000);
			// setTimeout(testFn2, 3000);
			// setTimeout(testFn2, 4000);



			break;
	}

}, true);


function prescriptionIFrame(){
	iFrameListener();

	window.addEventListener('keydown', function(theEvent) {
		keyDownAction(theEvent);
	}, true);


}


// we need these listeners because window listener doesn't cover the pop-up lightwindow.
// we need two listeners for the lightwindow since there are two additional documents (and therefore 2 additional windows). 
// the second additional document is nested within the first additional document. The second additional document can't be referred to by the top level document, only by the first additional document.
function iFrameListener(){
	let iframe = document.getElementById("lightwindow_iframe");
	let iframeDoc = iframe.contentWindow.document || iframe.contentWindow;

	console.log(iframe);
	console.log(iframeDoc);
	iframeDoc.addEventListener('keydown', function(theEvent) {
		keyDownAction(theEvent);
	}, true);	


	console.log('hi10');
	let iframe2 = iframeDoc.getElementById("preview");
	console.log(iframe2);
	let iframeDoc2 = iframe2.contentWindow.document || iframe2.contentWindow;
	console.log(iframeDoc2);
	iframeDoc2.addEventListener('keydown', function(theEvent) {
		keyDownAction(theEvent);
	}, true);		
}

function keyDownAction(theEvent){
	console.log('hi2');
	const theKey = theEvent.key;
	const theAltKey = theEvent.altKey;
	const theCtrlKey = theEvent.ctrlKey;
	const theShiftKey= theEvent.shiftKey;
	let iframe = document.getElementById("lightwindow_iframe");
	let iframeDoc = iframe.contentWindow.document || iframe.contentWindow;

	switch(true){
		case theAltKey && theKey == 3:
			console.log(iframeDoc);
			var theTarget = iframeDoc.evaluate("//input[@value='Print & Paste into EMR']",iframeDoc,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			console.log(theTarget);
			theTarget.click();
			rxPageLoaded = false;
			break;
		case theAltKey && theKey == 2:
			var theTarget = iframeDoc.evaluate("//input[@value='Fax & Paste into EMR']",iframeDoc,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			rxPageLoaded = false;
			break;	
	}

}


// function prescriptionIFrame(){
// 	let iframe = document.getElementById("lightwindow_iframe");
// 	let iframeDoc = iframe.contentWindow.document || iframe.contentWindow;
// 	console.log('hihihi');
// 	console.log(iframeDoc);
// 	iframeDoc.addEventListener('keydown', function(theEvent) {
		
// 		console.log('hihi');
// 		var theTarget = iframeDoc.evaluate("//input[@value='Print & Paste into EMR']",iframeDoc,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
// 		console.log(theTarget);
// 		var theTarget2 = iframeDoc.evaluate("/html/body/div/table/tbody/tr[2]/td/table/tbody",iframeDoc,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
// 		// html/body/div/table/tbody/tr[2]/td/table/tbody/tr[1]/td[2]/table/tbody/tr[5]/td/span/input

// 		switch(true){
// 			case theAltKey && theKey == 3:
// 				var theTarget = document.evaluate("//input[@value='Print & Paste into EMR']",iframeDoc,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
// 				var theTarget2 = document.evaluate("/html/body/div/table/tbody/tr[2]/td/table/tbody",iframeDoc,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
// 				// html/body/div/table/tbody/tr[2]/td/table/tbody/tr[1]/td[2]/table/tbody/tr[5]/td/span/input
// 				console.log(theTarget2);
// 				theTarget.click();
// 				rxPageLoaded = false;
// 				break;
// 			case theAltKey && theKey == 2:
// 				var theTarget = document.evaluate("//input[@value='Fax & Paste into EMR']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
// 				theTarget.focus();
// 				rxPageLoaded = false;
// 				break;	
// 		}
// 	}, true);
// }




// window.addEventListener('load', function(theEvent) {
// 	window.scrollTo(0, 0);
// 	switch (true){
// 		case (ticklerPage1.test(currentURL) || ticklerPage2.test(currentURL)): //  Check if in in Billing confirmation page. 
// 			var theTarget = document.evaluate("//textarea",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
// 			theTarget.focus();
// 			break;
// 	}

// }, true);