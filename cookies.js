/************************************************************************
 ** Show cookies-info when user visits our site more than 30 days ago **
 **********************************************************************/


/*
notatki:
 getTime()	- zwraca aktualny czas jako liczbę reprezentującą liczbę milisekund która upłynęła od godziny 00:00 1 stycznia 1970 roku  --> (new Date).getTime()
30 day = 720 h = 43 200 min = 2 592 000 s = 2 592 000 000 ms
*/




function showCookiesInfo() {
    if (localStorage.hasOwnProperty("lastVisitTime")) {
        function timeComparison() {
            if (localStorage.getItem("lastVisitName") - (new Date).getTime() > 2592000000) {
                localStorage.setItem("lastVisitName", "(new Date).getTime()");
                document.getElementById("cookies-button").setAttribute("display", "");
                document.getElementById("cookies-button").addEventListener("click", document.getElementById(cookies-info).style.display = "none")
            } else {}
        }
    } else {
        localStorage.setItem("lastVisitName", "(new Date).getTime()");
        document.getElementById("cookies-button").setAttribute("display", "");
        document.getElementById("cookies-button").addEventListener("click", document.getElementById("cookies-info").style.display = "none")
    }
}

