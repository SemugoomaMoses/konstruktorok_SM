class Konyv {
    constructor(cim, szerzo, kiadasiEv, oldalSzam, kategoria, kolcsonozve = false) {
        this.cim = cim;
        this.szerzo = szerzo;
        this.kiadasiEv = kiadasiEv;
        this.oldalSzam = oldalSzam;
        this.kategoria = kategoria;
        this.kolcsonozve = kolcsonozve;
    }

    kolcsonoz() {
        this.kolcsonozve = true;
    }

    visszahoz() {
        this.kolcsonozve = false;
    }
}

let konyvek = [];
konyvek.push(new Konyv("Egri csillagok", "Gárdonyi Géza", 1899, 650, "Történelmi"));
konyvek.push(new Konyv("Az arany ember", "Jókai Mór", 1872, 576, "Regény"));
konyvek.push(new Konyv("Romeo és Júlia", "Shakespeare", 1597, 320, "Regény"));
konyvek.push(new Konyv("A Pál utcai fiúk", "Molnár Ferenc", 1906, 200, "Regény", true));

let csakSzabad = false;
let kategoria = "";


function tablaKirajzol() {
    document.getElementById("konyvTabla").style.display = "block";
    let tbody = document.querySelector("#konyvTabla tbody");
    tbody.innerHTML = "";

    for (let i = 0; i < konyvek.length; i++) {
        let k = konyvek[i];
        let kiir = true;


        if (csakSzabad == true && k.kolcsonozve == true) {
            kiir = false;
        }


        if (kategoria != "" && k.kategoria != kategoria) {
            kiir = false;
        }

        if (kiir == true) {
            let kolcsonozveSzoveg = "nem";
            let kolcsonzesGomb = "";
            let visszahozasGomb = " disabled";

            if (k.kolcsonozve == true) {
                kolcsonozveSzoveg = "igen";
                kolcsonzesGomb = " disabled";
                visszahozasGomb = "";
            }

            tbody.innerHTML = tbody.innerHTML +
                "<tr>" +
                "<td>" + k.cim + "</td>" +
                "<td>" + k.szerzo + "</td>" +
                "<td>" + k.kiadasiEv + "</td>" +
                "<td>" + k.oldalSzam + "</td>" +
                "<td>" + k.kategoria + "</td>" +
                "<td>" + kolcsonozveSzoveg + "</td>" +
                "<td>" +
                "<button onclick='kolcsonzes(" + i + ")'" + kolcsonzesGomb + ">Kölcsönzés</button>" +
                "<button onclick='visszahozas(" + i + ")'" + visszahozasGomb + ">Visszahozás</button>" +
                "<button class='torles' onclick='torles(" + i + ")'>Törlés</button>" +
                "</td>" +
                "</tr>";
        }
    }
}

function osszesKonyv() {
    csakSzabad = false;
    tablaKirajzol();
}

function szabadKonyvek() {
    csakSzabad = true;
    tablaKirajzol();
}

function kategoriaSzures() {
    kategoria = document.getElementById("kategoriaValaszto").value;
    tablaKirajzol();
}

function kolcsonzes(i) {
    konyvek[i].kolcsonoz();
    tablaKirajzol();
}

function visszahozas(i) {
    konyvek[i].visszahoz();
    tablaKirajzol();
}

function torles(i) {
    konyvek.splice(i, 1);
    tablaKirajzol();
}


function urlapMegjelenit() {
    let urlap = document.getElementById("ujKonyvUrlap");
    if (urlap.style.display == "flex") {
        urlap.style.display = "none";
    } else {
        urlap.style.display = "flex";
    }
}

function konyvHozzaad() {
    let cim = document.getElementById("cimInput").value;
    let szerzo = document.getElementById("szerzoInput").value;
    let ev = Number(document.getElementById("evInput").value);
    let oldal = Number(document.getElementById("oldalInput").value);
    let kat = document.getElementById("kategoriaInput").value;

    if (cim == "" || szerzo == "" || ev == 0 || oldal == 0 || kat == "") {
        alert("Minden mezőt ki kell tölteni!");
        return;
    }

    konyvek.push(new Konyv(cim, szerzo, ev, oldal, kat));


    document.getElementById("cimInput").value = "";
    document.getElementById("szerzoInput").value = "";
    document.getElementById("evInput").value = "";
    document.getElementById("oldalInput").value = "";
    document.getElementById("kategoriaInput").value = "";
    document.getElementById("ujKonyvUrlap").style.display = "none";

    tablaKirajzol();
}

function legregebbiKonyv() {
    let legregebbi = konyvek[0];

    for (let i = 1; i < konyvek.length; i++) {
        if (konyvek[i].kiadasiEv < legregebbi.kiadasiEv) {
            legregebbi = konyvek[i];
        }
    }

    document.getElementById("eredmeny").innerHTML =
        "<strong>Legrégebbi könyv:</strong><br>" + legregebbi.cim + " (" + legregebbi.kiadasiEv + ")";
}

function legvastagabbKonyv() {
    let legvastagabb = konyvek[0];

    for (let i = 1; i < konyvek.length; i++) {
        if (konyvek[i].oldalSzam > legvastagabb.oldalSzam) {
            legvastagabb = konyvek[i];
        }
    }

    document.getElementById("eredmeny").innerHTML =
        "<strong>Legvastagabb könyv:</strong><br>" + legvastagabb.cim + " (" + legvastagabb.oldalSzam + " oldal)";
}

function atlagosOldalszam() {
    let osszeg = 0;

    for (let i = 0; i < konyvek.length; i++) {
        osszeg = osszeg + konyvek[i].oldalSzam;
    }

    let atlag = Math.round(osszeg / konyvek.length);

    document.getElementById("eredmeny").innerHTML =
        "<strong>Átlagos oldalszám:</strong> " + atlag + " oldal";
}