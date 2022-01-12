function URLBuilder(layer,start,end,nuclide){

    url = new URL("https://www.imis.bfs.de/ogc/opendata/ows")
	url.searchParams.append("service","WFS")
	url.searchParams.append("version","1.0.0")
	url.searchParams.append("request","GetFeature")
	url.searchParams.append("typeName","opendata:" + layer)
	if(layer == 'new_gamma_aerosole_24h'){
		url.searchParams.append("CQL_FILTER","(end_measure="+end+") AND (nuclide = '"+nuclide+"')")
	}
	if(layer == 'odl_brutto_1h'){
		url.searchParams.append("CQL_FILTER","(end_measure="+end+") AND (source = 'BfS')")
	}else{
		url.searchParams.append("CQL_FILTER","(sample_begin DURING "+start+"/"+end+") AND (nuclide = '"+nuclide+"')")
		url.searchParams.append("VIEWPARAMS","order:sample_begin")
	}
	url.searchParams.append("outputFormat","application/json")

    return url.href
}
/**
* Hides all the firts children divs in a div. Does not modify de internal divs of the children.
* @method function libs_general_hideAllDivsInDiv
* @param {str} divName - string with the id of the div that contains all the divs to hide
* @return none
*/
function libs_general_hideAllDivsInDiv(divName) {
	var selector="#" + divName + ">div"//select all divs wich the parent is divname (only the first level)
    var divs= document.querySelectorAll(selector);
	var div;
	var n=divs.length;
	var i;
    for (i = 0; i < n; i++) {
    	div=divs[i];
    	div.style.display = 'none';//hide the div BLOCK
    }
}
function libs_general_showAllDivsInDiv(divName) {
	var selector="#" + divName + ">div"//select all divs wich the parent is divname (only the first level)
    var divs= document.querySelectorAll(selector);
	var div;
	var n=divs.length;
	var i;
    for (i = 0; i < n; i++) {
    	div=divs[i];
    	div.style.display = 'block';//hide the div BLOCK
    }
}
/**
* Hides all the divs in a div, except one
* @method libs_general_hideAllDivsInDivExceptOne
* @param {str} divParentName - string with the id of the div that contains all the divs to hide and the div to show
* @param {str} divName - string with the id of the div in the divParentName to show
* @return none
*/
function libs_general_hideAllDivsInDivExceptOne(divParentName, divName) {
	libs_general_hideAllDivsInDiv(divParentName);
	var selector="#" + divName;
	var div= document.querySelector(selector);//selects only one
	div.style.display = 'block';
}

function avg(list){
	return list.reduce((a, b) => (a+b)) / list.length;
}