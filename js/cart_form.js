    var formulaire = document.getElementById('cart_form');
	var tooltip = document.getElementById('tooltip');
	
    function afficherMessage(message) {
		tooltip.innerHTML = message;
        tooltip.style.display = 'block';
		tooltip.style.backgroundColor="silver";
		tooltip.style.color="navy";
    }
    function effacerMessage() {
		tooltip.innerHTML = "";
        tooltip.style.display = 'none';
    }
	
    function afficherDonnees(message) {
		tooltip.innerHTML = message;
        tooltip.style.display = 'block';
		tooltip.style.backgroundColor="silver";
		tooltip.style.color="green";
    }    
	
    function estVide(champ) {
		if (champ.value==null || champ.value=="") {
			return true;
		}
		return false;
	}
	
    function champVide(value) {
		return "Le champ <strong>"+value+"</strong> est vide! <br/>";
	}
	
    function champInvalide(value) {
		return "Le champ <strong>"+value+" n'est pas valide</strong>! <br/>";
	}
	
    function emailNonValide(email) {
		var reg = new RegExp('^[a-z0-9]+([_\.-]{1}[a-z0-9]+)*@[a-z0-9]+([_\.-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$', 'i');
		if (reg.test(email)) { 
			return false; // adresse est invalide
		} 
		else { 
			return true;
		} 
	}
	
	function getSelectValue(elmt) {
		var values = null;
		for (var i=0; i < elmt.options.length; i++) {
			if (elmt.options[i].selected == true) {
				if (values == null) values = elmt.options[i].text;
				else values += ", " + elmt.options[i].text; 
			}
		}	
		return values;	
	}
	function getSelectValueCookie(elmt) {
		var values = '';
		for (var i=0; i < elmt.options.length; i++) {
			if (elmt.options[i].selected == true) {
				values += "1"; 
			}
			else{
				values += "0";
			}
		}
		return values;	
	}
	
    function validerFormulaire() {
		var data = "<p>Vos données sont valides </p>"
		var rapport = "";
		var erreur = false;
		var emailErreur = false;
		var numero = 0;
		var productNum = parseInt(initNotSetCookieZero('quantity_golf')) + parseInt(initNotSetCookieZero('quantity_megane')) + parseInt(initNotSetCookieZero('quantity_c4'));
		
		if (productNum == 0) {
			rapport += " " + ++numero + ") Votre panier est vide.";
			erreur = true;
		} else {
			data += "Vous venez d'acheter :";
			data += "<ul>";
			data += "<li>" + initNotSetCookieZero('quantity_golf') + " Golf</li>";
			data += "<li>" + initNotSetCookieZero('quantity_megane') + " Mégane</li>";
			data += "<li>" + initNotSetCookieZero('quantity_c4') + " C4</li>";
			data += "</ul><br/>";
		}
		
		if (estVide(formulaire.name)) {
			rapport += " " + ++numero + ") " + champVide("Nom");
			erreur = true;
		} else {
			data += '<span class="label">Nom : </span>'+formulaire.name.value+'<br/>';
			createCookie("name",formulaire.name.value,31);
		}
		
		if (estVide(formulaire.firstname)) {
			rapport += " " + ++numero + ") " + champVide("Prénom");
			erreur = true;
		} else {
			data += '<span class="label">Prénom : </span>'+formulaire.firstname.value+'<br/>';
			createCookie("firstname",formulaire.firstname.value,31);
		}
		
		
		if (estVide(formulaire.mail)) {
			rapport += " " + ++numero + ") " + champVide("Email");
			erreur = true;
		} else if (emailNonValide(formulaire.mail.value)) {
			rapport += " " + ++numero + ") " + champInvalide("Email");
			emailErreur = true;	
		} else {
			data += '<span class="label">Email : </span>'+formulaire.mail.value+'<br/>';
			createCookie("mail",formulaire.mail.value,31);
		}
		
		if(formulaire.newsletter.checked){
			createCookie("newsletter","true",31);
			data += '<span class="label">Newsletter : </span>inscrit(e) <br/>'
		}else{
			createCookie("newsletter",'',-1);
			data += '<span class="label">Newsletter : </span>non-inscrit(e) <br/>'
		}
		
		if (estVide(formulaire.Delivery_address)) {
			rapport += " " + ++numero + ") " + champVide("Adresse de livraison");
			erreur = true;
		} else {
			data += '<span class="label">Adresse de livraison : </span>'+formulaire.Delivery_address.value+'<br/>';
			createCookie("Delivery_address",formulaire.Delivery_address.value,31);
		}
		
		if (estVide(formulaire.Delivery_zipCode)) {
			rapport += " " + ++numero + ") " + champVide("Code postale de livraison");
			erreur = true;
		} else {
			data += '<span class="label">Code postale de livraison : </span>'+formulaire.Delivery_zipCode.value+'<br/>';
			createCookie("Delivery_zipCode",formulaire.Delivery_zipCode.value,31);
		}
		
		if (estVide(formulaire.Delivery_city)) {
			rapport += " " + ++numero + ") " + champVide("ville de livraison");
			erreur = true;
		} else {
			data += '<span class="label">Ville de livraison : </span>'+formulaire.Delivery_city.value+'<br/>';
			createCookie("Delivery_city",formulaire.Delivery_city.value,31);
		}
		
		if (formulaire.Delivery_country.selectedIndex <= 0) {
			rapport += " " + ++numero + ") " + champVide("Pays de livraison");
			erreur = true;
		} else {
			data += '<span class="label">Pays de livraison : </span>' +  getSelectValue(formulaire.Delivery_country) +  '<br/>';
			createCookie("Delivery_country",formulaire.Delivery_country.selectedIndex,31);
		}
		
		if (!estVide(formulaire.Billing_address)) {
			data += '<span class="label">Adresse de facturation : </span>'+formulaire.Billing_address.value+'<br/>';
			createCookie("Billing_address",formulaire.Billing_address.value,31);
		}
		
		if (!estVide(formulaire.Billing_zipCode)) {
			data += '<span class="label">Code postale de facturation : </span>'+formulaire.Billing_zipCode.value+'<br/>';
			createCookie("Billing_zipCode",formulaire.Billing_zipCode.value,31);
		}
		
		if (!estVide(formulaire.Billing_city)) {
			data += '<span class="label">Ville de facturation : </span>'+formulaire.Billing_city.value+'<br/>';
			createCookie("Billing_city",formulaire.Billing_city.value,31);
		}
		
		if (formulaire.Billing_country.selectedIndex > 0) {
			data += '<span class="label">Pays de facturation : </span>' +  getSelectValue(formulaire.Billing_country) +  '<br/>';
			createCookie("Billing_country",formulaire.Billing_country.selectedIndex,31);
		}
		else{
			createCookie("Billing_country",'',-1);
		}
		
		
		
		if (!(formulaire.payment[0].checked || formulaire.payment[1].checked || formulaire.payment[2].checked)) {
			rapport += " " + ++numero + ") " + champVide("Mode de paiement");
			erreur = true;	
		} else {
			var payment;
			
				if(formulaire.payment[0].checked){
					payment = 'Carte Bleu';
			createCookie("payment",0,31);
				}
				else if (formulaire.payment[1].checked){
					payment = 'Chèque';
			createCookie("payment",1,31);
				}
				else{
					payment ='Espece';
			createCookie("payment",2,31);
				}
			data += '<span class="label">Mode de paiement : </span>'+payment+'<br/>';
		}
		
		if (formulaire.howHear.selectedIndex > 0) {
			data += '<span class="label">Comment avez vous connus notre site ? </span>' +  getSelectValue(formulaire.howHear) +  '<br/>';
			createCookie("howHear",formulaire.howHear.selectedIndex,31);
		}
		else{
			createCookie("howHear",'',-1);
		}
		
		if (formulaire.whyUs.selectedIndex >= 0) {
			data += '<span class="label">Pourquoi nous ? </span>' +  getSelectValue(formulaire.whyUs) +  '<br/>';
			createCookie("whyUs",getSelectValueCookie(formulaire.whyUs),31);
		}
		else{
			createCookie("whyUs",'',-1);
		}
		
		if (!estVide(formulaire.suggest)) {
			data += '<span class="label">Votre suggestion : </span>'+formulaire.suggest.value+'<br/>';
			createCookie("suggest",formulaire.suggest.value,31);
		}
		
		if (erreur || emailErreur) {
			afficherMessage(rapport);
			return false;
		} else {
				afficherDonnees(data);
				return true;
		}
	}
	function setFormValue(elementId){
//fonction qui affiche la quantité de produit sauvgarder dans les cookie
	if (readCookie(elementId)){
	document.getElementById(elementId).value = readCookie(elementId);
	}
}
	function setFormValueCheckBox(elementId){
//fonction qui affiche la quantité de produit sauvgarder dans les cookie
	if (readCookie(elementId)){
	document.getElementById(elementId).checked = true;
	}
	}
	function setFormValueRadio(elementId){
//fonction qui affiche la quantité de produit sauvgarder dans les cookie
	if (readCookie(elementId)){
	document.getElementById(elementId + '_' + readCookie(elementId)).checked = true;
	}
}
	function setFormValueSelect(elementId){
//fonction qui affiche la quantité de produit sauvgarder dans les cookie
	if (readCookie(elementId)){
	document.getElementById(elementId).options[readCookie(elementId)].selected = true;
	}
}
	function setFormValueSelectMultiple(elementId){
//fonction qui affiche la quantité de produit sauvgarder dans les cookie
	if (readCookie(elementId)){
		var ckie = readCookie(elementId);
		for(var i=0 ; i < ckie.length ; i++){
		if(ckie[i]=='1'){
			document.getElementById(elementId).options[i].selected = true;
		}
		}
	}
}

	setFormValue('name');
	setFormValue('firstname');
	setFormValue('mail');
	setFormValueCheckBox('newsletter');
	setFormValue('Delivery_address');
	setFormValue('Delivery_zipCode');
	setFormValue('Delivery_city');
	setFormValueSelect('Delivery_country');
	setFormValue('Billing_address');
	setFormValue('Billing_zipCode');
	setFormValue('Billing_city');
	setFormValueSelect('Billing_country');
	setFormValueRadio('payment');
	setFormValueSelect('howHear');
	setFormValueSelectMultiple('whyUs');
	setFormValue('suggest');
	
    formulaire.onsubmit = validerFormulaire;