function injectGames() 
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
			
	
	for(i = 0;i< amountOfGames;i++)
	{
		document.getElementsByClassName("cell"+ i)[0].style.display= 'block';
		document.getElementsByClassName("gameName")[i].innerHTML = "<center>" + gameNames[i] + "</center>";
		document.getElementsByClassName("card-img-top")[i].src = "games/" + gameNames[i] + "/pic.jpg";
		document.getElementsByClassName("card-img-top")[i].width = 365;
		document.getElementsByClassName("card-img-top")[i].height = 365;
		document.getElementsByClassName("link")[i].href = "games/" + gameNames[i] +"/index.html";
		if(gameObjects[i].author2 != undefined)
		{
			//document.getElementsByClassName("card-body")[i].innerHTML = "<p class=\"card-text\"><nobr>"+ gameObjects[i].author1 + " </nobr></br><nobr>" + gameObjects[i].author2 + "</nobr></p> ";
			document.getElementsByClassName("card-text")[i].innerHTML = "<nobr>"+ gameObjects[i].author1 + " </nobr></br><nobr>" + gameObjects[i].author2 + "</nobr>";
		}
		else
		{
			document.getElementsByClassName("card-text")[i].innerHTML = "<nobr>"+ gameObjects[i].author1+ "</nobr>";
			//document.getElementsByClassName("card-body")[i].innerHTML = "<p class=\"card-text\"><nobr>"+ gameObjects[i].author1+ "</nobr></p> ";
		}
	}
					
}