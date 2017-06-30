/************************************************************************
 ** Show cookies-info when user visits our site more than 30 days ago **
 **********************************************************************/

/**
localStorage.hasOwnProperty("DATE")
    KIEDY
    false

        I WYSWIETLIJ DIVA Z KOMUNIKATEM
    true
        localStorage.getItem("DATE")
            JEŚLLI
            "DATE" PONIZEJ 30 DNI TO
                NIC
            JESLI "DATE" POWYŻEJ 30 DNI TO
                localStorage.setItem("DATE", "DATA WEJSCIA NA STR"); /CZYLI PODMIANA DATY/
                I WYSWIETLIJ DIVA Z KOMUNIKATEM
**/


/*
 getTime()	- zwraca aktualny czas jako liczbę reprezentującą liczbę milisekund która upłynęła od godziny 00:00 1 stycznia 1970 roku  --> (new Date).getTime()
30 day = 720 h = 43 200 min = 2 592 000 s = 2 592 000 000 ms
*/




function showCookiesInfo() {
    if (localStorage.hasOwnProperty("lastVisitTime")) {
        function timeComparison() {
            if (localStorage.getItem("lastVisitName") - (new Date).getTime() > 2592000000) {
                localStorage.setItem("lastVisitName", "(new Date).getTime()");
                document.getElementsByTagName("cookies-button").setAttribute("display", "");
                document.getElementsByTagName("cookies-button").addEventListener("click", document.getElementById(cookies-info).style.display = "none")
            } else {}
        }
    } else {
        localStorage.setItem("lastVisitName", "(new Date).getTime()");
        document.getElementsByTagName("cookies-button").setAttribute("display", "");
        document.getElementsByTagName("cookies-button").addEventListener("click", document.getElementById(cookies-info).style.display = "none")
    }
}

