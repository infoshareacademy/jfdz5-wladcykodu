/************************************************************************
 ** Show cookies-info when user visits our site more than 30 days ago **
 **********************************************************************/



$(document).ready(function() {
    showCookiesInfo();
});


function timeComparison() {
    var time = Date.now();
    var month = 30 * 24 * 60 * 60 * 1000;

    if (localStorage.getItem("lastVisitName") - time > month) {
        localStorage.setItem("lastVisitName", time);
        document.getElementById("cookies-info").style.display = 'block';

        document.getElementById("cookieAgreement").addEventListener("click", function () {
            document.getElementById('cookies-info').style.display = "none"
        })
    } else {

    }
}

function showCookiesInfo() {
    if (localStorage.hasOwnProperty("lastVisitName")) {
        timeComparison();
    } else {
        document.getElementById("cookies-info").style.display = 'block';
        document.getElementById("cookieAgreement").addEventListener("click", function () {
            localStorage.setItem("lastVisitName",  Date.now());
            document.getElementById("cookies-info").style.display = "none"
        })
    }
}

