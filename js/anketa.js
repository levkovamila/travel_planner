// ===== Одговори од анкетата: секој одговор е објект во низата =====
function Odgovor(ime, email, vozrast, ocena, delovi, preporaka, komentar)
{
    this.ime = ime;
    this.email = email;
    this.vozrast = vozrast;
    this.ocena = ocena;
    this.delovi = delovi;
    this.preporaka = preporaka;
    this.komentar = komentar;
}

var odgovori = [];

// вчитување на претходно зачуваните одговори
var zacuvaniOdgovori = localStorage.getItem("odgovori");
if (zacuvaniOdgovori != null)
{
    odgovori = JSON.parse(zacuvaniOdgovori);
}

function izbranoRadio(ime)
{
    var opcii = document.getElementsByName(ime);
    for (var i = 0; i < opcii.length; i++)
    {
        if (opcii[i].checked)
        {
            return opcii[i].value;
        }
    }
    return "";   // ништо не е избрано
}

function isprati()
{
    var ime = document.getElementById("anketa-ime").value;
    var email = document.getElementById("anketa-email").value;
    var vozrast = document.getElementById("anketa-vozrast").value;
    var komentar = document.getElementById("anketa-komentar").value;

    var ocena = izbranoRadio("ocena");
    var preporaka = izbranoRadio("preporaka");
    var delovi = document.getElementsByName("delovi");
    var izbraniDelovi = [];
    for (var i = 0; i < delovi.length; i++)
    {
        if (delovi[i].checked)
        {
            izbraniDelovi.push(delovi[i].value);
        }
    }
    var greska = document.getElementById("greska-anketa");

    if (ime == "" || email == "" || vozrast == "")
    {
        greska.innerHTML = "Пополнете ги име, е-пошта и возраст!";
        return false;
    }

    if (email.indexOf("@") == -1)
    {
        greska.innerHTML = "Невалидна е-пошта!";
        return false;
    }

    if (ocena == "" || preporaka == "")
    {
        greska.innerHTML = "Изберете оцена и дали би го препорачале сајтот!";
        return false;
    }

    greska.innerHTML = "";

    // одговорот се зачувува во низата и се прикажуваат резултатите
    odgovori.push(new Odgovor(ime, email, vozrast, parseInt(ocena), izbraniDelovi, preporaka, komentar));
    localStorage.setItem("odgovori", JSON.stringify(odgovori));

    document.getElementById("rezultat-tekst").innerHTML = "Ви благодариме, " + ime + "! Вашиот одговор е зачуван.";
    prikaziRezultati();

    document.getElementById("forma-anketa").style.display = "none";
    document.getElementById("rezultat-anketa").style.display = "block";

    return false;
}

// ===== Резултати: статистика и табела со сите одговори =====
function prikaziRezultati()
{
    var tabela = document.getElementById("tabela-odgovori");
    tabela.innerHTML = "";

    var zbir = 0;
    var preporacuvaat = 0;

    for (var i = 0; i < odgovori.length; i++)
    {
        var o = odgovori[i];
        var red = document.createElement("tr");

        var k1 = document.createElement("td");
        k1.innerHTML = o.ime;
        red.appendChild(k1);

        var k2 = document.createElement("td");
        k2.innerHTML = o.vozrast;
        red.appendChild(k2);

        var k3 = document.createElement("td");
        k3.innerHTML = o.ocena + " / 5";
        red.appendChild(k3);

        var k4 = document.createElement("td");
        k4.innerHTML = (o.delovi.length == 0) ? "ниту еден" : o.delovi.join(", ");
        red.appendChild(k4);

        var k5 = document.createElement("td");
        k5.innerHTML = o.preporaka;
        red.appendChild(k5);

        var k6 = document.createElement("td");
        k6.innerHTML = o.komentar;
        red.appendChild(k6);

        tabela.appendChild(red);

        zbir += o.ocena;
        if (o.preporaka == "Да")
        {
            preporacuvaat++;
        }
    }

    document.getElementById("broj-odgovori").innerHTML = odgovori.length;
    document.getElementById("prosecna-ocena").innerHTML = Math.round(zbir / odgovori.length * 10) / 10;
    document.getElementById("broj-preporaka").innerHTML = preporacuvaat + " од " + odgovori.length;
}

// Нов одговор: формата се празни и пак се прикажува, резултатите остануваат
function novOdgovor()
{
    document.getElementById("forma-anketa").reset();
    document.getElementById("forma-anketa").style.display = "block";
    document.getElementById("rezultat-tekst").innerHTML = "";
}

document.getElementById("forma-anketa").onsubmit = isprati;
document.getElementById("kopce-nov-odgovor").addEventListener("click", novOdgovor);

// ако веќе има зачувани одговори, резултатите се гледаат под формата
if (odgovori.length > 0)
{
    prikaziRezultati();
    document.getElementById("rezultat-anketa").style.display = "block";
}
