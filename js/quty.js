function addQuty(product) {
//Fonction qui incremente le contenu du champ
	document.getElementById(product).value=parseInt(document.getElementById(product).value)+ 1;
}
function rmQuty(product) {
//Fonction qui decremente le contenu du champ
	if(document.getElementById(product).value>=1){
		document.getElementById(product).value=parseInt(document.getElementById(product).value)- 1;
	}
}
function delQuty(product) {
//Fonction qui initialise le contenu du champ a zero
	document.getElementById(product).value= 0;
	addProduct(product);
}

function formatNum(nbr)
{
//fonction qui ajoute un espace aprés chaque centaine pour facilité la lecture du nombre

		//on initialise les variables
		var num = ''+nbr; // convertie le nombre en chaine de caractere
		var res = ''; //notre valeur de retour
		var numLenght=num.length - 1; // longueur du nombre - 1 (car on commence a compter par 0)
		
		for(var i=0 ; i<=numLenght ; i++)
		{
			if(i!=0 && i % 3 == 0){
				res = num[numLenght - i]+' '+res ; //si 1 est un multiple de 3 on rajoute le chiffre et un espace
			}
			else{
				res = num[numLenght - i]+res ; // sinon on rajoute juste le chiffre
			}
		}
		return res;
}

    function showProductNum(elementId) {
	//Fonction qui écrit le nombre de produits qu'il y a dans le panier
	
		var productNum = document.getElementById(elementId);
		
		var num = parseInt(initNotSetCookieZero('quantity_golf')) + parseInt(initNotSetCookieZero('quantity_megane')) + parseInt(initNotSetCookieZero('quantity_c4'));
		productNum.innerHTML = num + ' ';
    }
function showTotalPrice(elementId) {
	//Fonction qui écrit les prix total

		var productPrice = document.getElementById(elementId);
		var price = parseInt(initNotSetCookieZero('quantity_golf'))*29910 + parseInt(initNotSetCookieZero('quantity_megane'))*29900 + parseInt(initNotSetCookieZero('quantity_c4'))*30200;
		productPrice.innerHTML = formatNum(price) + ' €';
    }

function addProduct(product){
//Fonction qui ajoute le produit dans le panier et qui affiche le statut et renvoie un boolean

	//On initialise les variable
	var quty = document.getElementById(product).value;
	var result = document.getElementById('result_' + product);

	if(quty>=0 && quty%1==0){	//on verifie que la quantité entré est bien valide
	createCookie(product,quty,31);
	
	if(result){
	//l' id du type 'result_' + product n'est pas present sur la pages cart.html
		result.innerHTML = 'Le panier a bien été actualisé.<br /> ('+ quty +' produit(s))';
		result.style.backgroundColor="WhiteSmoke";
		result.style.color="black";
		result.style.padding="0.3em";
	}
	showProductNum("productNum"); //on actualise les valeur dans l'en-tête
	showTotalPrice('price');
	return true;
	}
	else{
	if(result){
	//l' id du type 'result_' + product n'est pas present sur la pages cart.html
		result.innerHTML = 'Veuillez entrer un entier et positif, merci.';
		result.style.color="White";
		result.style.backgroundColor="Crimson";
		result.style.padding="0.3em";
	}
	return false;
	}
}

function setProductValue(product){
//fonction qui affiche la quantité de produit sauvgarder dans les cookie
	document.getElementById(product).value = initNotSetCookieZero(product);
}