// ==UserScript==
// @name           AllergyAlert
// @namespace      oscar
// @include        */oscarRx/choosePatient.do*
// @include        */oscarRx/SearchDrug3.jsp*
// @description		Alert the user if Allergies haven't yet been set.
// @grant	   none
// ==/UserScript==


window.addEventListener('load', function(){
	
	let allergyEntry = document.evaluate("/html/body/table/tbody/tr[2]/td[1]/div/p[3]/a",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	let addAllergy = document.evaluate("/html/body/table/tbody/tr[2]/td[1]/div/p[1]/a",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	
	// check if any allergy entries exist.
	if (allergyEntry == null){
		if (confirm("Allergies haven't been set yet.\nPress Ok to Add Allergy. Cancel to continue.")){
			addAllergy.click();
		}

		// alert("WARNING: Allergies haven't been set yet.")
	}
}, true);

