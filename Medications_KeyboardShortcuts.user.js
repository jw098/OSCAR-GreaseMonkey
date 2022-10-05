// ==UserScript==
// @name           Medications_KeyboardShortcuts
// @namespace      oscar
// @include        */oscarRx/choosePatient.do*
// @description		Within Medications, Alt+1 to 'Save And Print'. When the prescripton pops up, Alt+1 'Print & Paste into EMR'. Alt+2 to 'Fax & Paste into EMR'. 
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @grant	   none
// ==/UserScript==


const medPage = /oscarRx\/choosePatient\.do/
let currentURL = window.location.href;
// let rxPageLoaded = false;

/*
PURPOSE: keydown event listener. Alt+1 clicks the 'Save and Print' button, as long as the lightwindow isn't currently loaded.
*/
window.addEventListener('keydown', function(theEvent) {
	//theEvent.stopPropagation();
	//theEvent.preventDefault();
	// var theKeyCode = theEvent.charCode;// || event.which;
	// var theKey = String.fromCharCode(theKeyCode);
	const theKey = theEvent.key;
	const theAltKey = theEvent.altKey;
	const theCtrlKey = theEvent.ctrlKey;
	const theShiftKey= theEvent.shiftKey;


	if(!document.getElementById("lightwindow_iframe")){  // check if lightwindow not loaded
		switch(true){
			case theAltKey && theKey == 1:
				var theTarget = document.evaluate("//*[@id='saveButton']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
				theTarget.click();
				window.scrollTo(0, 30);
				// window.addEventListener('load', function(theEvent) {
				// 	console.log("window done loading");
				// });

				// setTimeout(iFrameListener, 3000);  // wait for the lightwindow to load, before attaching listeners

				break;
		}
	}

}, true);

/*
PURPOSE: adds keydown event listeners when lightwindow is loaded.

NOTE: Need separate listeners for the iFrame and the top-level window.
*/
window.addEventListener('keydown', function(theEvent) {
	if(!!document.getElementById("lightwindow_iframe")){  // check if lightwindow  loaded
		iFrameKeyDownAction(theEvent);
	}
}, true);


/*
PURPOSE: attaches keydown event listeners to the two iframes on the prescription popup.
NOTES:
- we need these listeners because the usual window listener doesn't cover the pop-up lightwindow.
- we need two listeners for the lightwindow since there are two additional documents (and therefore 2 additional windows). 
- the second iframe is nested within the first iframe. The second iframe can't be directly referred to by the top level document, only via the first iframe.
- these listeners need to be reloaded everytime the lightwindow iframe is closed and reopened. 

BUG:
- If you Fax and Paste to EMR with an empty pharmacy, the iframe2 listener no longer works. Need to close the light window and re-open. But the top level window listener still works. The iframe1 listener works as well. This is because the iframe2 disappears when you get the fax error. So the listener disappears as well.
  - not an important bug, since the user is likely to close the light window anyway to enter in a pharmacy.
*/
function iFrameListener(){
	let iframe = document.getElementById("lightwindow_iframe");
	let iframeDoc = iframe.contentWindow.document || iframe.contentWindow;
	iframeDoc.addEventListener('keydown', function(theEvent) {
		iFrameKeyDownAction(theEvent);
	}, true);	
	
	let iframe2 = iframeDoc.getElementById("preview");
	let iframeDoc2 = iframe2.contentWindow.document || iframe2.contentWindow;
	iframeDoc2.addEventListener('keydown', function(theEvent) {
		iFrameKeyDownAction(theEvent);
	}, true);

	// console.log(iframe);
	// console.log(iframeDoc);
	// console.log(iframe2);
	// console.log(iframeDoc2);	

	console.log('iFrameListener added');
}


function iFrameKeyDownAction(theEvent){
	console.log('iframe keydown');
	const theKey = theEvent.key;
	const theAltKey = theEvent.altKey;
	const theCtrlKey = theEvent.ctrlKey;
	const theShiftKey= theEvent.shiftKey;
	let iframe = document.getElementById("lightwindow_iframe");
	let iframeDoc = iframe.contentWindow.document || iframe.contentWindow;

	switch(true){
		case theAltKey && theKey == 1:
			var theTarget = iframeDoc.evaluate("//input[@value='Print & Paste into EMR']",iframeDoc,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			rxPageLoaded = false;
			break;
		case theAltKey && theKey == 2:
			var theTarget = iframeDoc.evaluate("//input[@value='Fax & Paste into EMR']",iframeDoc,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			rxPageLoaded = false;
			break;	
		case theKey == 'Escape':
			var theTarget = document.getElementById("lightwindow_title_bar_close_link");
			console.log(theTarget);
			theTarget.click();
			break;
	}

}


/*
PURPOSE:
- add click event listener to the Save and Print button. Activates the lightwindow mutationObserver.
*/
const inputButton = document.getElementById("saveButton");
inputButton.addEventListener('click', function(theEvent){
	console.log('clicked Save and Print button');
	lightwindowIFrameMutationObserver();
});


/*
PURPOSE: Use MutationObserver to wait for the prescription lightwindow to be fully loaded. Once loaded, activate the prescription light window listener and disconnect the MutationObserver.

NOTES:
- had difficulty directly checking when the inner iframes were fully loaded. I tried waiting for the iframe to load, then attach a mutationObserver to that, but it didn't work (I also tried attaching eventListeners, which also didn't work). As a proxy, checked when lightwindow_loading changes its style attribute to 'display:none', as this coincides with the iframes being fully loaded.

*/
function lightwindowIFrameMutationObserver(){
	var mutationObserver = new MutationObserver(function(mutations) {

		// mutations.forEach(function(mutation) {
		// 	console.log(mutation);
		// });

		// console.log(mutations);
		if (!!document.getElementById("lightwindow_iframe")){
			let iframe = document.getElementById("lightwindow_iframe");
			let iframeDoc = iframe.contentWindow.document || iframe.contentWindow;	
			if (!!iframeDoc.getElementById("preview")){
				// let iframe2 = iframeDoc.getElementById("preview");
				// let iframeDoc2 = iframe2.contentWindow.document || iframe2.contentWindow;	
				// mutationObserver.disconnect();	
				if (document.getElementById("lightwindow_loading").getAttribute('style') == 'display: none;'){
					console.log('no more mutations');
					mutationObserver.disconnect();		
					iFrameListener();
				}
			}
		}
	});

	mutationObserver.observe(document.documentElement, {
	  attributes: true,
	  subtree: true,

	  // characterData: true,
	  // childList: true,
	  // attributeOldValue: true,
	  // characterDataOldValue: true
	});
}




