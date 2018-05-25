function injectGames() 
{
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
			
	
	var container = document.getElementsByClassName("container")[0];
	
	for(i = 0;i< amountOfGames;i++)
	{
		
		var divCell = document.createElement("div");
		container.appendChild(divCell);
			var divColMd4 = document.createElement("div");
			divColMd4.classList.add("col-md-4");
		divCell.appendChild(divColMd4);
				var divCardMb4BoxShadow = document.createElement("div");
				divCardMb4BoxShadow.classList.add("card");
				divCardMb4BoxShadow.classList.add("mb-4");
				divCardMb4BoxShadow.classList.add("box-shadow");
			divColMd4.appendChild(divCardMb4BoxShadow);
					var link = document.createElement("a");
					link.href = "games/" + gameNames[i] + "/index.html";
						var gameName = document.createElement("p");
							var gameNameTextNode = document.createTextNode(gameNames[i]);
						gameName.appendChild(gameNameTextNode);
					link.appendChild(gameName);
						var img = document.createElement("img");
						img.classList.add("card-img-top");
						img.width = 365;
						img.height = 365;
						img.style.border='1px solid #000000';
						img.src = "games/" + gameNames[i] + "/pic.jpg";
					link.appendChild(img);
				divCardMb4BoxShadow.appendChild(link);
					var cardBodyDiv = document.createElement("div");
					cardBodyDiv.classList.add("card-body");
						var authorsElement = document.createElement("p");
							var noBrElementOne = document.createElement("nobr");
							var authorTextNode = document.createTextNode(gameObjects[i].author1);
							noBrElementOne.appendChild(authorTextNode);
						authorsElement.appendChild(noBrElementOne);
							if(gameObjects[i].author2 != undefined)
							{
								var brElement = document.createElement("br");
								var noBrElementTwo = document.createElement("nobr");
								var secondAuthorTextNode = document.createTextNode(gameObjects[i].author2);
								noBrElementTwo.appendChild(secondAuthorTextNode);
								authorsElement.appendChild(brElement);
								authorsElement.appendChild(noBrElementTwo);
							}
						
					cardBodyDiv.appendChild(authorsElement);
				divCardMb4BoxShadow.appendChild(cardBodyDiv);		
	}
					
}