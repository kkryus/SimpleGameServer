function sendGame()
{	
	var fails = false;
	var firstName;
	
	var firstNameInput = document.getElementById("firstName");
	if(firstNameInput.value == "")
	{
		firstNameInput.className = "input-alert";
		fails = true;
	}
	else
	{
		firstName = firstNameInput.value;		
		firstNameInput.className = "form-control";
	}
		
	var firstLastNameInput = document.getElementById("firstLastName");
	var firstLastName;	
	if(firstLastNameInput.value == "")
	{
		firstLastNameInput.className = "input-alert";
		fails = true;
	}
	else
	{
		firstLastName = firstLastNameInput.value;
		firstLastNameInput.className = "form-control";
	}
	
	var gameNameInput = document.getElementById("gameName");
	var gameName;	
	if(gameNameInput.value == "")
	{
		gameNameInput.className = "input-alert";
		fails = true;
	}
	else
	{
		gameName = gameNameInput.value;
		gameNameInput.className = "form-control";
	}	
	
	var fileInput = document.getElementById("file");
	if(fileInput.files.length == 0)
	{
		fileInput.className = "input-alert";
		fails = true;
	}
	else
	{
		fileInput.className = "form-control";
	}
	
	var secondNameInput = document.getElementById("secondName");
	var secondName = secondNameInput.value;
	
	var secondLastNameInput = document.getElementById("secondLastName");
	var secondLastName = secondLastNameInput.value;

	if(!fails)
	{
		$.post("saveGameInDatabase.php", {
		firstNameAuthor:firstName,
		firstLastNameAuthor:firstLastName,
		gameName:gameName,
		secondNameAuthor:secondName,
		secondLastNameAuthor:secondLastName
		}, function(data) {
			if (data != "") {
				alert('We sent Jquery string to PHP : ' + data);
			}
		});		
		
	}
	return !fails;	
}

var app = app || {};

(function(o)
{
	"use strict";
	//Private methods
	var ajax, getFormData, setProgress;
	
	ajax = function(data)
	{		
		var xmlhttp = new XMLHttpRequest(), uploaded;
		
		xmlhttp.addEventListener('readystatechange', function()
		{
			if(this.readyState === 4)
			{
				if(this.status === 200)
				{
					uploaded = JSON.parse(this.response);
					if(typeof o.options.finished === 'function')
					{
						o.options.finished(uploaded);
					}
				}
				else
				{
					if(typeof o.options.error === 'function')
					{
						o.options.error();
					}
				}					
			}
		});
		
		xmlhttp.upload.addEventListener('progress', function(event){
			var percent;
			if(event.lengthComputable === true)
			{
				percent = Math.round((event.loaded / event.total ) *100);
				setProgress(percent);
			}
		});
		
		xmlhttp.open('post',  o.options.processor);
		xmlhttp.send(data);
	};
	getFormData = function(source)
	{
		var gameName = document.getElementById('gameName').value;
		var data = new FormData(), i;
		for(i =0;i<source.length;i++)
		{
			if(i == 0 )
			{
				data.append('file[]', source[i], gameName + "." + source[i].name);
				continue;
			}
			
			var relativePath = source[i].webkitRelativePath.split('/');
			
			if(relativePath.length == 3)
			{			
				var tmpObject = relativePath[1] + "." + source[i].name;
				data.append('file[]', source[i], tmpObject);
				continue;
			}
			data.append('file[]', source[i]);
		}
		data.append('ajax', true);
		
		return data;
	};
	setProgress = function(value)
	{
		if(o.options.progressBar !== undefined)
		{
			o.options.progressBar.style.width = value ? value + '%' : 0;
		}
		if(o.options.progressText !== undefined)
		{
			o.options.progressText.innerText = value? value + '%' : '';
		}
	};
	o.uploader = function(options){
		o.options = options;
		
		if(o.options.files !== undefined){
			ajax(getFormData(o.options.files.files));

		}
	}
	
}(app));

