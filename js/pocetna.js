function Destinacija(ime, kategorija, denovi, smestuvanje, hrana, prevoz)
{
    this.ime = ime;
    this.kategorija = kategorija;
    this.denovi = denovi;
    this.smestuvanje = smestuvanje;
    this.hrana = hrana;
    this.prevoz = prevoz;

    this.troshoci = function() {
        return this.denovi * (this.smestuvanje + this.hrana) + this.prevoz;
    };
}

var destinacii = [];

// ===== Прикажување во табела =====
function prikazi(niza)
{
    var tabela = document.getElementById("tabela-destinacii");
    tabela.innerHTML = "";

    var vkupno = 0;

    for (var i = 0; i < niza.length; i++)
    {
        var d = niza[i];
        var red = document.createElement("tr");

        var k1 = document.createElement("td");
        k1.innerHTML = d.ime;
        red.appendChild(k1);

        var k2 = document.createElement("td");
        k2.innerHTML = d.kategorija;
        red.appendChild(k2);

        var k3 = document.createElement("td");
        k3.innerHTML = d.denovi;
        red.appendChild(k3);

        var k4 = document.createElement("td");
        k4.innerHTML = Math.round(d.troshoci() * 100) / 100;
        red.appendChild(k4);

        // 4а: копче Избриши
        var k5 = document.createElement("td");
        var kopce = document.createElement("input");
        kopce.type = "button";
        kopce.value = "Избриши";
        kopce.destinacija = d;
        kopce.addEventListener("click", izbrishi);
        k5.appendChild(kopce);
        red.appendChild(k5);

        tabela.appendChild(red);

        vkupno += d.troshoci();
    }

    document.getElementById("vkupno-troshoci").innerHTML = Math.round(vkupno * 100) / 100;

    var prazna = document.getElementById("prazna-lista");
    if (niza.length == 0)
    {
        prazna.innerHTML = (destinacii.length == 0) ? "Сè уште немате додадено дестинации." : "Нема дестинации за избраните филтри.";
        prazna.style.display = "block";
    }
    else
    {
        prazna.style.display = "none";
    }
}
function izbrishi()
{
    var zaBrishenje = this.destinacija;
    var nova = [];

    for (var i = 0; i < destinacii.length; i++)
    {
        if (destinacii[i] != zaBrishenje)
        {
            nova.push(destinacii[i]);
        }
    }

    destinacii = nova;
    prikazi(destinacii);
}
function dodajDestinacija()
{
    var ime = document.getElementById("dest-ime").value;
    var kategorija = document.getElementById("dest-kategorija").value;
    var denovi = document.getElementById("dest-denovi").value;
    var smestuvanje = document.getElementById("dest-smestuvanje").value;
    var hrana = document.getElementById("dest-hrana").value;
    var prevoz = document.getElementById("dest-prevoz").value;

    var greska = document.getElementById("greska-destinacija");

    if (ime == "" || denovi == "" || smestuvanje == "" || hrana == "" || prevoz == "")
    {
        greska.innerHTML = "Пополнете ги сите полиња!";
        return false;
    }

    if (parseInt(denovi) < 1)
    {
        greska.innerHTML = "Бројот на денови мора да е барем 1!";
        return false;
    }

    greska.innerHTML = "";

    var nova = new Destinacija(ime, kategorija, parseInt(denovi), parseFloat(smestuvanje), parseFloat(hrana), parseFloat(prevoz));
    destinacii.push(nova);
    prikazi(destinacii);

    document.getElementById("dest-ime").value = "";
    document.getElementById("dest-denovi").value = "";
    document.getElementById("dest-smestuvanje").value = "";
    document.getElementById("dest-hrana").value = "";
    document.getElementById("dest-prevoz").value = "";

    return false;  
}

document.getElementById("forma-destinacija").onsubmit = dodajDestinacija;

function filtriraj()
{
    var kategorija = document.getElementById("filter-kategorija").value;
    var budzetTekst = document.getElementById("filter-budzet").value;
    var rezultat = [];

    for (var i = 0; i < destinacii.length; i++)
    {
        var d = destinacii[i];
        var dobraKategorija = (kategorija == "site" || d.kategorija == kategorija);
        var dobarBudzet = (budzetTekst == "" || d.troshoci() <= parseFloat(budzetTekst));

        if (dobraKategorija && dobarBudzet)
        {
            rezultat.push(d);
        }
    }

    prikazi(rezultat);
}

document.getElementById("kopce-filtriraj").addEventListener("click", filtriraj);
