function Ex2(){
	this.init();
	
	/** @Override */
	this.customCacheDom = function(){	
		this.$context 				= this.$elem.find("#ex-context");
		this.$showSolution 			= this.$elem.find("#show_solution");
		this.$checkAnswer 			= this.$elem.find("#check_answer");
		
		this.$btn1 				= this.$elem.find("#btn1");
		this.$btn2 				= this.$elem.find("#btn2");
		this.$btn3 				= this.$elem.find("#btn3");		
	}
	
	/** @Override */
	this.bindUIActions = function(){
		var _this = this;
		//Bind UI action of Hint/Show solution to the function		
		this.$showSolution.on("click", _this.giveHint.bind(this));
		
		//Bind UI action of Check answer to the function
		this.$checkAnswer.on("click", _this.checkAnswer.bind(this));
		
		//Bind UI action of button 1 click to the function
		this.$btn1.on("click", btnSelect(1).bind(this));
		
		//Bind UI action of button 2 click to the function
		this.$btn2.on("click", btnSelect(2).bind(this));
		
		//Bind UI action of button 3 click to the function
		this.$btn3.on("click", btnSelect(3).bind(this));
	}
	
	/** @Override */
	this.next = function(){		
		//Populate context
		generateContext();
		
		//Random options
		var answer2 = Math.floor((Math.random() * data.length) ); 
		var answer3 = Math.floor((Math.random() * data.length)); 	
		arr = randomNums(3);
		
		//Populate buttons
		document.getElementById("btn"+arr[0]).innerHTML = data[index].from;
		document.getElementById("btn"+arr[1]).innerHTML = data[answer2].from;
		document.getElementById("btn"+arr[2]).innerHTML = data[answer3].from;
	}
	
	/** @Override */
	this.giveHint = function (){
		var elem = $('#btn'+arr[1]);
		elem.prop('disabled', true);
		elem.addClass("btn-danger");
	}
	
	/** @Override */
	this.successCondition = function(chosenWord){
		return (chosenWord.trim().toUpperCase().replace(/[^a-zA-Z ]/g, "") === data[index].from.trim().toUpperCase().replace(/[^a-zA-Z ]/g, ""));
	}
	
	function btnSelect(btnID){
		var chosenWord = document.getElementById("btn"+btnID).innerHTML;	
		reGenerateContext(chosenWord);
		
		checkAnswer(chosenWord);	
	}
	
	function resetBtns(){
		var elem = $('#btn'+arr[1]);
		elem.prop('disabled', false);
		elem.removeClass("btn-danger");
	}
	
	function randomNums(size){
		var arr = []
		while(arr.length < size){
			var randomnumber = Math.ceil(Math.random()*3);
			if(arr.indexOf(randomnumber) > -1) continue;
			arr[arr.length] = randomnumber;
		}
		return arr;
	}
	
	function generateContext(){
		var contextString = data[index].context;
		var res = data[index].from.split(" ");	
		
		for (i = 0; i <res.length; i++){
			contextString = contextString.replace(res[i]," ______ ");
		}	
		this.$context.html(contextString);
	}
	
	function reGenerateContext(chosenWord){
		var contextString = this.$context.html;
		var res = chosenWord.split(" ");	
		
		for (i = 0; i <res.length; i++){
			contextString = contextString.replace(" ______ ",res[i].bold());
		}	
		this.$context (contextString);
	}
};

Ex2.prototype = Object.create(Exercise.prototype, {
	constructor: Ex2,
	/************************** SETTINGS ********************************/	
	size: 		 {value: 3}, 
	description: {value: "Choose the word that fits the context"},
	templateURL: {value: '../static/template/ex2.html'},
	/*******************************************************************/
});