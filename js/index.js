


function new_game1(){
	var cipote = prompt("name");
	
    while (cipote=="" || !cipote){
        cipote = prompt("name");
    }
	sessionStorage.setItem("name", cipote);
	
	loadpage("./html/normalGame.html");
	
}


function new_game2(){
	var name = prompt("name");
	
    while (name=="" || !name){
        name = prompt("name");
		var topPuntuacions = [];
	
    sessionStorage.setItem('newtop', JSON.stringify(topPuntuacions));
    }
	sessionStorage.setItem("name", name);
	
	
	loadpage("./html/infiniteGame.html");
}


function options(){
	loadpage("./HTML/options.html");
}


function highscore(){
	loadpage("./HTML/puntuacions.html");
}

function load(){
	loadpage("./HTML/load.html");
}


function exit(){
	location.replace("https://www.google.es");
}
