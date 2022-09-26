// ==UserScript==
// @name           LabLabler1
// @namespace      oscar
// @include        */lab/CA/ALL/labDisplay*
// @include        */dms/inboxManage*
// @include        */dms/showDocument*
// @description		Labels lab results.
// @grant	   none
// ==/UserScript==

// created by Darius Opensource

// don't set label if REFER1
(function(){
document.addEventListener('keydown', function(theEvent) {
	var theKey = theEvent.key;
	var theAltKey = theEvent.altKey;
	var theCtrlKey = theEvent.ctrlKey;
	var theShiftKey= theEvent.shiftKey;
	switch(true){	
		case (theAltKey && theKey == 'z'):  // for testing
// 			console.log('hi');
			testFunction();	
			break;      
	}
}, true);
})();

function testFunction(){

	// Gets all lab results from the XML, which are either in table/tbody/tr/td[1]/a[1] or table/tbody/tr/td[1]/span
	const allLabResults = document.querySelectorAll('table[name="tblDiscs"]>tbody>tr>td:first-child>:is(a:first-child, span)');
	

	extractKeyLabResults(allLabResults);
}

function extractKeyLabResults(allLabResults){
	// console.log(allLabResults);
	let keyLabResultList = "";
	let index = 0;
	allLabResults.forEach(	
		function(e){			
			if (!isSubResult(e)){  // add all non sub-results. i.e. add all key results.
				if(index>0){
					keyLabResultList += "/";
				}
				let labTitle = e.textContent;
				keyLabResultList += labTitle;
				// console.log(e);
// 				console.log(e.parentNode.childNodes);
	// 			console.log(e.parentNode.outerHTML);
			}
			index++
		}
	)
	console.log(keyLabResultList);
}

// Purpose: checks if the Lab result is a sub-result. e.g. WBC, RBC are sub results to Hematology Panel (CBC).
// Implementation: Sub-results in OSCAR are indented with three non-breaking spaces.
// The whitespace is located just prior to the element of interest. So, we get the parentNode, and the first childNode contains the whitespace.
function isSubResult(e){
	const threeNonBreakingSpaces = "\xA0" + " " + "\xA0"+ " " + "\xA0";
	return e.parentNode.childNodes[0].nodeValue == threeNonBreakingSpaces;	
}



/*
CBC 			/html/body/div/form[3]/table/tbody/tr/td/table[6]/tbody/tr[2]/td[1]/span
b12				/html/body/div/form[3]/table/tbody/tr/td/table[8]/tbody/tr[2]/td[1]/a[1]
				/html/body/div/form[3]/table/tbody/tr/td/table[8]/tbody/tr[4]/td[1]/a[1]
				/html/body/div/form[3]/table/tbody/tr/td/table[10]/tbody/tr[4]/td[1]/span
				/html/body/div/form[3]/table/tbody/tr/td/table[10]/tbody/tr[8]/td[1]/a[1]
				/html/body/div/form[3]/table/tbody/tr/td/table[10]/tbody/tr[9]/td[1]/a[1]
				/html/body/div/form[3]/table/tbody/tr/td/table[12]/tbody/tr[2]/td[1]/span
				/html/body/div/form[3]/table/tbody/tr/td/table[14]/tbody/tr[2]/td[1]/span
				/html/body/div/form[3]/table/tbody/tr/td/table[16]/tbody/tr[2]/td[1]/a[1]
				/html/body/div/form[3]/table/tbody/tr/td/table[18]/tbody/tr[2]/td[1]/span
				/html/body/div/form[3]/table/tbody/tr/td/table[20]/tbody/tr[2]/td[1]/a[1]
				/html/body/div/form[3]/table/tbody/tr/td/table[4]/tbody/tr[2]/td[1]/a
				/html/body/div/form[3]/table/tbody/tr/td/table[4]/tbody/tr[2]/td[1]/span
				/html/body/div/form[3]/table/tbody/tr/td/table[4]/tbody/tr[2]/td[1]/span
				/html/body/div/form[3]/table/tbody/tr/td/table[6]/tbody/tr[2]/td[1]/span
				/html/body/div/form[3]/table/tbody/tr/td/table[6]/tbody/tr[2]/td[1]/a
				/html/body/div/form[3]/table/tbody/tr/td/table[8]/tbody/tr[2]/td[1]/span
				/html/body/div/form[3]/table/tbody/tr/td/table[4]/tbody/tr[2]/td[1]/span
				/html/body/div/form[3]/table/tbody/tr/td/table[4]/tbody/tr[2]/td[1]/a[1]
				/html/body/div/form[3]/table/tbody/tr/td/table[4]/tbody/tr[3]/td[1]/a
				/html/body/div/form[3]/table/tbody/tr/td/table[6]/tbody/tr[2]/td[1]/span
				/html/body/div/form[3]/table/tbody/tr/td/table[18]/tbody/tr[2]/td[1]/a
hiv pending		/html/body/div/form[3]/table/tbody/tr/td/table[8]/tbody/tr[2]/td[1]
tet pending		/html/body/div/form[3]/table/tbody/tr/td/table[6]/tbody/tr[2]/td[1]
a1c:			/html/body/div/form[3]/table/tbody/tr/td/table[8]/tbody/tr[2]/td[1]/a[1]
cr: 			/html/body/div/form[3]/table/tbody/tr/td/table[8]/tbody/tr[4]/td[1]/span
lipid:			/html/body/div/form[3]/table/tbody/tr/td/table[10]/tbody/tr[2]/td[1]/span
ACR:			/html/body/div/form[3]/table/tbody/tr/td/table[12]/tbody/tr[5]/td[1]/span
*/