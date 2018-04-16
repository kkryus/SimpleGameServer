function codeAddress() 
{
	var amountOfBlocks = 16;
	for(i = 0;i<amountOfBlocks;i++)
	{
		document.getElementsByClassName("cell"+ i)[0].style.display= 'none';
	}
	var amountOfGames = 0;
	 $.ajax({
        url: "phpScripts/getAmountOfGames.php",
        type: 'GET',
        cache: false,
        timeout: 30000,
		async: false,
        error: function(){
            return true;
        },
        success: function(data){ 
            amountOfGames = parseInt(data);
        }
    });
	
	var gameNames;
	$.ajax({
        url: "phpScripts/getGameNames.php",
        type: 'GET',
        cache: false,
        timeout: 30000,
		async: false,
        error: function(){
            return true;
        },
        success: function(data){ 
            gameNames = data;
        }
    });	
	gameNames = gameNames.split(",");
	
	gameObjects = {};
	for(i = 0;i<amountOfGames;i++)
	{
		$.ajax({
			url: "phpScripts/getAuthors.php",
			type: 'POST',
			cache: false,
			timeout: 30000,
			data: { value: gameNames[i] },
			async: false,
			error: function(){
				return true;
			},
			success: function(data){ 
				authors = data;
			}
		});	
		authors = authors.split(",");
		gameObjects[i] = {name:gameNames[i], author1:authors[0], author2:authors[1]};
	}
	console.log(gameObjects);
			
	
	for(i = 0;i< amountOfGames;i++)
	{
		document.getElementsByClassName("cell"+ i)[0].style.display= 'block';
		document.getElementsByClassName("gameName")[i].innerHTML = "<center>" + gameNames[i] + "</center>";
		document.getElementsByClassName("card-img-top")[i].src = "games/" + gameNames[i] + "/pic.jpg";
		document.getElementsByClassName("card-img-top")[i].width = 365;
		document.getElementsByClassName("card-img-top")[i].height = 365;
		document.getElementsByClassName("link")[i].href = "games/" + gameNames[i] +"/index.html";
		//document.getElementsByClassName("card-img-top")[i].onclick = function() { window.location = 'games/' + gameNames[i] + '/index.html'};
		if(gameObjects[i].author2 != undefined)
		{
			document.getElementsByClassName("card-body")[i].innerHTML = "<p class=\"card-text\">"+ gameObjects[i].author1 + " </br>" + gameObjects[i].author2 + "</p> ";
		}
		else
		{
			document.getElementsByClassName("card-body")[i].innerHTML = "<p class=\"card-text\">"+ gameObjects[i].author1+ "</p> ";
		}
	}
					
}
window.onload = codeAddress;