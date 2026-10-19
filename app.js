class Konyv {
    constructor(cim, szerzo, kiadasiEv, oldalSzam) {
        this.cim = cim;
        this.szerzo = szerzo;
        this.kiadasiEv = kiadasiEv;
        this.oldalSzam = oldalSzam;
        this.kolcsonozve = false;
    }

    kolcsonoz() {
        this.kolcsonozve = true;
    }

    visszahoz() {
        this.kolcsonozve = false;
    }
}

const egricsillagok = new Konyv("Egri csillagok", "Gárdonyi Géza", 1899, 650);
const aranyember = new Konyv("Az arany ember", "Jókai Mór", 1872, 576);
const Romeo_es_Julia = new Konyv("Romeo és Júlia", "Shakespeare", 1597, 320);

const konyvek = [egricsillagok, aranyember, Romeo_es_Julia];

function osszesKonyv() {
    const tabla = document.getElementById("konyvTabla");
    const tbody = document.querySelector("#konyvTabla tbody");

    tabla.style.display = "block";
    tbody.innerHTML = "";

    for (const konyv of konyvek) {
        const sor = document.createElement("tr");

        for (const adat of [konyv.cim, konyv.szerzo, konyv.kiadasiEv, konyv.oldalSzam]) {
            const cella = document.createElement("td");
            cella.textContent = adat;
            sor.appendChild(cella);
        }

        const allapotCella = document.createElement("td");
        allapotCella.textContent = konyv.kolcsonozve ? "igen" : "nem";
        sor.appendChild(allapotCella);

        const muveletCella = document.createElement("td");

        const kolcsonzesGomb = document.createElement("button");
        kolcsonzesGomb.textContent = "Kölcsönzés";
        kolcsonzesGomb.disabled = konyv.kolcsonozve;
        kolcsonzesGomb.addEventListener("click", () => {
            konyv.kolcsonoz();
            osszesKonyv();
        });   

        const visszahozasGomb = document.createElement("button");
        visszahozasGomb.textContent = "Visszahozás";
        visszahozasGomb.disabled = !konyv.kolcsonozve;
        visszahozasGomb.addEventListener("click", () => {
            konyv.visszahoz();
            osszesKonyv();
        });

        muveletCella.appendChild(kolcsonzesGomb);
        muveletCella.appendChild(visszahozasGomb);
        sor.appendChild(muveletCella);

        tbody.appendChild(sor);
    }  
}       




