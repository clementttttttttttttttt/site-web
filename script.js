document.addEventListener("DOMContentLoaded", () => {
	
  const pages = {
    accueil: document.getElementById("page-accueil"),
    jeu: document.getElementById("page-jeu"),
    calendrier: document.getElementById("page-calendrier"),
    fin: document.getElementById("page-fin")
  };

  const btnOui = document.getElementById("btn-oui");
  const btnContinuer1 = document.getElementById("btn-continuer-1");
  const btnContinuer2 = document.getElementById("btn-continuer-2");
  const btnNon = document.getElementById("btn-non");

  const listePredictions = document.getElementById("liste-predictions");
  const scoreValeur = document.getElementById("score-valeur");
  const scoreTotal = document.getElementById("score-total");
  const calendrier = document.getElementById("calendrier");
  const resultatFinal = document.getElementById("resultat-final");
  const noteFinaleValeur = document.getElementById("note-finale-valeur");
  const messageFinale = document.getElementById("message-finale");

  const predictions = [
    "Il y a eu au moins une chose de cassée dans l'appartement.",
    "On s'est perdu au moins une fois en ville.",
    "Je t'ai paye un verre.",
    "Je t'ai fais au moins un cadeau.",
    "J'ai fais des pates a manger.",
    "On est alle a la plage et tu m'as arrose.",
    "Tu as perdu qulque chose.",
    "Tu m'as force a dire bonne nuit a biscuit.",
    "T'as mis le pull que je t'ai offert.",
  ];

  function afficherPage(page) {
    Object.values(pages).forEach(p => p.classList.remove("active"));
    page.classList.add("active");
    window.scrollTo({top: 0,behavior: "smooth"});
  }

  function creerPredictions() {
    listePredictions.innerHTML = "";

    predictions.forEach(prediction => {
      const li = document.createElement("li");
      li.className = "prediction";

      const texte = document.createElement("span");
      texte.className = "prediction-texte";
      texte.textContent = prediction;

      const casePrediction = document.createElement("button");
      casePrediction.className = "case case-off";
      casePrediction.type = "button";
      casePrediction.setAttribute("aria-label","Prédiction vraie");

      casePrediction.addEventListener("click",() => {
        const active = casePrediction.classList.toggle("case-on");
        casePrediction.classList.toggle("case-off",!active);
        mettreAJourScore();
      });

      li.appendChild(texte);
      li.appendChild(casePrediction);
      listePredictions.appendChild(li);
    });

    scoreTotal.textContent = predictions.length;
    mettreAJourScore();
  }

  function mettreAJourScore() {
    scoreValeur.textContent = document.querySelectorAll(".case-on").length;
  }

  function creerCalendrier() {
    calendrier.innerHTML = "";

    const dates = [
      "20 août",
      "21 août",
      "22 août",
      "23 août",
      "24 août",
      "25 août",
      "26 août",
      "27 août"
    ];

    dates.forEach(date => {
      const jour = document.createElement("div");
      jour.className = "jour";

      const dateElement = document.createElement("span");
      dateElement.className = "jour-date";
      dateElement.textContent = date;

      const slider = document.createElement("input");
      slider.className = "jour-slider";
      slider.type = "range";
      slider.min = "0";
      slider.max = "100";
      slider.value = "50";

      const valeur = document.createElement("span");
      valeur.className = "jour-valeur";
      valeur.textContent = "50 %";

      slider.addEventListener("input",() => {
        valeur.textContent = slider.value + " %";
        calculerNoteFinale();
      });

      jour.appendChild(dateElement);
      jour.appendChild(slider);
      jour.appendChild(valeur);
      calendrier.appendChild(jour);
    });

    calculerNoteFinale();
  }

  function calculerNoteFinale() {
    const sliders = document.querySelectorAll(".jour-slider");

    if (!sliders.length) return;

    let total = 0;

    sliders.forEach(slider => {
      total += Number(slider.value);
    });

    const moyenne = Math.round(total / sliders.length);
    noteFinaleValeur.textContent = moyenne;

    if (moyenne >= 90) {
      messageFinale.textContent = "ah ouai c'était les vacances d'uyne vie";
    } else if (moyenne >= 75) {
      messageFinale.textContent = "la on commence a parler";
    } else if (moyenne >= 50) {
      messageFinale.textContent = "pas mal mais ca aurait peu etre mieux";
    } else {
      messageFinale.textContent = "ah ouai ta vrm pas kiffe hein.";
    }

    resultatFinal.classList.remove("cache");
  }

  btnOui.addEventListener("click",() => {
    afficherPage(pages.jeu);
  });

  btnContinuer1.addEventListener("click",() => {
    afficherPage(pages.calendrier);
  });

  btnContinuer2.addEventListener("click",() => {
    afficherPage(pages.fin);
  });

  // le bouton non ne fait volontairement rien
  btnNon.addEventListener("click",() => {
    btnNon.classList.remove("tremble");
    void btnNon.offsetWidth;
    btnNon.classList.add("tremble");
  });

  creerPredictions();
  creerCalendrier();
});