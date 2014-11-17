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
	
}

$(document).ready(function(){
	//initialisation des parametres
	startgame();
	coins = 0;
	coins_per_second = 1;

	// Ajout de piece toutes les secondes
	setInterval(function() {
		coins += coins_per_second;
		checkthings();
	},1000);

	//items
	var items = [];

	$("#home").click(function() {
		closemessage();
		makealert('home', 'Clique maison', 'Maison', true);
	});
});