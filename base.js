function closemessage() {
	$(".alert").fadeOut("fast");
	$(".modal").fadeOut("fast");
}

function makealert(id,title,text,show) {
	$(".alert-"+id).remove();
	html="<div class=\"alert alert-"+id+"\"><b>"+title+"</b><br>"+text+"<div class=\"close-message-button-"+id+"\"><br><br><input type=\"button\" value=\"Fermer la fenêtre\" onclick=\"closemessage()\" class='button-close-window-"+id+"'></div></div>";
	$("#otheralerts").append(html);
	if(show) {
		closemessage();
		$(".alert-"+id).fadeIn("fast");
		$(".modal").fadeIn("fast");
	}
}

function showstorage() {
	closemessage();
	$(".alert-storage").fadeIn("fast");
	$(".modal").fadeIn("fast");
}

function showcredits() {
	closemessage();
	makealert("credits","Règles du jeu","<div style='max-height:300px; overflow-y:auto;'><br>Blabla blabla</div>",true)
}

function startgame(){
	closemessage();
	makealert('startgame', 'Début du jeu !', 'Bienvenue sur le jeu d\'Arthur Gorjux<br/>Pour voir les règles, cliquez sur le bouton en bas à droite de la fenêtre', true);
}

function checkthings() {
	/*updategold();
	checkbuilding();
	updateitems();
	checkitem();
	updatestatus();*/

	if(life_count >= 10)
		life_count = 10;
	//if(life_count <= 0)
		//TODO : dead();

	//Update coins
	if(coins == 1){
		$('#gold-bar').html("");
		$('#gold-bar').html(coins + ' pièce');
	}else{
		$('#gold-bar').html("");
		$('#gold-bar').html(coins + ' pièces');
	}
	$('#life_count').html("");
	$('#life_count').html(life_count);
	if(coins >= 10){
		$(".theshop").removeClass("hidden");
	}

	if(items[2].owned > 0 && first_time_pain){
		$('#insidestorage').append('<br/><input id="eat_pain "type="button" value="Manger du pain" onclick="eat(\'pain\')"/>');
		first_time_pain = false;
	}
	if(items[3].owned > 0 && first_time_pizza){
		$('#insidestorage').append('<br/><input id="eat_pizza" type="button" value="Manger une pizza" onclick="eat(\'pizza\')"/>');
		first_time_pizza = false;
	}
	if(items[2].owned == 0){
		$('#insidestorage').remove('#eat_pain');
		first_time_pain = true;
	}
	if(items[3].owned == 0){
		$('#insidestorage').remove('#eat_pizza');
		first_time_pizza = true;
	}
	// Update items
	$("#otheritems").html("");
	for(i=0;i<items.length;i++) {
		thisitem=items[i];
		if(thisitem.owned != 0) {
			if(thisitem.owned != 1) {
				plural="s";
			}
			else {
				plural="";
			}
			thestorage=$("#otheritems").html();
			$("#otheritems").html(thestorage+"<br>"+thisitem.owned+" "+thisitem.name+plural);

		}
	}	

	// Check buildings
	if(items[0].owned > 0){
		$(".sign").removeClass("hidden");
	}
}

//Varibales globales
var items = [];
items.push({"name":"pelle","price":5,"owned":0});
items.push({"name":"food", "price":2, "owned":0});
items.push({"name":"pain", "price":0, "owned":0});
items.push({"name":"pizza", "price":0, "owned":0});

$(document).ready(function(){
	//initialisation des parametres
	startgame();
	coins = 0;
	coins_per_second = 1;
	food = 0;
	pizza = 0;
	pain = 0;
	life_count = 10;
	//cooking = false;
	pelle_cassée = false;
	first_time_pain = true;
	first_time_pizza = true;

	// Ajout de piece toutes les secondes
	setInterval(function() {
		coins += coins_per_second;
		checkthings();
	},1000);

	// Retire un point de vie par minute
	setInterval(function() {
		life_count -= 1;
		checkthings();
	},60*1000);

	$("#home").click(function() {
		closemessage();
		checkthings();
		if(items[1].owned > 0)
			makealert('home', 'Maison', 'Ici tu peux te faire à manger<br/><input type="button" onclick="cooking(\'pain\')" value="Cuisiner du pain"/><br/><input type="button" onclick="cooking(\'pizza\')" value="Cuisiner une pizza"/>', true);
		else
			makealert('home', 'Maison', 'Tu ne peux pas cuisiner si tu n\'as pas d\'ingrédients, vas en acheter !', true);
	});

	$(".theshop").click(function() {
		closemessage();
		$(".alert-theshop").fadeIn("fast");
		$(".modal").fadeIn("fast");
	});

	$(".sign").click(function() {
			closemessage();
			$(".alert-sign").fadeIn("fast");
			$(".modal").fadeIn("fast");
	});

});
function dighole(){
	closemessage()
	makealert('chest', "Un trésor", "En fouillant le puit, tu as trouver la clé de l'usine !", true);
	$('#factory').removeClass('hidden');
	coins_per_second += 1
}

function cooking(name){
	switch(name){
		case 'pain':
			if(items[1].owned > 0){
				items[1].owned--;
				items[2].owned++;
				checkthings();
			}else{
				makealert('not-enough-food', 'Pas assez d\'ingrédient', 'Tu n\'as pas assez d\'ingrédient ', true);	
			}
		break;
		case 'pizza':
			if(items[1].owned > 1){
				items[1].owned-= 2;
				items[3].owned++;				
				checkthings();
			}else{
				makealert('not-enough-food', 'Pas assez d\'ingrédient', 'Tu n\'as pas assez d\'ingrédient ', true);	
			}
		break;
	}
	closemessage();
}
function eat(name){
	switch(name){
		case 'pain':
			if(items[name].owned > 0){
				life_count++;
				items[2].owned--;
				checkthings();
			}else
				makealert('not-enough-' + name, 'Pas assez de ' + name, 'Tu n\'as pas assez de ' + name, true);
		break;
		case 'pizza':
			if(items[name].owned > 0){
				life_count++;
				items[3].owned--;
				checkthings();
			}else
				makealert('not-enough-' + name, 'Pas assez de ' + name, 'Tu n\'as pas assez de ' + name, true);
		break;
	}	
}

function buy(item,number) {
	for(i=0;i<items.length;i++) {
		thisitem = items[i];
		if(item == thisitem.name) {
			if(coins >= thisitem.price*number) {
				valid = true;
				if(valid) {
					coins -= thisitem.price*number;
					thisitem.owned += number;
					checkthings();
					if(item == "food")
						food ++;
				}
			}
			break;
		}
	}
	closemessage();
}