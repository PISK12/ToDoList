function init(){
			writeFromLocalStorage();
		}

class Task{
	constructor(title="",description="",json=""){
		if(!json){
			this.title=title;
			this.description=description;
			this.isFinished=false;
			this.datetime=Task.getDateTime();
		}else{
			this.parseJson(json);
		}

	}

	changeStatus(){
		this.isFinished= this.isFinished==false;
	}

	static getDateTime(){
		var date = new Date();
		return date.toISOString().substring(0, 10)+" "+date.toISOString().substring(11,19);
	}

	toJson(){
		var obj = {title:this.title,description:this.description,isFinished:this.isFinished,datetime:this.datetime};
		return JSON.stringify(obj);
	}

	parseJson(json){
		var obj = JSON.parse(json);
		this.title=obj.title;
		this.description=obj.description;
		this.isFinished=obj.isFinished;
		this.datetime=obj.datetime;
		}
	}



function addToLocalStorage() {
	if(document.forms["formAdd"]["title"].value){
		var task=new Task(document.forms["formAdd"]["title"].value,document.forms["formAdd"]["description"].value);
		localStorage.setItem(task.title,task.toJson());
	}
}

function changeStatus(number){
	var task =new Task(null,null,localStorage.getItem(localStorage.key(number)));
	task.changeStatus();
	localStorage.setItem(task.title,task.toJson());
	while(document.getElementById("Table").rows.length){
		document.getElementById("Table").deleteRow(0);
	}
	writeFromLocalStorage();
}

function writeFromLocalStorage(){
	var table = document.getElementById("Table");
	var row = table.insertRow(0);
	var cell0 = row.insertCell(0);
	var cell1 = row.insertCell(1);
	var cell2 = row.insertCell(2);
	var cell3 = row.insertCell(3);
	var cell4 = row.insertCell(4);

	cell0.innerHTML = "Title";
	cell1.innerHTML = "Description";
	cell2.innerHTML = "Datetime";
	cell3.innerHTML = "IsFinished";
	cell4.innerHTML = "Button";
	for ( var i = 0, len = localStorage.length; i < len; ++i ) {
  		var task =new Task(null,null,localStorage.getItem(localStorage.key( i )));
  		if(!task.isFinished){
	  		var row = table.insertRow(1);
	  	}else{
	  		var row = table.insertRow(document.getElementById("Table").rows.length);
	  	}

		var cell0 = row.insertCell(0);
		var cell1 = row.insertCell(1);
		var cell2 = row.insertCell(2);
		var cell3 = row.insertCell(3);
		var cell4 = row.insertCell(4);

		cell0.innerHTML = task.title;
		cell1.innerHTML = task.description;
		cell2.innerHTML = task.datetime;
		cell3.innerHTML = task.isFinished;
		cell4.innerHTML = "<button onclick='changeStatus({})'>Change</button>".replace("{}",i);
  				
	}		
}