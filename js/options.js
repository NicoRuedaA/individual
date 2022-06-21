var options = function(){
	// Aquí dins hi ha la part privada de l'objecte
	var options_data = {
		cards:2, dificulty:"hard"
	};
	var load = function(){
		var json = localStorage.getItem("config") || '{"cards":2,"dificulty":"hard"}';
		options_data = JSON.parse(json);
	};
	var save = function(){
		localStorage.setItem("config", JSON.stringify(Options_data = {}));
	};
	load();
	var vue_instance = new Vue({
		el: "#options_id",
		data: {
			num: 2,
			dificulty: "normal"
		},
		created: function(){
			this.num = options_data.cards;
			this.dificulty = options_data.dificulty;
			this.name = options_data.name;
		},
		watch: {
			num: function(value){
				if (value < 2)
					this.num = 2;
				else if (value > 6)
					this.num = 6;
			}
		},
		methods: { 

			save: function(){
				options_data.cards = this.num;
				options_data.dificulty = this.dificulty;
				save();
				loadpage("../");
			}
		}
	});
	return {
		// Aquí dins hi ha la part pública de l'objecte
		getOptionsString: function (){
			return JSON.stringify(options_data);
		},
		getNumOfCards: function (){
			return options_data.cards;
		},
		getDificulty: function (){
			return options_data.dificulty;
		}
	}; 
}();
