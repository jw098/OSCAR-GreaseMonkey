// ==UserScript==
// @name           CloseCortico
// @namespace      oscar
// @include        *oscar*
// @description		On any OSCAR page, press Escape to close the popup from the Cortico extension.
// @grant	   none
// ==/UserScript==

window.addEventListener('keydown', function(theEvent) {
	//theEvent.stopPropagation();
	//theEvent.preventDefault();
	// var theKeyCode = theEvent.charCode;// || event.which;
	// var theKey = String.fromCharCode(theKeyCode);
	const theKey = theEvent.key;
	const theAltKey = theEvent.altKey;
	const theCtrlKey = theEvent.ctrlKey;
	const theShiftKey= theEvent.shiftKey;
    
	let currentURL = window.location.href;

	switch(true){
		case theKey == 'Escape':  // Sign, Save, and Bill 
			var theTarget = document.querySelectorAll(".tw-absolute")[0];
			console.log(theTarget);
			theTarget.click();
			break;
	}

}, true);

