// ==UserScript==
// @name           EChart_UpdateSidebar
// @namespace      oscar
// @include        */casemgmt/forward.jsp?action=view&*
// @description		Within the E-chart: Update the sidebar with newly created eForms when posted.
// @require   https://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @grant	   none
// ==/UserScript==



window.addEventListener("load", function(e) {
	
	addButtonLoadPostedEForm();
	addBlock();
}, false);


 // wrap in block level element so button is next line.
function addButtonLoadPostedEForm(){
	// let targetDiv = document.getElementById('buttonBlock1');
	// if (targetDiv == null){
		
	// }


	let targetDiv = document.getElementById('leftNavBar');

	
	var inputButton = document.createElement('input');
	inputButton.id = 'loadPostedEForm';
	inputButton.type = 'button';
	inputButton.value = 'Load Posted eForms';
	targetDiv.appendChild(inputButton);	
	addButtonEFormListener();
}
 
function addButtonEFormListener(){
  var theButton = document.getElementById('loadPostedEForm');
  theButton.addEventListener('click',function () { updateEFormSidebar(); },true);
}


function addBlock(){
	var targetDiv = document.getElementById('eformslist');
	var theBlock = document.createElement('div');
	theBlock.id = "postedEFormsBlock";
	theBlock.class = 'leftBox';
	targetDiv.prepend(theBlock);
}


/*
NOTE
- adds the forms that were posted today to the sidebar.
- for forms posted today that are already listed in the sidebar, my version override it and will be posted instead.
*/
function updateEFormSidebar() {

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            const prevVersionXMLText = xmlhttp.responseText;   
            if (!prevVersionXMLText) { 
                return;
            }

            const prevVersionHTML = new DOMParser().parseFromString(prevVersionXMLText, "text/html");
            const postedEFormsNodeList = prevVersionHTML.querySelectorAll(".elements > tbody:nth-child(1) > tr"); 
            const postedTodayEFormsList = findEFormsPostedToday(postedEFormsNodeList);
            // console.log(postedTodayEFormsList);

            $("#postedEFormsBlock").html("");
			$("#postedEFormsBlock").append(eFormsObjectListToHTML(postedTodayEFormsList));
			// $("#eformslist").prepend(eFormsObjectListToHTML(postedTodayEFormsList));
			// $("#leftNavBar").append(eFormsObjectListToHTML(postedTodayEFormsList));

        }
    };
	xmlhttp.open("GET", urlAddedEForms(), true);
	xmlhttp.send();
}

/*
PURPOSE:
- given list of objects with properties URL, eFormTitle, addedInfo, date, produce HTML that produces links to the eForms in question.
*/
function eFormsObjectListToHTML(eFormsObjectList){
	let htmlResult = "";
	// eFormsObjectList.length
	for (let i = 0; i < eFormsObjectList.length; i++){
		eFormObject = eFormsObjectList[i];
		// console.log(eFormObject);

		htmlResult += 

		`<li style="overflow: hidden; clear:both; position:relative; display:block; white-space:nowrap; ">
			<a border="0" style="text-decoration:none; width:7px; z-index: 100; background-color: white; position:relative; margin: 0px; padding-bottom: 0px;  vertical-align: bottom; display: inline; float: right; clear:both;"><img id="imgeformsZ`+ i + `" src="/oscar/images/clear.gif">&nbsp;&nbsp;</a>
			<span style=" z-index: 1; position:absolute; margin-right:10px; width:90%; overflow:hidden;  height:1.5em; white-space:nowrap; float:left; text-align:left; ">
			<a class="links" style="" onmouseover="this.className='linkhover'" onmouseout="this.className='links'" href="#" onclick = "window.open('`+ eFormObject.URL + `', '_blank', 'height=700,width=800,scrollbars=yes,status=yes');return false;" title="` + eFormObject.eFormTitle + `, ">` + 
			eFormObject.eFormTitle + eFormObject.addedInfo + `, 
			</a>
			</span>
			<span style="z-index: 100; background-color: white; overflow:hidden;   position:relative; height:1.5em; white-space:nowrap; float:right; text-align:right;">
			...<a class="links" style="margin-right: 2px;" onmouseover="this.className='linkhover'" onmouseout="this.className='links'" href="#" onclick = "window.open('`+ eFormObject.URL + `', '_blank', 'height=700,width=800,scrollbars=yes,status=yes');return false;" title="` + eFormObject.eFormTitle + `, ">` 
			+ eFormObject.date + `			
			</a>
			</span>
		</li>`
	}
	// console.log(htmlResult);
	return htmlResult;
}


/*
PURPOSE:
- takes the node list and outputs objects describing each eForm, with URL, title, Additional Info, and date.
- only outputs objects with eforms that match today's date.
*/
function findEFormsPostedToday(postedEFormsNodeList){
	//console.log(postedEFormsNodeList);
	let postedEFormsObjectList = [];
	for (let i=1; i < postedEFormsNodeList.length; i++){
		currentNode = postedEFormsNodeList[i];
		nodeChildren = currentNode.children;
		// console.log(nodeChildren);
		nodeURLOuterHTML = nodeChildren[0].children[0].outerHTML;
		nodeURL = getURLOrigin() + 'eform/'+ nodeURLOuterHTML.split("\'")[1];
		nodeEFormTitle = nodeChildren[0].children[0].textContent;
		nodeAddedInfo = nodeChildren[1].textContent;
		nodeDate = nodeChildren[2].textContent;

		// stops when the eForm date doesn't match today's date. assumes dates are sorted.
		if (!isToday(nodeDate)){
			break;
		}
		const postedEFormObject = {
			URL: nodeURL,
			eFormTitle: nodeEFormTitle,
			addedInfo: nodeAddedInfo,
			date: nodeDate
		}
		postedEFormsObjectList.push(postedEFormObject);
		// console.log(nodeURL);
		// console.log(nodeAddedInfo);
		// console.log(nodeDate);
	}
	return postedEFormsObjectList;
}

function isToday(eFormFullDate){
	const splitEFormFullDate = eFormFullDate.split('-');
	const eFormYear = splitEFormFullDate[0];
	const eFormMonth = splitEFormFullDate[1];
	const eFormDate = splitEFormFullDate[2];
	
	const today = new Date();
	const todayDate = today.getDate();
	const todayMonth = today.getMonth() + 1;
	const todayYear = today.getFullYear();

	// console.log(eFormDate == todayDate && eFormMonth == todayMonth && eFormYear == todayYear);
	return eFormDate == todayDate && eFormMonth == todayMonth && eFormYear == todayYear;
}



/*
PURPOSE
- get URL of the eForms already added.
*/
function urlAddedEForms(){
	var newURL = getURLOrigin() + "eform/efmpatientformlist.jsp?demographic_no="+ getDemographicNum() + "&apptProvider=null&appointment=null&parentAjaxId=eforms";

	return newURL;
}

function getURLOrigin(){
	var urlElements = (window.location.pathname.split('/', 2));
	firstUrlElement = (urlElements.slice(1));
	return window.location.origin + '/' + firstUrlElement + '/';
}


function getDemographicNum(){
	var params = {}; //Get Params
	if (location.search) {
	    var parts = location.search.substring(1).split('&');
	    for (var i = 0; i < parts.length; i++) {
	        var nv = parts[i].split('=');
	        if (!nv[0]) continue;``
	        params[nv[0]] = nv[1] || true;
	    }
	}

	return params.demographicNo;

}

