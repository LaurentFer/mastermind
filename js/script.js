var score			= getCookie("mastermind"); /*pour récupérer le score précédent dans le cookie*/
var meilleurTemp	= getCookie("mastermind2");
var reponse			= genereCombinaison();
var dureePartie		= 180; /*utilisée pour le calcul du temps mis*/

var chercheCaseD	= 1;	/*pour les boucles dans les lignes*/
var chercheCaseF	= 4;
var phraseReponse 	= "";	/*notre phrase réponse qui se constituera petit à petit*/
var onStop			= "case"+chercheCaseF;

var debTab			= 0;	/*pour les boucles dans les charAt*/
var finTab			= 3 ;
var nMaxCellule		= 40; 	/*10 lignes de 4*/
/*les couleurs*/
var r				= "rgb(255, 0, 0)";
var b 				= "rgb(0, 0, 255)";
var y 				= "rgb(255, 255, 0)";
var g 				= "rgb(0, 128, 0)";
var o 				= "rgb(255, 165, 0)";
var z 				= "rgb(128, 128, 128)";		

function CliqueRond(ident){

		/*On récupére la couleur du rond cliqué dans le bandeau*/
		var element = document.getElementById(ident);
		var style 	= window.getComputedStyle(element,"");
		var bgColor = style.getPropertyValue("background-color");

		/*On définit la valeur de la variable en fonction de la chaine couleur*/
		switch(bgColor){
			case r : 	coloriage="red";
						phraseReponse=phraseReponse+"r";
						break;
			case b : 	coloriage="blue";
						phraseReponse=phraseReponse+"b";		
						break;
			case y : 	coloriage="yellow";
						phraseReponse=phraseReponse+"y";		
						break;
			case g : 	coloriage="green";
						phraseReponse=phraseReponse+"g";		
						break;
			case o : 	coloriage="orange";
						phraseReponse=phraseReponse+"o";		
						break;
			case z : 	coloriage="grey";
						phraseReponse=phraseReponse+"z";		
					break;		
		}
		
		/*On affecte la couleur à la case du tableau qui n'est pas null*/
		var nextCase = ChercheCaseVide(chercheCaseD,chercheCaseF);
		
		/*On masque l'élément selectionné */		
		document.getElementById(ident).style.display="none";
				
		/* Si une case est à remplir on le fait sinon on passe au traitement de la ligne */
		if (nextCase!="case"){
			var aRemplir = document.getElementById(nextCase);
			aRemplir.style.backgroundColor = coloriage;		
			/* Le remplissage de la dernière case déclenche la soumission de la grille */
			if (nextCase==onStop){
				/* Construction de la grille Analyse des positions */
				var traitement ="ana";
				var ss=""
				/*Script d'analyse par case (renvoie par correspondance exacte)
				for (i=0;i<=3;i++){
					for (j=0;j<=3;j++){
						var ip=debTab+i+1; //on décale la cellule a écrire de 4 en 4 et de 1 car départ a 0 et html demarre a 1
						
						if(phraseReponse.charAt(i)==reponse.charAt(j)){
							if (i==j){
								document.getElementById(traitement+ip).style.backgroundColor="black";
							} else {
								var elementV = document.getElementById(traitement+ip);
								var bgColorV = elementV.style.backgroundColor;
								console.log(bgColorV);
								if (bgColorV!="black" && bgColorV!="white"){
									document.getElementById(traitement+ip).style.backgroundColor="white";
								}	
								
							}
						}
					}	
				}
				*/
				/*Script en 2 passages (d'abord les noires puis les blanches)*/
				for (i=0;i<=3;i++){/*les noirs*/
					for (j=0;j<=3;j++){
						
						if(phraseReponse.charAt(i)==reponse.charAt(j)){
							if (i==j){/*cas noir*/
								for (k=debTab+1;k<=debTab+4;k++){/*on parcourt le tableau et on change la couleur de la premiere pastille non remplie*/
									if (document.getElementById(traitement+k).style.backgroundColor!="black"){
										document.getElementById(traitement+k).style.backgroundColor="black";
										k=debTab+5;
									}
								}
								
							}
						}
					}
				}
				for (i=0;i<=3;i++){/*les blancs*/
					for (j=0;j<=3;j++){
						
						if(phraseReponse.charAt(i)==reponse.charAt(j)){
							if (i!=j){/*cas noir*/
								for (k=debTab+1;k<=debTab+4;k++){/*on parcourt le tableau et on change la couleur de la premiere pastille non remplie*/
									if (document.getElementById(traitement+k).style.backgroundColor!="black"&&document.getElementById(traitement+k).style.backgroundColor!="white"){
										document.getElementById(traitement+k).style.backgroundColor="white";
										k=debTab+5;
									}
								}
								
							}
						}
					}
				}
				
					
				/* Si la réponse est totalment bonne*/
				if (phraseReponse==reponse){
					document.getElementById("resultat").style.backgroundColor="GreenYellow";
					
					if (navigator.cookieEnabled) {
						score++;							/*on incrémente le score*/
						setCookie("mastermind",score);		/*on met a jour le contenu du cookie*/
						/* On déclare et calcule la durée de la partie */
						var partieTemp = dureePartie-document.getElementById("chrono").value;
						/* Si une meilleure durée est réalisée on stocke dans le cookie dédié */
						if ((partieTemp<meilleurTemp)||(meilleurTemp==null)){
							meilleurTemp=partieTemp;
							document.getElementById("mTemps").value=meilleurTemp;
							setCookie("mastermind2",meilleurTemp);
						}
						
					} else {
						alert("Activez vos cookies !");	
					}	
					
					document.getElementById("score").value=score;	/*on met a jour le compteur sur la page html*/	
				} else { /*sinon on passe à la rangée suivante*/
					document.getElementById("resultat").style.backgroundColor="red";
					phraseReponse="";							/* on remet notre phrase réponse a 0*/
					debTab = debTab+4;							/* on augmente les débuts et fin du tableau de 4 cases */
					finTab = finTab+4;
					chercheCaseF = chercheCaseF+4,				/*idem */
					chercheCaseD = chercheCaseD+4;
					onStop = "case"+chercheCaseF;				/*on change la valeur de la case ou il faut stopper les traitements  */
					/*Dé-masqué les ronds du bandeau*/
					for (i=1;i<=6;i++){
						document.getElementById("c"+i).style.display="block";
					}	
				}
				
				if (chercheCaseF>nMaxCellule){
					Rejouer();									/* une fois que les 10 lignes sont remplies on appelle la fonction de refresh de la page */			
				}
			}
		}

}
/*fonction de recherche de la première case vide*/
function ChercheCaseVide(depart,arret){
	var emplacement="case";
	
		for (i=depart;i<=arret;i++){
			
			var element = document.getElementById("case"+i);
			var style 	= window.getComputedStyle(element,"");
			var bgColor = style.getPropertyValue("background-color");
			/*si l'élément n'est pas coloré c'est qu'il est vide*/
			if (bgColor!=r && bgColor!=b && bgColor!=y && bgColor!=g && bgColor!=o && bgColor!=z){
				emplacement=emplacement+i;
				break;
			}
			
		}

	return emplacement;
}
/*fonction pour effectuer un refresh de la page*/
function Rejouer(){
	/////////////PURGE PARTIE EN COURS///////////////////
	for (i=1;i<=nMaxCellule;i++){
		setCookie("case"+i,null);
	}
	/////////////////////////////////////////////////////	
	window.location.reload();
}
/*Fonction de random de 6 chiffres avec contrôle anti-doublon*/
function genereCombinaison(){
	
	var tabLettre	= ["r","b","y","g","o","z"];
	var	newCombi 	= "";
	var nombreAleat = 0;
	
	/* On va générer les 4 char constituant la phrase */
	for (i=1;i<=4;i++){

		if(i==1){ /* Le premier se place */
			nombreAleat=Math.floor(Math.random() * 6);
			newCombi=tabLettre[nombreAleat];
		} else {
			/* A partir du second on vérifie qu'il n'y ai pas de double */
			do{
				var compteLettre =0;
				
				nombreAleat=Math.floor(Math.random() * 6);
			
				for (k=0;k<=i-1;k++){
					if (newCombi.charAt(k)==tabLettre[nombreAleat]){
						compteLettre++;
					}
				}
				
			}while (compteLettre>0);	
			/* Si non doublon alors on remplie notre chaine reponse */
			newCombi=newCombi+tabLettre[nombreAleat];
			
		}
	}
	console.log(newCombi);
	return newCombi;
}
/*Affiche les éléments stockés dans les cookie dans la page html*/
function afficheScoreCook(){
	document.getElementById("score").value=score;
	document.getElementById("mTemps").value=meilleurTemp;
}
/*Ajoute un cookie qui dure 1 an et qui stocke le nb de partie*/
function setCookie(sName, sValue) {
        var today = new Date(), expires = new Date();
        expires.setTime(today.getTime() + (365*24*60*60*1000));
        document.cookie = sName + "=" + encodeURIComponent(sValue) + ";expires=" + expires.toGMTString();
}
/*Lit le cookie (nb de parties gagnées) - cherche la valeur post ;*/
function getCookie(sName) {
        var cookContent = document.cookie, cookEnd, i, j;
        var sName = sName + "=";
 
        for (i=0, c=cookContent.length; i<c; i++) {
                j = i + sName.length;
                if (cookContent.substring(i, j) == sName) {
                        cookEnd = cookContent.indexOf(";", j);
                        if (cookEnd == -1) {
                                cookEnd = cookContent.length;
                        }
                        return decodeURIComponent(cookContent.substring(j, cookEnd));
                }
        }       
        return null;
}
/*Fonction qui démarre le chronomètre*/
function start(duree){

	var o=document.getElementById("chrono" );

	if(duree >= 0 && reponse!=phraseReponse)/*si il reste du temps et que la bonne réponse n'est pas donnée*/
	{
		o.value = duree;
		setTimeout("start("+duree+"-1)", 1000);
	}
	if (duree==0) /*si plus de temps*/
	{
		o.value ="fini";
		Rejouer();
	}

}
/*Fonction appeller par le body de la page html  */
function jouer(){
		afficheScoreCook();
		start('180');	
}
