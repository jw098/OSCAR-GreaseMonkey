// ==UserScript==
// @name           EChart_UpdateSidebar
// @namespace      oscar
// @include        */casemgmt/forward.jsp?action=view&*
// @description		Within the E-chart: Update the sidebar with newly created eForms when posted.
// @require   https://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @grant	   none
// ==/UserScript==


/////////////////////////////////////////////////////
// Buttons, Event Listeners
/////////////////////////////////////////////////////

// document.addEventListener("visibilitychange", function(e){
// 	updateEFormSidebar();
// }, false);

window.addEventListener("focus", function(event) 
{ 
  updateEFormSidebar();
  // console.log("window has focus ");
}, false);

window.addEventListener("load", function(e) {
	
	addButtonLoadPostedEForm();
	// addPostedEFormsBlock();
	updateEFormSidebar();
}, false);


 // wrap in block level element so button is next line.
function addButtonLoadPostedEForm(){
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


function addPostedEFormsBlock(){
	// if the postedItemsBlock exists, don't create another one.
	if (!!document.getElementById('postedEFormsBlock')){  
		return;
	}

	var targetDiv = document.getElementById('eformslist');
	var theBlock = document.createElement('div');
	theBlock.id = "postedEFormsBlock";
	theBlock.className = 'links';
	targetDiv.before(theBlock);
}

/////////////////////////////////////////////////////
// Update eForm Sidebar
/////////////////////////////////////////////////////

/*
NOTE
- adds the forms that were posted today to the sidebar.
- for forms posted today that are already listed in the sidebar, my version override it and will be posted instead.
*/
function updateEFormSidebar() {

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            const otherPageXMLText = xmlhttp.responseText;   
            if (!otherPageXMLText) { 
                return;
            }

            const otherPageHTML = new DOMParser().parseFromString(otherPageXMLText, "text/html");
            const postedItemsNodeList = otherPageHTML.querySelectorAll(".elements > tbody:nth-child(1) > tr"); 
            const postedItemsTodayList = findEFormsPostedToday(postedItemsNodeList);

            // removeEChartEFormsPostedToday();
            addPostedEFormsBlock();
            // console.log(postedItemsTodayList);
            $("#postedEFormsBlock").html("");
			$("#postedEFormsBlock").append(eFormsObjectListToHTML(postedItemsTodayList));

        }
    };
	xmlhttp.open("GET", urlAddedEForms(), true);
	xmlhttp.send();
}

