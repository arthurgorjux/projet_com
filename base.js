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
	//Update coins
	if(coins == 1){
		$('#gold-bar').html("");
		$('#gold-bar').html(coins + ' pièce');
	}else{
		$('#gold-bar').html("");
		$('#gold-bar').html(coins + ' pièces');
	}
	if(coins >= 10){
		$(".theshop").removeClass("hidden");
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

function dighole(){
	$(".chest").removeClass("hidden");
}
//items
var items = [];
items.push({"name":"pelle","price":5,"owned":0	});

$(document).ready(function(){
	//initialisation des parametres
	startgame();
	coins = 0;
	coins_per_second = 1;
	cooking = false;
	pelle_cassée = false;

	// Ajout de piece toutes les secondes
	setInterval(function() {
		coins += coins_per_second;
		checkthings();
	},1000);

	$("#home").click(function() {
		closemessage();
		if(cooking)
			makealert('home', 'Maison', 'Ici tu peux te faire à manger<br/><input type="button" onclick="cooking()" value="Cuisiner"/>', true);
		else
			makealert('home', 'Maison', 'Tu ne peux rien faire ici tant que tu n\'as pas assez d\'argent', true);
	});

	$(".theshop").click(function() {
		closemessage();
		$(".alert-theshop").fadeIn("fast");
		$(".modal").fadeIn("fast");
	});

	$(".sign").click(function() {
		//if(!passthief) {
			closemessage();
			$(".alert-sign").fadeIn("fast");
			$(".modal").fadeIn("fast");
		//}
	});

});

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
				}
			}
			break;
		}
	}
	closemessage();
}