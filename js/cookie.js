//chrome.exe -enable-file-cookies

function createCookie(name, value, exdays)
{
// fonction qui cree/modifie un cookie
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value = escape(value) + 
    ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
  document.cookie = name + "=" + c_value;
}

function readCookie(name) {
// fonction qui lit un cookie
  var i, x, y, ARRcookies = document.cookie.split(";");
  for (i = 0; i < ARRcookies.length; i++)
  {
    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
    y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
    x = x.replace(/^\s+|\s+$/g, "");
    if (x == name)
    {
      return unescape(y);
    }
  }
  return null;
}

function initNotSetCookieZero(name) {
//fonction qui renvoie 0 si le cookie est vide, sinon elle renvoie la valeur du cookie
	if(readCookie(name)== "" || readCookie(name)== null){
		return "0";
	}
	else{
		return readCookie(name);
	}
}