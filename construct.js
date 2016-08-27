function constructTabPropo(){
	
	var nomCase 	= "case";
	var	nombreLigne	= 10;
	var nombreCase	= 4;
	var numCase		= 1;
	
	
	var tab_propo 	= document.createElement("div");
	tab_propo.setAttribute("id","tab_propo");
	
	var block_jeu 	= document.getElementById("block_jeu");
	block_jeu.appendChild(tab_propo);
	
	var monTableau	= document.createElement("table");
	tab_propo.appendChild(monTableau);
	
	var monTitre 	= document.createElement("caption");
	montTitre.text="Grille";
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
			monDivCase.setAttribute("class",nomCase);
			maTd.appendChild(monDivCase);
		}
		monBody.appendChild(maLigne);
	}
	
}