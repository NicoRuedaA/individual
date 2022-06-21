let altura = 1080;
let ancho = 1920;

let puntuacion;
let score


function return_to_menu(){

	loadpage("../index.html");
}


class GameScene extends Phaser.Scene {
    constructor (){
        super('GameScene');
		this.cards = null;
		this.firstClick = null;
		score = 100;
		this.correct = 0;
		this.player = "";
    }

    preload (){	

        this.load.image('back', '../resources/0.png');
		this.load.image('cb', '../resources/1.png');
		this.load.image('co', '../resources/2.png');
		this.load.image('sb', '../resources/3.png');
		this.load.image('so', '../resources/4.png');
		this.load.image('tb', '../resources/5.png');
		this.load.image('to', '../resources/6.png');
	}
	
    create (){	
		sessionStorage.setItem("gameType", "infinite");
		puntuacion = this.add.text (ancho/2-175, 100, score,  {fill: '#0f0' });
		this.cameras.main.setBackgroundColor(0x176174);
		let deck_total = ['co', 'co', 'cb', 'cb', 'sb', 'sb', 'so', 'so', 'tb', 'tb', 'to', 'to'];
		
		var username = sessionStorage.getItem("name");

		var json = localStorage.getItem("config") || '{"cards":2,"dificulty":"hard"}';
		var options_data = JSON.parse(json);
		var diff = options_data.dificulty;
		var couples =options_data.cards;
		//var couples = options_data.cards;
		var deck_joc = deck_total.slice(0, couples*2);
		
		var deduct = null;
		var timeToFlip = null;


		if (diff == "easy"){
			deduct = 5;
			timeToFlip = 2000;
		}
		else if (diff == "normal"){
			deduct = 10
			timeToFlip = 750;
		}
		else if (diff == "hard"){
			deduct = 20;
			timeToFlip = 200;
		}

		//Barreja de les cartes per a que no surtin les parelles una al costat de l'altre
		deck_joc.sort((a,b) => 0.5 - Math.random())

		//Distribucio per columnes i files
		if (couples < 5){
			var columnes = 2*couples;
			var files = 1;
			var diferenciaCol = (1920-columnes*195+98)/2
			var diferenciaFil = (1080-319)/2
		}
		else{
			var columnes = couples
			var files = 2
			var diferenciaCol = (1920-columnes*195+98)/2
			var diferenciaFil = (1080-319)/2
		}



		var m = 0;
		for (let n = 0; n < columnes; n++){
			for(let k = 0; k < files; k++){
				this.newCard = this.add.image(n*150+diferenciaCol, k*200 + diferenciaFil,deck_joc[m]);
				this.newCard.setScale(0.5);
				
				m += 1;
			}
		}

		this.cards = this.physics.add.staticGroup();

		for (let p = 0; p < columnes; p++){
			for(let q = 0; q < files; q++){
				this.cards.create(p*150+diferenciaCol, q*200 + diferenciaFil , 'back').setScale(0.5);
			}	
		}
		
		let i = 0;
		this.cards.children.iterate((card)=>{
			card.card_id = deck_joc[i];
			i++;
			card.setInteractive();
			card.on('pointerup', () => {
				card.disableBody(true,true);
				if (this.firstClick){
					if (this.firstClick.card_id !== card.card_id){
						score -= deduct;
						//alert(score);
						puntuacion.setText(score);
						

						this.firstClick.enableBody(false, 0, 0, true, true);
						card.enableBody(false, 0, 0, true, true);

						var fallo = [];
						let m = 0;


							for (let iterator = 0; iterator < columnes; iterator++){
								for (let j = 0; j < files; j++){
									var fail = this.add.image(iterator*150+diferenciaCol, j*200 + diferenciaFil, deck_joc[m]).setScale(0.5);
									fallo.push(fail);
									m++;
								}
							}
						
						
						setTimeout(() =>{
							for (let iterador = 0; iterador < couples*2; iterador++){
								fallo[iterador].destroy();
							}
						},timeToFlip);
						
						
						if (score <= 0){
							sessionStorage.setItem("score", score);
							sessionStorage.setItem("guanyat", "no");
							
							puntuacion.setText("GAME OVER");
							//this.cards.clear(true,true);
							loadpage("../html/game.html");
							alert("adasdas")
						}
					}
					else{
						this.correct++;
						if (this.correct >= couples){
							sessionStorage.setItem("score", score);
							sessionStorage.setItem("guanyat", "si");

							puntuacion.setText("You Win with " + score + " points.");

							loadpage("../html/game.html");
						}
					}
					this.firstClick = null;
				}
				else{
					console.log(card);
					this.firstClick = card;
				}
			}, card);
		});
	}
	
}
