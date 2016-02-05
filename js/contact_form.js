    var formulaire = document.getElementById('contact_form');
	var tooltip = document.getElementById('tooltip');
	
    function afficherMessage(message) {
		tooltip.innerHTML = message;
        tooltip.style.display = 'block';
		tooltip.style.backgroundColor="silver";
		tooltip.style.color="navy";
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
	
    function validerFormulaire() {
		var data = "<p>Vos données sont valides </p>"
		var rapport = "";
		var erreur = false;
		var emailErreur = false;
		var numero = 0;
		
		if (estVide(formulaire.name)) {
			rapport += " " + ++numero + ") " + champVide("Nom");
			erreur = true;
		} else {
			data += '<span class="label">Nom :</span> '+formulaire.name.value+'<br/>';
			createCookie("name",formulaire.name.value,31);
		}
		
		if (estVide(formulaire.firstname)) {
			rapport += " " + ++numero + ") " + champVide("Prénom");
			erreur = true;
		} else {
			data += '<span class="label">Prénom :</span> '+formulaire.firstname.value+'<br/>';
			createCookie("firstname",formulaire.firstname.value,31);
		}
		
		
		if (estVide(formulaire.mail)) {
			rapport += " " + ++numero + ") " + champVide("Email");
			erreur = true;
		} else if (emailNonValide(formulaire.mail.value)) {
			rapport += " " + ++numero + ") " + champInvalide("Email");
			emailErreur = true;	
		} else {
			data += '<span class="label">Email :</span> '+formulaire.mail.value+'<br/>';
			createCookie("mail",formulaire.mail.value,31);
		}
		
		if (estVide(formulaire.object)) {
			rapport += " " + ++numero + ") " + champVide("Objet");
			erreur = true;
		} else {
			data += '<span class="label">Objet :</span> '+formulaire.object.value+'<br/>';
			createCookie("object",formulaire.object.value,31);
		}
		
		if (estVide(formulaire.message)) {
			rapport += " " + ++numero + ") " + champVide("Message");
			erreur = true;
		} else {
			data += '<span class="label">Message :</span> '+formulaire.message.value+'<br/>';
			createCookie("message",formulaire.message.value,31);
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
	setFormValue('name');
	setFormValue('firstname');
	setFormValue('mail');
	setFormValue('object');
	setFormValue('message');
    formulaire.onsubmit = validerFormulaire;