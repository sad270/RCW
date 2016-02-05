function setCart(){
//fonction qui affiche/actualise les valeurs du panier sur la page cart.html

	var result = document.getElementById('resultCart');
	result.style.backgroundColor="WhiteSmoke";
	result.style.padding="0.3em";
	result.innerHTML ='';
	
	if(addProduct('quantity_golf')){
	result.innerHTML += '<p>Quantité de Golf actualisé</p>';	
	}
	else{
	result.innerHTML += '<p class="error">Veuillez entrer une quantité de Golf entière et positive, merci.</p>';	
	}
	if(addProduct('quantity_megane')){
	result.innerHTML += '<p>Quantité de Mégane actualisé</p>';	
	}
	else{
	result.innerHTML += '<p class="error">Veuillez entrer une quantité de Mégane entière et positive, merci.</p>';	
	}
	if(addProduct('quantity_c4')){
	result.innerHTML += '<p>Quantité de C4 actualisé</p>';	
	}
	else{
	result.innerHTML += '<p class="error">Veuillez entrer une quantité de C4 entière et positive, merci.</p>';	
	}
	showProductNum("cartProductNum");
	showTotalPrice('cartPrice');
}