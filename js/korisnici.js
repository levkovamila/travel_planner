
function Korisnik(korisnickoIme, lozinka)
{
    this.korisnickoIme = korisnickoIme;
    this.lozinka = lozinka;
}

var korisnici = [];

// Вчитување на зачуваните корисници (зачувани се како JSON текст)
var zacuvani = localStorage.getItem("korisnici");
if (zacuvani == null)
{
    korisnici.push(new Korisnik("student", "1234"));   // еден корисник за проба
}
else
{
    korisnici = JSON.parse(zacuvani);
}

function zacuvajKorisnici()
{
    localStorage.setItem("korisnici", JSON.stringify(korisnici));
}

// Header-от во состојба "најавен": поздрав и копче Одјава
function prikaziNajaven(ime)
{
    document.getElementById("pozdrav").innerHTML = "Здраво, " + ime + "!";
    document.getElementById("najaven").style.display = "block";
    document.getElementById("forma-najava").style.display = "none";
}

function najava()
{
    var korisnik = document.getElementById("korisnik").value;
    var lozinka = document.getElementById("lozinka").value;

    if (korisnik == "" || lozinka == "")
    {
        alert("Внесете корисничко име и лозинка!");
        return false;
    }

    // дали постои корисник со тоа име и таа лозинка
    var pronajden = false;
    for (var i = 0; i < korisnici.length; i++)
    {
        if (korisnici[i].korisnickoIme == korisnik && korisnici[i].lozinka == lozinka)
        {
            pronajden = true;
        }
    }

    if (!pronajden)
    {
        alert("Погрешно корисничко име или лозинка!");
        return false;
    }

    localStorage.setItem("najaven", korisnik);   // запамти кој е најавен
    prikaziNajaven(korisnik);
    document.getElementById("lozinka").value = "";

    return false;
}

function odjava()
{
    localStorage.removeItem("najaven");
    document.getElementById("najaven").style.display = "none";
    document.getElementById("forma-najava").style.display = "block";
    document.getElementById("korisnik").value = "";
}

// Копчето "Регистрација": на почетната ја отвора формата,
// а од другите страни води до почетната
function prikaziRegistracija()
{
    var del = document.getElementById("registracija");
    if (del == null)
    {
        window.location.href = "index.html#registracija";
        return;
    }

    if (del.style.display == "block")
    {
        del.style.display = "none";
    }
    else
    {
        del.style.display = "block";
    }
}

function registracija()
{
    var ime = document.getElementById("reg-korisnik").value;
    var lozinka = document.getElementById("reg-lozinka").value;
    var lozinka2 = document.getElementById("reg-lozinka2").value;
    var greska = document.getElementById("greska-registracija");

    if (ime == "" || lozinka == "" || lozinka2 == "")
    {
        greska.innerHTML = "Пополнете ги сите полиња!";
        return false;
    }

    if (lozinka.length < 4)
    {
        greska.innerHTML = "Лозинката мора да има најмалку 4 знаци!";
        return false;
    }

    if (lozinka != lozinka2)
    {
        greska.innerHTML = "Лозинките не се исти!";
        return false;
    }

    for (var i = 0; i < korisnici.length; i++)
    {
        if (korisnici[i].korisnickoIme.toLowerCase() == ime.toLowerCase())
        {
            greska.innerHTML = "Корисничкото име " + ime + " е зафатено!";
            return false;
        }
    }

    korisnici.push(new Korisnik(ime, lozinka));
    zacuvajKorisnici();

    greska.innerHTML = "";
    document.getElementById("reg-korisnik").value = "";
    document.getElementById("reg-lozinka").value = "";
    document.getElementById("reg-lozinka2").value = "";
    document.getElementById("registracija").style.display = "none";

    // корисничкото име се препишува во формата за најава
    document.getElementById("korisnik").value = ime;
    alert("Успешна регистрација! Сега најавете се.");

    return false;
}

document.getElementById("forma-najava").onsubmit = najava;
document.getElementById("kopce-registracija").addEventListener("click", prikaziRegistracija);
document.getElementById("kopce-odjava").addEventListener("click", odjava);

// формата за регистрација постои само на почетната страна
if (document.getElementById("forma-registracija") != null)
{
    document.getElementById("forma-registracija").onsubmit = registracija;

    if (window.location.hash == "#registracija")
    {
        document.getElementById("registracija").style.display = "block";
    }
}

// При вчитување на секоја страна: ако некој е најавен, прикажи го
var najavenKorisnik = localStorage.getItem("najaven");
if (najavenKorisnik != null)
{
    prikaziNajaven(najavenKorisnik);
}
