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
	if(life_count == 1)
		makealert('pas-bien', 'Bientôt la fin ?', 'Il te reste un point de vie, manges vite pour ne pas mourir !', true);
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

	if(can_buy_factory){
		closemessage();
		makealert('buy-factory-ok', 'Acheter l\'usine', 'Tu peux désormais acheter l\'usine', true);
	}
	if(buy_factory){
		$(".theshop_cv").removeClass("hidden");
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
items.push({"name":"formation", "price":0, "owned":0});
items.push({"name":"competences", "price":0, "owned":0});
items.push({"name":"expérience professionnelle", "price":0, "owned":0});
items.push({"name":"autres", "price":0, "owned":0});

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
	buy_factory = false;
	cipherstep = 0;
	can_buy_factory = false;

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
			makealert('home', 'Maison', 'Ici tu peux te faire à manger pour récupérer des points de vie<br/><input type="button" onclick="cooking(\'pain\')" value="Cuisiner du pain"/><br/><input type="button" onclick="cooking(\'pizza\')" value="Cuisiner une pizza"/>', true);
		else
			makealert('home', 'Maison', 'Tu ne peux pas cuisiner si tu n\'as pas d\'ingrédients, vas en acheter !', true);
	});

	$(".theshop").click(function() {
		closemessage();
		$(".alert-theshop").fadeIn("fast");
		$(".modal").fadeIn("fast");
	});

	$(".theshop_cv").click(function(){
		closemessage();
		$(".alert-theshop_cv").fadeIn("fast");
		$(".modal").fadeIn("fast");
	});

	$(".sign").click(function() {
			closemessage();
			$(".alert-sign").fadeIn("fast");
			$(".modal").fadeIn("fast");
	});
	$("#factory").click(function() {
		if(!buy_factory) {
			closemessage();
			makealert("gold-factory","Usine","Statut: Tu travailles à l'usine et tu gagnes " + coins_per_second + " pièces par seconde comme salaire !<br><br><input type=\"button\" value=\"Travailler à l'usine\" onclick=\"makebosshappy()\">",true)
		}
		else{
			closemessage();
			makealert("buy-factory-new","Usine","Statut: Tu es le patron de l'usine ! :o<br><br>Tu gagnes désormais " + coins_per_second + " pièces par seconde !",true)
		}
	});

});

function makebosshappy() {
	closemessage();
	makealert("how-to-make-boss-happy","Rendre le patron heureux","Pour le rendre heureux et gagner quelques pièces, tu peux faire :<br><br><input type='button' value='Répondre à des énigmes' onclick='ciphercode()'>",true);
}

function ciphercode() {

	closemessage();
	// TODO : finir les énigmes
	if(cipherstep==0) {
		codetocipher="Donner le prénom et le nom du créateur.";
	}
	else if(cipherstep==1) {
		codetocipher="Donner le nom de la formation du créateur.";
	}
	else if(cipherstep==2) {
		codetocipher="Om s ept;f gi;; pg n;pvld";
	}
	else if(cipherstep==3) {
		codetocipher="VGhlIHBsYW50IGlzIGZhbW91cyBiZWNhdXNlIG9mIHR<br>oZSBhYmlsaXR5IHRvIGN1cmUgc29tZSBkaXNlYXNlcw==";
	}
	else if(cipherstep==4) {
		codetocipher="towiiag g se   rir,oaoan   ft ofo srtod tddyi ot mdy lugelelmwon foemsthiuaa ttclntclga  bhhs";
	}

	if(cipherstep<5) {
		makealert("help-ciphering","Enigmes","Ton patron adore les énigmes, mais il est débordé. Si tu peux l'aider, il te donnera une récompense !<br><br>Enigme #"+(cipherstep+1)+":<br>"+codetocipher+"<br><input type='text' id='cipherthecodeanswer'><br><br><input type='button' value='Valider' onclick='checkchipher()'>",true);
	}
	else {
		makealert("no-more-codes","Plus d'énigmes","Désolé, il n'y a plus d'énigme",true);
	}
}
function checkchipher() {

	/*
	
		Don't cheat please!!!
		PLEASE!!!
		
	*/

	if(cipherstep==0) {
		if($("#cipherthecodeanswer").val().toLowerCase()=="arthur gorjux") {
			cipherstep++;
			coins += 100;
			closemessage();
			alert("Elle était facile, tu reçois 100 pièces"); 
		}
		else {
			alert('Faux !');
		}
	}
	else if(cipherstep==1) {
		if($("#cipherthecodeanswer").val().toLowerCase()=="m1ice") {
			cipherstep++;
			coins += 500;
			closemessage();
			alert("Juste ! Tu reçois 500 pièces !");
		}
		else {
			alert('Faux !');
		}
	}
	else if(cipherstep==2) {
		if($("#cipherthecodeanswer").val().toLowerCase()=="in a world full of blocks") {
			cipherstep++;
			goldbar+=2000;
			closemessage();
			alert("Correct! You get 2000 gold bars!"); 
		}
		else {
			alert('Wrong!');
		}
	}
	else if(cipherstep==3) {
		if($("#cipherthecodeanswer").val().toLowerCase()=="the plant is famous because of the ability to cure some diseases") {
			cipherstep++;
			goldbar+=2500;
			closemessage();
			alert("Correct! You get 2500 gold bars!"); 
		}
		else {
			alert('Wrong!');
		}
	}
	else if(cipherstep==4) {
		if($("#cipherthecodeanswer").val().toLowerCase()=="the gold factory was built long time ago, and it is the most famous gold factory in the world") {
			cipherstep++;
			goldbar+=7500;
			closemessage();
			alert("Correct! Because this one is a hard one, you get 7500 gold bars!"); 
		}
		else {
			alert('Wrong!');
		}
	}
}

function buy_factory(){
	if(coins >= 1000){
		coins -= 1000;
		buy_factory = true;
		checkthings();
		closemessage();
	}
}
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
			if(items[2].owned > 0){
				life_count++;
				items[2].owned--;
				checkthings();
			}else
				makealert('not-enough-' + name, 'Pas assez de ' + name, 'Tu n\'as pas assez de ' + name, true);
		break;
		case 'pizza':
			if(items[3].owned > 0){
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