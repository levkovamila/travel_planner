function lajk(grad)
{
    var span = document.getElementById("broj-like-" + grad);
    span.innerHTML = parseInt(span.innerHTML) + 1;
}

function dislajk(grad)
{
    var span = document.getElementById("broj-dislike-" + grad);
    span.innerHTML = parseInt(span.innerHTML) + 1;
}

document.getElementById("like-ohrid").addEventListener("click", function() { lajk("ohrid"); });
document.getElementById("dislike-ohrid").addEventListener("click", function() { dislajk("ohrid"); });
document.getElementById("like-skopje").addEventListener("click", function() { lajk("skopje"); });
document.getElementById("dislike-skopje").addEventListener("click", function() { dislajk("skopje"); });
document.getElementById("like-pariz").addEventListener("click", function() { lajk("pariz"); });
document.getElementById("dislike-pariz").addEventListener("click", function() { dislajk("pariz"); });
document.getElementById("like-rim").addEventListener("click", function() { lajk("rim"); });
document.getElementById("dislike-rim").addEventListener("click", function() { dislajk("rim"); });

function komentiraj(grad)
{
    var tekst = document.getElementById("komentar-" + grad).value;

    if (tekst == "")
    {
        alert("Nema komentar!");
        return;
    }

    var novo = document.createElement("li"); //pravime nova promenlica <li></li> i ja stavame vo novo
    novo.innerHTML = tekst; //prethodnoto vsusnost pretstavuva prazno livce i nie sega so innetHTML mu stavame tekst izmegu

    var lista = document.getElementById("lista-komentari-" + grad); //ja naogame listata na gradot
    lista.appendChild(novo);  //na krajot od listata go dodavame tesktot sto e zacuvan vo novo

    document.getElementById("komentar-" + grad).value = ""; //go praznime poleto za komentar za da go napiseme naseto
}

document.getElementById("kopce-komentar-ohrid").addEventListener("click", function() { komentiraj("ohrid"); });
document.getElementById("kopce-komentar-skopje").addEventListener("click", function() { komentiraj("skopje"); });
document.getElementById("kopce-komentar-pariz").addEventListener("click", function() { komentiraj("pariz"); });
document.getElementById("kopce-komentar-rim").addEventListener("click", function() { komentiraj("rim"); });