function removeEChartEFormsPostedToday(){
	const eChartPostedTodayEFormsNodeList = $("#eformslist > li > span > a:contains('" + todayDateDDMMMYYYY() + "')");

	for (i = 0; i < eChartPostedTodayEFormsNodeList.length; i++){
		eFormPostedTodayInEChart = eChartPostedTodayEFormsNodeList[i].parentNode.parentNode;
		// console.log(eFormPostedTodayInEChart);
		eFormPostedTodayInEChart.remove();
	}
    // console.log(eChartPostedTodayEFormsNodeList);
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
			<a class="links" style="" onmouseover="this.className='linkhover'" onmouseout="this.className='links'" href="#" onclick = "window.open('` + eFormObject.URL + `', '_blank', 'scrollbars=yes,status=yes');return false;" title="` + eFormObject.addedInfo + `">` + 
			eFormObject.eFormTitle + ': ' + eFormObject.addedInfo + 
			`</a>
			</span>
			<span style="z-index: 100; background-color: white; overflow:hidden;   position:relative; height:1.5em; white-space:nowrap; float:right; text-align:right;">
			...<a class="links" style="margin-right: 2px;" onmouseover="this.className='linkhover'" onmouseout="this.className='links'" href="#" onclick = "window.open('`+ eFormObject.URL + `', '_blank', 'scrollbars=yes,status=yes');return false;" title="` + eFormObject.addedInfo + `">` 
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
NOTE:
- avoid posting items already posted in eChart. If item from other page matches FDID of first element in eChart, then stop. Assumes that eForms are sorted by date.
*/
function findEFormsPostedToday(postedEFormsNodeList){
	//console.log(postedEFormsNodeList);
	const firstEChartEFormFDID = getFirstEChartEFormFDID();
	let postedEFormsObjectList = [];
	for (let i=1; i < postedEFormsNodeList.length; i++){
		currentNode = postedEFormsNodeList[i];
		nodeChildren = currentNode.children;
		// console.log(nodeChildren);
		nodeURLOuterHTML = nodeChildren[0].children[0].outerHTML;
		nodeFDID = nodeURLOuterHTML.split("fdid=")[1].split("&")[0];
		// console.log(nodeURLOuterHTML);
		// console.log(nodeFDID);
		nodeDate = nodeChildren[2].textContent;

		/*
		- stops when the eForm date doesn't match today's date. assumes dates are sorted.
		- also stops if eForm from other page matches FDID of first eForm in eChart.
		*/
		if (!isToday(nodeDate) || firstEChartEFormFDID == nodeFDID){
			break;
		}

		nodeURL = getURLOrigin() + 'eform/'+ nodeURLOuterHTML.split("\'")[1];
		nodeEFormTitle = nodeChildren[0].children[0].textContent;
		nodeAddedInfo = nodeChildren[1].textContent;
		


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

function getFirstEChartEFormFDID(){
	const firstEChartEForm = $("#eformslist > li:first-of-type > span:nth-child(2) > a:nth-child(1)"); 
	// console.log(firstEChartEForm[0].outerHTML);
	const FDID = firstEChartEForm[0].outerHTML.split("fdid=")[1].split("&")[0];
	return FDID;
}


/////////////////////////////////////////////////////
// Update Consultations Sidebar
/////////////////////////////////////////////////////
updateConsultationsSidebar();
/*
NOTE
- adds the forms that were posted today to the sidebar.
- for forms posted today that are already listed in the sidebar, my version override it and will be posted instead.
*/
function updateConsultationsSidebar() {

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            const otherPageXMLText = xmlhttp.responseText;   
            if (!otherPageXMLText) { 
                return;
            }

            const otherPageHTML = new DOMParser().parseFromString(otherPageXMLText, "text/html");
            const postedItemsNodeList = otherPageHTML.querySelectorAll(".MainTableRightColumn > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr"); 
            console.log('hi');
            const postedItemsTodayList = findConsultsPostedToday(postedItemsNodeList);
		console.log('hi');
            removeEChartConsultsPostedToday();
            
            $("#postedEFormsBlock").html("");
			$("#postedEFormsBlock").append(eFormsObjectListToHTML(postedItemsTodayList));

        }
    };
	xmlhttp.open("GET", urlAddedConsults(), true);
	xmlhttp.send();
}

function removeEChartConsultsPostedToday(){
	const eChartPostedTodayEFormsNodeList = $("#eformslist > li > span > a:contains('" + todayDateDDMMMYYYY() + "')");

	for (i = 0; i < eChartPostedTodayEFormsNodeList.length; i++){
		eFormPostedTodayInEChart = eChartPostedTodayEFormsNodeList[i].parentNode.parentNode;
		// console.log(eFormPostedTodayInEChart);
		eFormPostedTodayInEChart.remove();
	}
    // console.log(eChartPostedTodayEFormsNodeList);
}

/*
PURPOSE:
- given list of objects with properties URL, eFormTitle, addedInfo, date, produce HTML that produces links to the eForms in question.
*/
function consultsObjectListToHTML(eFormsObjectList){
	let htmlResult = "";
	// eFormsObjectList.length
	for (let i = 0; i < eFormsObjectList.length; i++){
		eFormObject = eFormsObjectList[i];
		// console.log(eFormObject);

		htmlResult += 

		`<li style="overflow: hidden; clear:both; position:relative; display:block; white-space:nowrap; ">
			<a border="0" style="text-decoration:none; width:7px; z-index: 100; background-color: white; position:relative; margin: 0px; padding-bottom: 0px;  vertical-align: bottom; display: inline; float: right; clear:both;"><img id="imgeformsZ`+ i + `" src="/oscar/images/clear.gif">&nbsp;&nbsp;</a>
			<span style=" z-index: 1; position:absolute; margin-right:10px; width:90%; overflow:hidden;  height:1.5em; white-space:nowrap; float:left; text-align:left; ">
			<a class="links" style="" onmouseover="this.className='linkhover'" onmouseout="this.className='links'" href="#" onclick = "window.open('` + eFormObject.URL + `', '_blank', 'height=700,width=800,scrollbars=yes,status=yes');return false;" title="` + eFormObject.addedInfo + `">` + 
			eFormObject.eFormTitle + ': ' + eFormObject.addedInfo + 
			`</a>
			</span>
			<span style="z-index: 100; background-color: white; overflow:hidden;   position:relative; height:1.5em; white-space:nowrap; float:right; text-align:right;">
			...<a class="links" style="margin-right: 2px;" onmouseover="this.className='linkhover'" onmouseout="this.className='links'" href="#" onclick = "window.open('`+ eFormObject.URL + `', '_blank', 'height=700,width=800,scrollbars=yes,status=yes');return false;" title="` + eFormObject.addedInfo + `">` 
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
- takes the node list and outputs objects describing each item, with Service, referral date.
- only outputs objects with items that match today's date.
*/
function findConsultsPostedToday(postedItemNodeList){
	console.log(postedItemNodeList);
	let postedItemObjectList = [];
	for (let i=1; i < postedItemNodeList.length; i++){
		currentNode = postedItemNodeList[i];
		nodeChildren = currentNode.children;
		// console.log(nodeChildren);
		nodeURLOuterHTML = nodeChildren[1].children[0].outerHTML;
		/*
		- gets the URL portion of the HTML in the <a> element, by using split("\'"). and selecting the item at index 1.
		- then removes the "../.." with substring(6)
		- then replaces &amp; with &
		*/
		nodeURL = getURLOrigin() + nodeURLOuterHTML.split("\'")[1].substring(6).replace(/&amp;/g, "&");
		nodeItemsTitle = nodeChildren[3].children[0].innerText.replace(/[\r\n\t]/g, "");
		nodeRequestingDoc = nodeChildren[2].textContent;
		nodeDate = nodeChildren[4].textContent;
		nodeConsultantDoc = getConsultantDoctor(nodeURL);
		// console.log(nodeURL);
		// console.log(nodeItemsTitle);
		// console.log(nodeRequestingDoc);
		// console.log(nodeDate);

		// stops when the item date doesn't match today's date. assumes dates are sorted.
		// if (!isToday(nodeDate)){
		// 	break;
		// }
		const postedItemObject = {
			URL: nodeURL,
			itemTitle: nodeItemsTitle,
			consultantDoc: nodeConsultantDoc,
			requestingDoc: nodeRequestingDoc,
			date: nodeDate
		}
		console.log(postedItemObject);
		postedItemObjectList.push(postedItemObject);


	}
	return postedEFormsObjectList;
}

function getConsultantDoctor(consultItemURL){
	let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            const otherPageXMLText = xmlhttp.responseText;   
            if (!otherPageXMLText) { 
                return;
            }

	        const otherPageHTML = new DOMParser().parseFromString(otherPageXMLText, "text/html");
	        asdf = otherPageHTML.querySelectorAll('#specialist > option:nth-child(2)');
			console.log(consultItemURL);
			console.log(otherPageHTML.querySelectorAll('#specialist'));
			console.log(asdf);
			return otherPageHTML.querySelectorAll('#specialist > option:nth-child(2)')[0].textContent;
        }
    };
	xmlhttp.open("GET", consultItemURL, true);
	xmlhttp.send();
}



/////////////////////////////////////////////////////
// Date
/////////////////////////////////////////////////////

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

function todayDateDDMMMYYYY(){
	const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	const today = new Date();
	const todayDate = today.getDate();
	const todayMonth = month[today.getMonth()];
	const todayYear = today.getFullYear();

	const todayFullDate = todayDate + '-' + todayMonth + '-' + todayYear;
	return todayFullDate;
}
	

/////////////////////////////////////////////////////
// get URL, URL elements
/////////////////////////////////////////////////////

/*
PURPOSE
- get URL of the eForms already added.
*/
function urlAddedEForms(){
	var newURL = getURLOrigin() + "eform/efmpatientformlist.jsp?demographic_no="+ getDemographicNum() + "&apptProvider=null&appointment=null&parentAjaxId=eforms";

	return newURL;
}

console.log(urlAddedConsults());

function urlAddedConsults(){
	var newURL = getURLOrigin() + "oscarEncounter/oscarConsultationRequest/DisplayDemographicConsultationRequests.jsp?de="+ getDemographicNum() + "&appNo=null";

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

