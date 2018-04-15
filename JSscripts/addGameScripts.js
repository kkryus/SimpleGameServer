function sendGame()
{	
	var firstName;
	
	var firstNameInput = document.getElementById("firstName");
	if(firstNameInput.value == "")
	{
		firstNameInput.className = "input-alert";
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
	}
	else
	{
		gameName = gameNameInput.value;
		gameNameInput.className = "form-control";
	}
	
	var fileInput = document.getElementById("gameFiles");
	if(fileInput.files.length == 0)
	{
		fileInput.className = "input-alert";
	}
	else
	{
		fileInput.className = "form-control";
	}
	var files = fileInput.files;
	var formData = new FormData();
	
	// Loop through each of the selected files.
	for (var i = 0; i < files.length; i++) {
		var file = files[i];

		// Add the file to the request.
		formData.append('photos[]', file, file.name);
	}
	
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'fileUpload.php', true);
	
	xhr.onload = function () 
	{
		if (xhr.status === 200) 
		{
			// File(s) uploaded.
			alert("uploaded");
		} 
		else 
		{
			alert('An error occurred!');
		}
	};
	xhr.send(formData);
	
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
		data.append('gameName', "okokoko" );
		for(i =0;i<source.length;i++)
		{
			if(i == 0 )
			{
				console.log(gameName + "." + source[i].name);
				data.append('file[]', source[i], gameName + "." + source[i].name);
				continue;
			}
			
			var relativePath = source[i].webkitRelativePath.split('/');
			console.log(relativePath.length);
			
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

