// ==UserScript==
// @name           KeyboardShortcuts_BCBilling6
// @namespace      oscar
// @include        *billing.do?bill*
// @include        *oscar/CaseManagementEntry*
// @include        *billing/CA/BC/billingDigNewSearch.jsp?*
// @include        *billing/CA/BC/CreateBilling*
// @description		In the BC Billing page: Alt+1 to Continue, Alt+Q to input in person visit billing code, Alt+W to input telehealth visit billing code. In Diagnostic Code search: Alt+1 to Confirm, Escape to Cancel. In Billing confirmation page: Alt+1 to Save Bill.
// @grant	   none
// ==/UserScript==

// forked from original KeyboardShortcuts script created by Darius Opensource

(function(){
document.addEventListener('keydown', function(theEvent) {
	//theEvent.stopPropagation();
	//theEvent.preventDefault();
	// var theKeyCode = theEvent.charCode;// || event.which;
	// var theKey = String.fromCharCode(theKeyCode); 
	var theKey = theEvent.key;
	var theAltKey = theEvent.altKey;
	var theCtrlKey = theEvent.ctrlKey;
	var theShiftKey= theEvent.shiftKey;
	
	let currentURL = window.location.href;
	const billingPage = /billing.do\?bill/;
	const billingPage2 = /oscar\/CaseManagementEntry/;
	const dxCodeSearch = /billing\/CA\/BC\/billingDigNewSearch.jsp/;
	const billingConf = /billing\/CA\/BC\/CreateBilling/;
  	
	switch(true){
		case  (!!document.getElementById("billingFormTable") &&		// If in BC Billing page, whose XML contains id = "billingFormtable"
				theAltKey && theKey == 1):  						// Alt+1 to Continue.
			var theTarget = document.evaluate("id('buttonRow')/td/input[@value='Continue']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			break;
		case  (!!document.getElementById("billingFormTable") &&		// If in BC Billing page, whose XML contains id = "billingFormtable"
				theAltKey && theKey == 'q'):  						// Alt+Q to input Office visit code.
			inPersonVisit()
			break;
		case  (!!document.getElementById("billingFormTable") &&		// If in BC Billing page, whose XML contains id = "billingFormtable"
				theAltKey && theKey == 'w'):  						// Alt+W to input Telehealth visit code.
			virtualVisit()
			break;
		case (!!document.getElementById("servicecode") &&	// If in Diagnostic Code search, whose XML contains id = "servicecode"
				theAltKey && theKey ==  1):					// Alt+1 to Confirm.
			var theTarget = document.evaluate("id('servicecode')/input[@value='Confirm']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			break;	
		case (!!document.getElementById("servicecode") &&	// If in Diagnostic Code search, whose XML contains id = "servicecode"
				theKey == "Escape"):						// Escape to Cancel. 
			// alert("dxCodeSearch");
			var theTarget = document.evaluate("id('servicecode')/input[@value='Cancel']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			break;	
		case (document.getElementsByName("BillingSaveBillingForm").length > 0	//  Check if in in Billing confirmation page. XML contains name = "BillingSaveBillingForm"
				&& theAltKey && theKey == 1):									// Alt+1 to Save Bill. 
			// alert("billingConf");
			var theTarget = document.evaluate("//input[@value='Save Bill']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			break;
			
		// case  theAltKey && theKey == 'z':  // Alt Z for testing.
			// alert(!!document.getElementById("billingFormTable"));
			// alert(document.getElementsByName("BillingSaveBillingForm").length > 0);
			// alert(dxCodeSearch.test(currentURL));
			// break;

		/*
		/html/body/form/table[2]/tbody/tr/td/table[3]/tbody/tr/td/table[3]/tbody/tr[2]/td/input[3]
		/html/body/form/table[2]/tbody/tr/td/table[3]/tbody/tr/td/table[3]/tbody/tr[2]/td/input[contains(@value, 'Save Bill')]
				
		//*[@id="saveImg"]
		case theAltKey && theCtrlKey && theShiftKey && theKey=='':
			//TO DO: The action to be performed for the above keyboard shortcut
			break;
		*/
	}
}, true);
})();


function inPersonVisit(){
  age = $("#patientIdRow").children().children().next().next().next().html();
  if(age < 2)
    code="12100";
  else if(age >= 2 && age < 50)
    code="00100";
  else if(age >= 50 && age < 60)
    code="15300";
  else if(age >= 60 && age < 70)
    code="16100";
  else if(age >= 70 && age < 80)
    code="17100";
  else 
    code="18100";
  // $("input[name=billing_1_fee]").val(code);
  addServiceCodeRigid(code);
}

function virtualVisit(){
  age = $("#patientIdRow").children().children().next().next().next().html();
  if(age < 2)
    code="13237";
  else if(age >= 2 && age < 50)
    code="13437";
  else if(age >= 50 && age < 60)
    code="13537";
  else if(age >= 60 && age < 70)
    code="13637";
  else if(age >= 70 && age < 80)
    code="13737";
  else 
    code="13837";
  // $("input[name=billing_1_fee]").val(code);
  addServiceCodeRigid(code);
}

function addServiceCodeRigid(svcCode1) {
	inputtedBillingCode1 = jQuery("#billing_1_fee").val();
	if(inputtedBillingCode1 == svcCode1){			// if same service code already entered, clear all fields.
		$("input[name=billing_1_fee]").val("");
		$("input[name=billing_1_fee_dx1]").val("");
		$("input[name=billing_2_fee]").val("");
		$("input[name=billing_2_fee_dx1]").val("");
		$("input[name=billing_3_fee]").val("");
		$("input[name=billing_3_fee_dx1]").val("");
	}
	else{
		$("input[name=billing_1_fee]").val(svcCode1);
	}
}