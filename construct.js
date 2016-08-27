function constructTab(nomCase,tCaption,cetId){
	
	var	nombreLigne	= 10;
	var nombreCase	= 4;
	var numCase		= 1;
	var cssClass	= "case";
	
	
	var tab_propo 	= document.createElement("div");
	tab_propo.setAttribute("id",cetId);
	
	var block_jeu 	= document.getElementById("block_jeu");
	block_jeu.appendChild(tab_propo);
	
	var monTableau	= document.createElement("table");
	tab_propo.appendChild(monTableau);
	
	var monTitre 	= document.createElement("caption");
	monTitre.innerHTML=tCaption;
	monTableau.appendChild(monTitre);
	
	var monBody		= document.createElement("tbody");
	monTableau.appendChild(monBody);
	
	for (i=1;i<=nombreLigne;i++){
		var maLigne		= document.createElement("tr");
		for (j=1;j<=nombreCase;j++){
			var maTd = document.createElement("td");		
			maLigne.appendChild(maTd);
			var monDivCase = document.createElement("div");
			monDivCase.setAttribute("id",nomCase+numCase);
			monDivCase.setAttribute("class",cssClass);
			maTd.appendChild(monDivCase);
			numCase++;
		}
		monBody.appendChild(maLigne);
	}

}

function constructRes(){
	
	var tab_result		= document.createElement("div");
	tab_result.setAttribute("id","tab_result");
	
	var block_jeu 		= document.getElementById("block_jeu");
	block_jeu.appendChild(tab_result);
	
	var monResultat		= document.createElement("table");
	tab_result.appendChild(monResultat);
	
	var monTitre 		= document.createElement("caption");
	monTitre.innerHTML="Statut";
	monResultat.appendChild(monTitre);
	
	var maLigne		= document.createElement("tr");
	monResultat.appendChild(maLigne);
	
	var maTd = document.createElement("td");	
	maTd.setAttribute("id","resultat");
	maTd.innerHTML='&nbsp';
	maLigne.appendChild(maTd);
	
	var nbPartieG = document.createElement("p");
	nbPartieG.text="Partie gagnées :";
	tab_result.appendChild(nbPartieG);
	
	var cellPartieG = document.createElement("input");
	cellPartieG.setAttribute("type","text");
	cellPartieG.setAttribute("name","score");
	cellPartieG.setAttribute("id","score");
	cellPartieG.setAttribute("size","10");
	tab_result.appendChild(cellPartieG);
	
	var monChrono = document.createElement("p");
	monChrono.text="Chrono :";
	tab_result.appendChild(monChrono);

	var cellChrono = document.createElement("input");
	cellChrono.setAttribute("type","text");
	cellChrono.setAttribute("name","chrono");
	cellChrono.setAttribute("id","chrono");
	cellChrono.setAttribute("size","10");	
	tab_result.appendChild(cellChrono);
	
	var bestTime = document.createElement("p");
	bestTime.text="Meilleur Temps :";
	tab_result.appendChild(bestTime);
	
	var cellTime = document.createElement("input");
	cellTime.setAttribute("type","text");
	cellTime.setAttribute("name","mTemps");
	cellTime.setAttribute("id","mTemps");
	cellTime.setAttribute("size","10");
	tab_result.appendChild(cellTime);
}