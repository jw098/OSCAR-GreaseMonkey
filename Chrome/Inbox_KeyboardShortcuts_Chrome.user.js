// ==UserScript==
// @name           Inbox_KeyboardShortcuts
// @namespace      oscar
// @include        */lab/CA/ALL/labDisplay*
// @include        */dms/inboxManage*
// @include        */dms/showDocument*
// @include        */dms/MultiPageDocDisplay.jsp*
// @description		Within Inbox: Alt+1 to open first item. Within the Lab result: Alt+1 to Acknowledge and label labs with the actual names of each test (as opposed to cryptic labels like HAEM1, CHEM4, etc.). Alt+Q to open E-chart. Alt+W to open Tickler. Alt+Z to only label Labs without acknowleding. Also, the label of the previous version of the lab result is shown.
// @grant	   none
// ==/UserScript==

// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
var $ = window.jQuery;

window.addEventListener('keydown', function(theEvent) {
	//theEvent.stopPropagation();
	//theEvent.preventDefault();
	// var theKeyCode = theEvent.charCode;// || event.which;
	// var theKey = String.fromCharCode(theKeyCode);
	var theKey = theEvent.key;
	var theAltKey = theEvent.altKey;
	var theCtrlKey = theEvent.ctrlKey;
	var theShiftKey= theEvent.shiftKey;
  
	let currentURL = window.location.href;
	const labResultPage = /lab\/CA\/ALL\/labDisplay/
	const ticklerPage = /tickler\/ForwardDemographicTickler/
	const documentPage = /dms\/showDocument/
	

	switch(true){
		case (!!document.getElementById("docViews") &&	// If in the inbox, whose XML contains id = "docViews"
				theAltKey && theKey == 1):  			// Alt+1: Open first item in inbox						
			getNextTarget().click();
			console.log("test")
			break;
		case (labResultPage.test(currentURL) || documentPage.test(currentURL)): // If in the Lab/Document result page
			switch(true){
				case (theAltKey && theKey == 1):			// Alt+1: Acknowledge the result.
					if (labResultPage.test(currentURL)){	// if in lab result page: label lab results.
						labelLabs();	
					}					
					var theTarget = document.evaluate("//input[@value='Acknowledge']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
					theTarget.click();					
					break;		
				case (theAltKey && theKey == 'q'):  							// Alt+Q: open E-chart
					var theTarget = document.evaluate("//input[contains(@value, 'E-Chart')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
					theTarget.click();
					break;
				case (theAltKey && theKey == 'w'):  							// Alt+W: open Tickler
					var theTarget = document.evaluate("//input[@value='Tickler']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
					theTarget.click();
					break;
				case (labResultPage.test(currentURL) && theAltKey && theKey == 'z'):  // Alt+Z: if in lab result page: label lab results.
					labelLabs();	
					break;   					
			}
			break;
	}
}, true);


function getNextTarget() {
	
	const allInTBody = document.querySelectorAll('tbody[id="summaryBody"] > tr');
	console.log(allInTBody);
	let index = 1;
	for (const element of allInTBody) {
		// console.log(index);
		const styleAttribute = element.getAttribute('style');
		if (styleAttribute != 'display: none;'){  // Lab result not hidden. i.e not recently acknowledged.
			break;
		}
    index++;
	}
	console.log(index);
	
	return document.evaluate("//tbody[@id='summaryBody']/tr[" + index + "]/td[2]/a",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
}


/*
PURPOSE:
- adds a line break before and after the label text.
- insert another line element for the old label text.
*/
$("[id^='labelspan']").before('<br />');
$("[id^='labelspan']").after('<br />');
$("[id^='labelspan']").append('<br />');
$("[id^='labelspan']").append($("<i>"));

// $("[id^='labelspan'] > i:first-child").before($("<p>"));

///////////////////////////////////////////////////////////////////////////////////////////
// Shows old version of Label.
///////////////////////////////////////////////////////////////////////////////////////////


/*
NOTE
- no need to wait until document loads to run this. 
  - possibly because xmlhttp only runs onreadystatechange?
*/
getPrevVersionLabel();

/*
PURPOSE
- get URL of the previous version of lab results.
*/
function prevVersionURL(){
	const allVersionElementOnly = document.querySelectorAll('a[href^="labDisplay.jsp?segmentID"]');
	if (allVersionElementOnly == null){
		return "";
	}
	const allVersions = allVersionElementOnly[0].parentNode.childNodes;

	let prevNode = "";
	for (let i = 0; i < allVersions.length; i++){
		currentNode = allVersions[i];
		if (currentNode.nodeType == Node.TEXT_NODE && currentNode.textContent.includes("v")){
			break;
		}
		prevNode = currentNode;
	}
	return prevNode.href;
}


function getPrevVersionLabel() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            const prevVersionXMLText = xmlhttp.responseText;   
            if (!prevVersionXMLText) { 
                return;
            }

            const prevVersionHTML = new DOMParser().parseFromString(prevVersionXMLText, "text/html");
            const oldLabelElement = prevVersionHTML.querySelectorAll("span[id^='labelspan_'] > i");
            const oldLabelText = oldLabelElement[0].textContent;
            const oldLabelResultOnly = oldLabelText.split("Label:")[1];

            // $("[id^='labelspan']").append('<br />');
            // $("[id^='labelspan']").append($("<i>").html("Old: " + "&nbsp;&nbsp;&nbsp;" + oldLabelResultOnly));
            $("[id^='labelspan'] > i:nth-child(3)").html("Prev:" + "&nbsp;" + oldLabelResultOnly);

        }
    };
	xmlhttp.open("GET", prevVersionURL(), true);
	xmlhttp.send();
}


///////////////////////////////////////////////////////////////////////////////////////////
// Label Labs. Automatically labels lab results.
///////////////////////////////////////////////////////////////////////////////////////////

function labelLabs(){

	// Gets all lab results from the XML, which are either in table/tbody/tr/td[1]/a[1] or table/tbody/tr/td[1]/span
	const allLabResults = document.querySelectorAll('table[name="tblDiscs"]>tbody>tr>td:first-child>:is(a:first-child, span)');
	let keyLabResults = extractKeyLabResults(allLabResults);
	$("input[id*=acklabel]").val(keyLabResults);
	$("button[id*=createLabel]").click();

	// console.log(keyLabResults);
	
	showKeyLabResultsTextBox(keyLabResults);

}

// Show the key lab results in a button in the bottom right screen
function showKeyLabResultsTextBox(keyLabResults){
	let labResultsTextBox = document.createElement("input");
	labResultsTextBox.type="button";
	labResultsTextBox.value=keyLabResults;

	labResultsTextBox.setAttribute("style", "font-size:10px; position:fixed; bottom:10px; right:10px; cursor:pointer; background-color: #F2EFFB; ");
	document.body.appendChild(labResultsTextBox); 
}

function extractKeyLabResults(allLabResults){
	// console.log(allLabResults);
	let keyLabResultList = "";	
	let index = 0;
	allLabResults.forEach(	
		function(e){			
			if (!isSubResult(e)){  // add all non sub-results. i.e. add all key results.
				let labTitle = renameLabResult(e.textContent);  // join to convert array to string.
				if(keyLabResultList != "" && labTitle != ""){
					labTitle = "/" + labTitle;
				}				
				keyLabResultList += labTitle;
				// console.log(e);
// 				console.log(e.parentNode.childNodes);
	// 			console.log(e.parentNode.outerHTML);
			}
			index++
		}
	)
	
	return keyLabResultList;
}

// Purpose: checks if the Lab result is a sub-result. e.g. WBC, RBC are sub results to Hematology Panel (CBC).
// Implementation: Sub-results in OSCAR are indented with three non-breaking spaces.
// The whitespace is located just prior to the element of interest. So, we get the parentNode, and the first childNode contains the whitespace.
function isSubResult(e){
	const threeNonBreakingSpaces = "\xA0" + " " + "\xA0"+ " " + "\xA0";
	return e.parentNode.childNodes[0].nodeValue == threeNonBreakingSpaces;	
}


function renameLabResult(strOldName){
	let strNewName = strOldName;
	// console.log(strOldName);
	switch(strOldName)
	{
		case 'Hematology Panel':
			strNewName='CBC';
			break;
		case 'Vitamin B12':
			strNewName='B12';
			break;
		case 'Ferritin':
			strNewName='Fe';
			break;			
		case 'Hemoglobin A1c':
			strNewName='A1c';
			break;	
		case 'Creatinine/eGFR':
			strNewName='Cr';
			break;	
		case 'Alanine Aminotransferase':
			strNewName='ALT';
			break;	
		case 'Lipids':
			strNewName='Lipids';
			break;	
		case 'Urine Creatinine Random':
			strNewName='';
			break;	
		case 'Urine Albumin Random':
			strNewName='ACR';
			break;	
		case 'TSH':
			strNewName='TSH';
			break;	
		case 'Iron / TIBC':
			strNewName='Iron';
			break;	
		case 'Total Protein':
			strNewName='Protein';
			break;	
		case 'Total Bilirubin':
			strNewName='Bili';
			break;	
		case 'Alkaline Phosphatase':
			strNewName='ALP';
			break;
		case 'Gamma GT':
			strNewName='GGT';
			break;
		case 'Estradiol':
			strNewName='Estr';
			break;
		case 'C Reactive Protein':
			strNewName='CRP';
			break;
		case '25-Hydroxyvitamin D':
			strNewName='VitD';
			break;
		case 'Electrolytes':
			strNewName='lytes';
			break;
		case 'Albumin':
			strNewName='Alb';
			break;
		case 'T4 Free':
			strNewName='fT4';
			break;
		case 'T3 Free':
			strNewName='fT3';
			break;
		case 'Urine Culture':
			strNewName='UrineCultr';
			break;
		case 'Genital Culture':
			strNewName='GenitalCultr';
			break;
		case 'Throat Culture':
			strNewName='ThroatCultr';
			break;
		case 'Stool Culture':
			strNewName='StoolCultr';
			break;	
		case 'Hepatitis A':
			strNewName='HepA';
			break;			
		case 'Hepatitis B':
			strNewName='HepB';
			break;
		case 'Hepatitis C':
			strNewName='HepC';
			break;
		case 'Urine Chemistry/Micro':
			strNewName='UA';
			break;
		case 'Calcium':
			strNewName='Ca';
			break;
		case 'Phosphate':
			strNewName='Phos';
			break;			
		case 'Magnesium':
			strNewName='Mg';
			break;
		case 'Nuclear Ab Titre':
			strNewName='ANA';
			break;	
		case 'Rheumatoid Factor':
			strNewName='RF';
			break;
		case 'HCG Serum':
			strNewName='bHCG';
			break;	
		case 'Interpretation Hematology':
			strNewName='HemePath Comment';
			break;
		case 'Occult Blood Fecal':
			strNewName='FIT';
			break;	
		case 'B Natriuretic Peptide':
			strNewName='BNP';
			break;
		case 'Troponin':
			strNewName='Trop';
			break;	
		case 'General Information':
			strNewName='Gen Info';
			break;
		case '':
			strNewName='';
			break;				
		default:
			return renameLabResultInexactMatch(strOldName);
			break;
	}
	return strNewName;
}

function renameLabResultInexactMatch(strOldName){
	let strNewName = strOldName;
	// let strOldName = strOldName.toLowerCase();
	// console.log(strOldName);
	switch(true)
	{
		case strOldName.includes('Helicobacter'):
			strNewName='H.Pylori';
			break;
		case strOldName.includes('Follicle Stimulating Hormone'):
			strNewName='FSH';
			break;
		case strOldName.includes('Luteinizing Hormone'):
			strNewName='LH';
			break;
		case strOldName.includes('Vagina'):
			strNewName='VagSwab';
			break;
		case strOldName.includes('difficile') || strOldName.includes('Difficile'):
			strNewName='C.Diff';
			break;		
		case strOldName.includes('Ova and Parasite'):
			strNewName='O&P';
			break;	
		case strOldName.includes('Chlamydia'):
			strNewName='CT&GC';
			break;				
		case strOldName.includes('HIV'):
			strNewName='HIV';
			break;					
		case strOldName.includes('Syphilis'):
			strNewName='Syphilis';
			break;	
		case strOldName.includes('Hepatitis C'):
			strNewName='HepC';
			break;		
		case strOldName.includes('Rubella'):
			strNewName='Rubella';
			break;	
		case strOldName.includes('Glucose'):
			strNewName='Gluc';
			break;		
		case strOldName.includes('Trichomonas'):
			strNewName='Trich';
			break;	
		case strOldName.includes('Transglutaminase'):
			strNewName='anti-TTG';
			break;	
		case strOldName.includes('Herpes'):
			strNewName='HSV';
			break;	
		case strOldName.includes('genitalium'):
			strNewName='M.Genitalium';
			break;	
		case strOldName.includes('Parathyroid'):
			strNewName='PTH';
			break;
		case strOldName.includes('Troponin'):
			strNewName='Trop';
			break;
		case strOldName.includes('Trichomonas'):
			strNewName='Trich';
			break;
		case strOldName.includes('Trichomonas'):
			strNewName='Trich';
			break;
		case strOldName.includes('Trichomonas'):
			strNewName='Trich';
			break;
		case strOldName.includes('Trichomonas'):
			strNewName='Trich';
			break;
		case strOldName.includes('Trichomonas'):
			strNewName='Trich';
			break;			
		default:
			break;
	}
	return strNewName;
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