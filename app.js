

(function(){
	init();
	initObjects();
	loadAssets();
	
//   /$$           /$$   /$$    
//  |__/          |__/  | $$    
//   /$$ /$$$$$$$  /$$ /$$$$$$  
//  | $$| $$__  $$| $$|_  $$_/  
//  | $$| $$  \ $$| $$  | $$    
//  | $$| $$  | $$| $$  | $$ /$$
//  | $$| $$  | $$| $$  |  $$$$/
//  |__/|__/  |__/|__/   \___/  
// 
	function init(){
		//init game environment
		canvas = document.getElementById("canvas");
		c = canvas.getContext("2d");
		canvas.width = 420;
		canvas.height = 546;
		screenWidth = canvas.width;
		screenHeight = canvas.height;
		halfWidth = screenWidth / 2;
		halfHeight = screenHeight / 2;
		gameScaler = document.getElementById("scaler");
		offsetX = canvas.offsetLeft;
		offsetY = canvas.offsetTop;
		INPUT_TYPE = null;
		wrongOrientation = false;
		filesToLoad = 47;
		filesLoaded = 0;
		GAME_STATE = "loading";
		gameLoaded = false;
		gameLoop = setInterval(loop,33);
	    easeValue = .25;
		tweenSpring = .1;tweenFriction = .8;
		targetSpring = .4;targetFriction = .8;


		backgroundColor = "#4C306A";

		redrawCanvas = document.createElement('canvas');
		redrawContext = redrawCanvas.getContext('2d');


		textBubbles = [
			[61,136,"left"],
			[109,135,"right"],
			[169,139,"left"],
			[217,138,"right"],
			[239,75,"left"],
			[287,74,"right"],
			[332,125,"left"],
			[380,124,"right"]
		];

		maxCities = 3;
		activePlanes = 0;
		airplaneDelay =  new Date().getTime() + 4500;
		activeTextBubble = [];
		activeCloudObjects = [];
		activePlaneObjects = [];

		activeFadeObjects = [];
		activeTitleObjects = [];
		activeTitlePopups = [];
		activeTitlePeople = [];
		activeURLButtons = [];

		playerBGLocations = [66,275]

		hilightPositions = [237,401,555,720];

		titleScreenText = "";
		endScreenText = "Thanks for playing! We would like to thank the Manitoba YMCA Newcomer group; Abdulrhaman, Akram, Alaa, Ammar, Asmaa, Asraa, Auner, Bara, Dalaa, Jwana, Majd, Maya, Miguel, Mohammad, Nassouh, Osama, and Wisam for helping develop this resource.";

		categoryNames = [
			"Money and Jobs",
			"Making & Keeping Connections",
			"Social Customs",
			"Coping with Transition",
			"Planning for the Future"
		]

		playerHilightPositions = [115,325,535,747];

		showCatButtons = false;

		plNumSelected = false;
		numberOfPlayers = 0;
		currentPlayer = 1;
		playerScores = [0,0,0,0]

		currentHilight = 0;
		startButtonActive = false;
		startGameBtnScale = 1.0;
		okayButtonActive = false;
		okayButtonScale = 1.0;

		cat1Scale = 1.0;
		cat2Scale = 1.0;
		cat3Scale = 1.0;
		cat4Scale = 1.0;
		cat5Scale = 1.0;

		categorySelected = false;


		answer1Scale = 1.0;
		answer2Scale = 1.0;
		answer3Scale = 1.0;
		answer4Scale = 1.0;

		categoryText = "";
		questionText = "";
		answer1Text = "";
		answer2Text = "";
		answer3Text = "";
		answer4Text = "";
		thisQuestion = null;
		currentCategory = 1;
		currentQuestion = 1;

		currentHilight = 0;

		showPrompt = false;
		showAnswerButtons = false;
		questionActive = false;
		popUpActive = false;
		questionAnswered = false;
		showAnswerPrompt = false;
		answeredCorrect = false;
		showPopUpText = false;

		totalQuestionsRemaining = 25;

		quitButtonAlpha = 0.3;

		cat1Questions = [];
		cat2Questions = [];
		cat3Questions = [];
		cat4Questions = [];
		cat5Questions = [];

		categoryScores =[
			[],
			[],
			[],
			[],
			[]
		]

		winner = 0;

		fillCategory(cat1Questions);
		fillCategory(cat2Questions);
		fillCategory(cat3Questions);
		fillCategory(cat4Questions);
		fillCategory(cat5Questions);

		finalScoreText = "";

		showEndResources = false;

		endURLs = [
			["mindyourmind.ca","http://mindyourmind.ca",halfWidth,30],
			["Reason to Live - Manitoba Suicide Prevention & Support Line","http://reasontolive.ca/",halfWidth,76],
			["NorWest Co-op Community Health","https://norwestcoop.ca/",halfWidth,143],
			["Aurora Family Therapy Centre","http://www.aurorafamilytherapy.com/newcomer.html",halfWidth,197],
			["Macdonald Youth Services","https://www.mys.ca/services/youth-crisis-services",halfWidth,251],
			["Immigrant and Refugee Community Organization of Manitoba (IRCOM)","https://www.ircom.ca/",halfWidth,297],
			["New Journey Housing","https://www.newjourneyhousing.com/",halfWidth,364],
			["Klinic Community Health","http://klinic.mb.ca/",halfWidth,412],
			["Kids Help Phone","https://kidshelpphone.ca/",halfWidth,456],
		]		
	}//End of init

//   /$$                           /$$ /$$                    
//  | $$                          | $$|__/                    
//  | $$  /$$$$$$   /$$$$$$   /$$$$$$$ /$$ /$$$$$$$   /$$$$$$ 
//  | $$ /$$__  $$ |____  $$ /$$__  $$| $$| $$__  $$ /$$__  $$
//  | $$| $$  \ $$  /$$$$$$$| $$  | $$| $$| $$  \ $$| $$  \ $$
//  | $$| $$  | $$ /$$__  $$| $$  | $$| $$| $$  | $$| $$  | $$
//  | $$|  $$$$$$/|  $$$$$$$|  $$$$$$$| $$| $$  | $$|  $$$$$$$
//  |__/ \______/  \_______/ \_______/|__/|__/  |__/ \____  $$
//                                                   /$$  \ $$
//                                                  |  $$$$$$/

	function loadAssets(){
		//----------     INIT IMAGES    ----------
		cscLogo = new Image();
		youthExpertsLogo = new Image();
		ymcaLogo = new Image();
		federalLogo = new Image();
		welcomeTo = new Image();
		canadaLogo = new Image();
		heartCad = new Image();
		startGame = new Image();
		cloud01 = new Image();
		cloud02 = new Image();
		cloud03 = new Image();
		person_01 = new Image();
		person_02 = new Image();
		person_03 = new Image();
		person_04 = new Image();
		canadaBG = new Image();
		bubbleLeft = new Image();
		bubbleRight = new Image();
		dots = new Image();
		planeRight = new Image();
		planeLeft = new Image();
		okButton = new Image();
		howManyText = new Image();
		quitButton = new Image();
		cat_01_btn = new Image();
		cat_02_btn = new Image();
		cat_03_btn = new Image();
		cat_04_btn = new Image();
		cat_05_btn = new Image();
		doneText = new Image();
		pickCategory = new Image();
		connectionsHeader = new Image();
		moneyHeader = new Image();
		planningHeader = new Image();
		socialHeader = new Image();
		transitionHeader = new Image();
		didYouKnowHeader = new Image();
		smallX = new Image();
		smallCheck = new Image();
		bigX = new Image();
		bigCheck = new Image();
		questionBG = new Image();
		answerA = new Image();
		answerB = new Image();
		answerC = new Image();
		answerD = new Image();
		continueBtn = new Image();
		correctText = new Image();
		sorryText = new Image();
		playAgainBtn = new Image();

		//----------     ADD LISTENERS     ----------
		cscLogo.onload = updateLoading();
		youthExpertsLogo.onload = updateLoading();
		ymcaLogo.onload = updateLoading();
		federalLogo.onload = updateLoading();
		welcomeTo.onload = updateLoading();
		canadaLogo.onload = updateLoading();
		heartCad.onload = updateLoading();
		startGame.onload = updateLoading();
		cloud01.onload = updateLoading();
		cloud02.onload = updateLoading();
		cloud03.onload = updateLoading();
		person_01.onload = updateLoading();
		person_02.onload = updateLoading();
		person_03.onload = updateLoading();
		person_04.onload = updateLoading();
		canadaBG.onload = updateLoading();
		bubbleLeft.onload = updateLoading();
		bubbleRight.onload = updateLoading();
		dots.onload = updateLoading();
		planeRight.onload = updateLoading();
		planeLeft.onload = updateLoading();
		okButton.onload = updateLoading();
		howManyText.onload = updateLoading();
		quitButton.onload = updateLoading();
		cat_01_btn.onload = updateLoading();
		cat_02_btn.onload = updateLoading();
		cat_03_btn.onload = updateLoading();
		cat_04_btn.onload = updateLoading();
		cat_05_btn.onload = updateLoading();
		doneText.onload = updateLoading();
		pickCategory.onload = updateLoading();
		connectionsHeader.onload = updateLoading();
		moneyHeader.onload = updateLoading();
		planningHeader.onload = updateLoading();
		socialHeader.onload = updateLoading();
		transitionHeader.onload = updateLoading();
		didYouKnowHeader.onload = updateLoading();
		smallX.onload = updateLoading();
		smallCheck.onload = updateLoading();
		bigX.onload = updateLoading();
		bigCheck.onload = updateLoading();
		questionBG.onload = updateLoading();
		answerA.onload = updateLoading();
		answerB.onload = updateLoading();
		answerC.onload = updateLoading();
		answerD.onload = updateLoading();
		continueBtn.onload = updateLoading();
		correctText.onload = updateLoading();
		sorryText.onload = updateLoading();
		playAgainBtn.onload = updateLoading();

		//----------     SET SOURCES    ----------
		cscLogo.src = "images/csc_logo.png";
		youthExpertsLogo.src = "images/youthexperts_logo.png";
		ymcaLogo.src = "images/ymca_logo.png";
		federalLogo.src = "images/federal_logo.png";
		welcomeTo.src = "images/welcome_logo.png";
		canadaLogo.src = "images/canada_logo.png";
		heartCad.src = "images/heart_cad.png";
		startGame.src = "images/start_game.png";
		cloud01.src = "images/cloud_01.png";
		cloud02.src = "images/cloud_02.png";
		cloud03.src = "images/cloud_03.png";
		person_01.src = "images/person_01.png";
		person_02.src = "images/person_02.png";
		person_03.src = "images/person_03.png";
		person_04.src = "images/person_04.png";
		canadaBG.src = "images/canada_bg.png";
		bubbleLeft.src = "images/bubble_left.png";
		bubbleRight.src = "images/bubble_right.png";
		dots.src = "images/dots.png";
		planeRight.src = "images/plane_right.png";
		planeLeft.src = "images/plane_left.png";
		okButton.src = "images/ok_button.png";
		quitButton.src = "images/quit_btn.png";
		cat_01_btn.src = "images/category_01_btn.png";
		cat_02_btn.src = "images/category_02_btn.png";
		cat_03_btn.src = "images/category_03_btn.png";
		cat_04_btn.src = "images/category_04_btn.png";
		cat_05_btn.src = "images/category_05_btn.png";
		doneText.src = "images/done_text.png";
		pickCategory.src = "images/pick_category.png";
		connectionsHeader.src = "images/connections_hdr.png";
		moneyHeader.src = "images/money_hdr.png";
		planningHeader.src = "images/planning_hdr.png";
		socialHeader.src = "images/social_hdr.png";
		transitionHeader.src = "images/transition_hdr.png";
		didYouKnowHeader.src = "images/didyouknow_hdr.png";
		smallX.src = "images/small_x.png";
		smallCheck.src = "images/small_check.png";
		bigX.src = "images/big_x.png";
		bigCheck.src = "images/big_check.png";
		questionBG.src = "images/question_bg.png";
		answerA.src = "images/answer_a.png";
		answerB.src = "images/answer_b.png";
		answerC.src = "images/answer_c.png";
		answerD.src = "images/answer_d.png";
		continueBtn.src = "images/continue_btn.png";
		correctText.src = "images/correct_text.png";
		sorryText.src = "images/sorry_text.png";
		playAgainBtn.src = "images/play_again_btn.png";
	}//End of loadAssets

	//************************************
	//******     UPDATE LOADING     ******
	//************************************
	function updateLoading(){
		filesLoaded++;
		loadingProgress = filesLoaded / filesToLoad;
		if(!gameLoaded){
			if(filesLoaded >= filesToLoad && gameLoaded === false){
				gameLoaded = true;
				setTimeout(function(){
					canvas.addEventListener("touchstart",onTouch);
					canvas.addEventListener("mousedown",onTouch);
					checkRotation();
					changeState();
				},1500);
			}
		}
	}


//             /$$                                 /$$             
//            | $$                                | $$             
//    /$$$$$$ | $$$$$$$  /$$  /$$$$$$   /$$$$$$$ /$$$$$$   /$$$$$$$
//   /$$__  $$| $$__  $$|__/ /$$__  $$ /$$_____/|_  $$_/  /$$_____/
//  | $$  \ $$| $$  \ $$ /$$| $$$$$$$$| $$        | $$   |  $$$$$$ 
//  | $$  | $$| $$  | $$| $$| $$_____/| $$        | $$ /$$\____  $$
//  |  $$$$$$/| $$$$$$$/| $$|  $$$$$$$|  $$$$$$$  |  $$$$//$$$$$$$/
//   \______/ |_______/ | $$ \_______/ \_______/   \___/ |_______/ 
//                 /$$  | $$                                       
//                |  $$$$$$/                                       
//                 \______/           
	function initObjects(){

		//*********************************
		//******     URL BUTTONS     ******
		//*********************************
		urlButtonObject = function(URLtext, URLhyperlink, xPos, yPos){
			var that = this;
			that.text = URLtext;
			that.link = URLhyperlink;

			c.font = "23px Arial, sans-serif";
			that.textWidth = Math.floor(c.measureText(that.text).width);
			that.width =  that.textWidth + 40;

			that.x = xPos;
			that.y = yPos;

			that.textX = that.x + that.width / 2;
			that.textY = that.y + 28;

			that.update = function(){
				//draw button
/*				c.fillStyle = "#FFF";
				c.fillRect(that.x - (that.width / 2),that.y,that.width,40);*/


				//draw text
				c.font = "23px Arial, sans-serif";
				c.fillStyle = "#0f6ce6";
				c.textAlign = "center";
				wrapText(c,that.text,that.x,that.textY,382,23)
				//c.fillText();

				//draw underline
/*				c.strokeStyle = "#0f6ce6";
				c.lineWidth = 1;
				c.save();
					c.beginPath();
					c.moveTo(that.x - (that.textWidth / 2), that.textY + 4);
					c.lineTo(that.x + (that.textWidth / 2), that.textY + 4);
					c.stroke();
				c.restore();*/
			}

			that.clickCheck = function(clickX, clickY){
				if(clickX > that.x - (that.width / 2) && clickX < that.x + (that.width/2)){
					if(clickY > that.y && clickY < that.y + 40){
						window.open(that.link);
						return true;
					}
				}
			}
		}//end of URL button object


		//**************************************
		//******     AIRPLANE OBJECTS     ******
		//**************************************
		airplaneObject = function(){
			var that = this;
			var randomDirection = Math.floor(Math.random() * 100);
			if(randomDirection < 51){
				that.speed = .75;
				that.x = -80;
				that.image = planeRight;
			}else{
				that.speed = -.75;
				that.x = screenWidth;
				that.image = planeLeft;
			}
			that.y = Math.floor(Math.random() * 140);
			that.active = true;

			that.update = function(){
				if(that.active === true){
					that.x += that.speed;
					if(that.x < -80 || that.x > screenWidth + 20){
						that.active = false;
						activePlanes--;
						//console.log(activePlanes);
					}
				}
				c.drawImage(that.image,that.x,that.y);
			};
		};

		//***********************************
		//******     CLOUD OBJECTS     ******
		//***********************************
		cloudObject = function(startX, startY){
			//----------     INIT     ----------
			var that = this;
			that.x = startX;
			that.y = startY;
			//that.speed = Math.floor(Math.random() * 2) + 1;
			//that.speed = 1;
			that.image = null;
			that.width = null;

			var randImage = Math.floor(Math.random() * 3);
			switch(randImage){
				case 0:
					that.image = cloud01;
					that.width = 137;
					break;
				case 1:
					that.image = cloud02;
					that.width = 135;
					break;
				case 2:
					that.image = cloud03;
					that.width = 147;
					break;					
			};	


			that.update = function(){
				that.x += 0.25;
				if(that.x >= screenWidth){
					var randImage = Math.floor(Math.random() * 3);
					switch(randImage){
						case 0:
							that.image = cloud01;
							that.width = 137;
							break;
						case 1:
							that.image = cloud02;
							that.width = 135;
							break;
						case 2:
							that.image = cloud03;
							that.width = 147;
							break;					
					};	
					that.x = -that.width;
					that.y = Math.floor(Math.random() * 140) + 1;
				}
				c.drawImage(that.image, that.x, that.y);
			};

		}


		//**********************************
		//******     TEXT BUBBLES     ******
		//**********************************
		textBubbleObject = function(){
			var that = this;
			var bubbleType = Math.floor(Math.random() * 8);
			that.x = textBubbles[bubbleType][0];
			that.y = textBubbles[bubbleType][1];
			switch(textBubbles[bubbleType][2]){
				case "left":
					that.image = bubbleLeft;
					break;
				case "right":
					that.image = bubbleRight;
					break;
			}
			that.active = true;
			that.timer = new Date().getTime();
			that.life = that.timer + 2500;
			that.popTimer = that.timer + 250;
			that.scale = .35;
			that.scaleTarget = 1;
			that.scaleVel = 0;

			that.dotDraw = false;
			that.dotTimer = [
				that.popTimer + 150,
				that.popTimer + 400,
				that.popTimer + 650
			]

			that.update = function(){
				that.timer = new Date().getTime();
				if(that.timer >= that.life){
					that.active = false;
				}else{

					if(that.timer < that.popTimer){
						var distance = that.scaleTarget - that.scale;
						var accel = distance * targetSpring;
						that.scaleVel += accel;
						that.scaleVel *= targetFriction;
						that.scale += that.scaleVel;

						c.save();
							var drawPositionX = Math.floor(-(42 * that.scale) / 2) + 21;
							var drawPositionY = Math.floor(-(33 * that.scale) / 2) + 16;
							c.translate(that.x + drawPositionX,that.y + drawPositionY);
							c.scale(that.scale,that.scale);
							c.drawImage(that.image,0,0);
						c.restore();	
					}else{
						that.dotDraw = true;
						var xDraw;
						if(that.timer > that.dotTimer[0]){
							xDraw = 6;
						}
						if(that.timer > that.dotTimer[1]){
							xDraw = 12;
						}
						if(that.timer > that.dotTimer[2]){
							xDraw = 20;
						}

						c.drawImage(that.image, that.x, that.y);

						c.drawImage(dots,
							0,0,xDraw,5,	
						 	that.x + 8, that.y + 10, xDraw, 5);
					}
				}
			}
		}


		//**********************************
		//******     TITLE PEOPLE     ******
		//**********************************
		titlePeople = function(){
			var that = this;
			that.active = false;
			that.fading = true;
			that.alpha = 0;

			//----------     UPDATE     ----------
			that.update = function(){

				if(that.active === true){
					if(that.fading === true){
						that.alpha += .05;
						if(that.alpha >= 1){
							that.alpha = 1;
							that.fading = false;

						}
						c.save()
							c.globalAlpha = that.alpha;
							c.drawImage(person_01,352,150);
							c.drawImage(person_02,260,105);
							c.drawImage(person_03,184,162);
							c.drawImage(person_04,67,158);
						c.restore();
					}else{
						c.drawImage(person_01,352,150);
						c.drawImage(person_02,260,105);
						c.drawImage(person_03,184,162);
						c.drawImage(person_04,67,158);
					}
				}
			}
		}

		//**********************************
		//******     TITLE OBJECT     ******
		//**********************************
		titleObject = function(image,xpos,ypos,xtarg,ytarg){
			var that = this;
			that.active = true;
			that.image = image;
			that.x = xpos;
			that.y = ypos;
			that.targX = xtarg;
			that.targY = ytarg;
			that.update = function(){
				if(that.active === true){
					var dx = that.targX - that.x;
					var dy = that.targY - that.y;
					var velx = Math.ceil(dx*easeValue);
					var vely = Math.ceil(dy*easeValue);
					that.x += velx;
					that.y += vely;
					if(dx < 0){dx *= -1};
					if(dy < 0){dy *= -1};
					if(dx <= 3 && dy <= 3){
						that.x = that.targX;
						that.y = that.targY;
						that.active = false;
					}
				}
				c.drawImage(that.image,that.x,that.y);
			}
		}//End of titleObject

		//*********************************
		//******     TITLE POPUP     ******
		//*********************************
		titlePopUp = function(srcImage,xPos,yPos){
			var that = this;
			that.image = srcImage;
			that.x = xPos;
			that.y = yPos;
			that.scale = .2;
			that.scaleTarget = 1;
			that.scaleVel = 0;
			that.width = that.image.width;
			that.height = that.image.height;
			that.timer = new Date().getTime(), 
			that.life = 1200;
			that.active = true;
			that.update = function(){
				var timerCheck = new Date().getTime();
				if(timerCheck >= that.timer + that.life){
					that.active = false;
				}else{
					var distance = that.scaleTarget - that.scale;
					var accel = distance * targetSpring;
					that.scaleVel += accel;
					that.scaleVel *= targetFriction;
					that.scale += that.scaleVel;
				}
				if(that.active == true){
					c.save();
						var drawPositionX = Math.floor(-(that.width * that.scale) / 2);
						var drawPositionY = Math.floor(-(that.height * that.scale) / 2);
						c.translate(that.x + drawPositionX,that.y + drawPositionY);
						c.scale(that.scale,that.scale);
						c.drawImage(that.image,0,0);
					c.restore();
				}else{
					c.drawImage(that.image,that.x - that.width/2,that.y - that.height/2);
				}
			}
		}//End of title popup

		//*********************************
		//******     SCREEN FADE     ******
		//*********************************
		screenFade = function(startAlpha,targetAlpha,fadeColor){
			//----------     INIT     ----------
			var that = this;
			that.alpha = startAlpha;
			that.targetAlpha = targetAlpha;
			that.color = fadeColor;
			that.active = true;

			//----------     UPDATE     ----------
			that.update = function(){
				if(that.active == true){
					if(that.alpha > that.targetAlpha){
						that.alpha -= .05;
						if(that.alpha <= that.targetAlpha){
							that.alpha = that.targetAlpha;
							that.active = false;
						}
					}else{
						that.alpha += .05;
						if(that.alpha >= that.targetAlpha){
							that.alpha = that.targetAlpha;
						}
					}
					c.fillStyle = that.color;
					c.save()
						c.globalAlpha = that.alpha;
						c.fillRect(0,0,screenWidth,screenHeight);
					c.restore();
				}
			}
		}//End of Screen Fade
	}//End of initObjects

//                             /$$             /$$              
//                            | $$            | $$              
//   /$$   /$$  /$$$$$$   /$$$$$$$  /$$$$$$  /$$$$$$    /$$$$$$ 
//  | $$  | $$ /$$__  $$ /$$__  $$ |____  $$|_  $$_/   /$$__  $$
//  | $$  | $$| $$  \ $$| $$  | $$  /$$$$$$$  | $$    | $$$$$$$$
//  | $$  | $$| $$  | $$| $$  | $$ /$$__  $$  | $$ /$$| $$_____/
//  |  $$$$$$/| $$$$$$$/|  $$$$$$$|  $$$$$$$  |  $$$$/|  $$$$$$$
//   \______/ | $$____/  \_______/ \_______/   \___/   \_______/
//            | $$                                              
//            | $$                                              
//            |__/      
	//Quick fix using request anim to call the update screen
	function loop(){requestAnimationFrame(updateScreen);};

	function updateScreen(){
		//-------------------------------------
		//----------     LOADING     ----------
		//-------------------------------------
		if(GAME_STATE === "loading"){
			c.fillStyle = backgroundColor;
			c.fillRect(0,0,screenWidth,screenHeight);
			c.fillStyle = "#FFF";
			c.textAlign = "center";
			c.font = "28px arial, sans-serif";
			c.fillText("Loading...", halfWidth, halfHeight);
		}

		//-----------------------------------
		//----------     TITLE     ----------
		//-----------------------------------
		if(GAME_STATE === "title"){
			c.fillStyle = backgroundColor;
			c.fillRect(0,0,screenWidth,screenHeight);

			c.drawImage(canadaBG,-7,0);

			c.textAlign = "center";
			c.fillStyle = "#FFF";
			c.font = "18px arial, sans-serif";
			wrapText(c,
				titleScreenText,
				halfWidth,260,388,19);

			var currentTime = new Date().getTime();
			if(currentTime >= airplaneDelay && activePlanes < 2){
				for(ii=0;ii<2;ii++){
					if(!activePlaneObjects[ii] || activePlaneObjects[ii].active === false){
						activePlaneObjects[ii] = new airplaneObject();
						airplaneDelay = currentTime + Math.floor(Math.random() * 8000) + 8000;
						activePlanes++;
						break;
					}
				}
			}

			activePlaneObjects.forEach(function(airplaneObject,index){
				if(airplaneObject.active === true){
					airplaneObject.update();
				}
			});


			activeCloudObjects.forEach(function(cloudObject,index){
				cloudObject.update();
			});

			activeTitlePopups.forEach(function(titlePopUp,index){
				titlePopUp.update();
			});

			activeTitleObjects.forEach(function(titleObject,index){
				titleObject.update();
			});

			if(startButtonActive === true){
				drawScaledImage(startGame,startGameBtnScale,209,419);
			}

			activeTitlePeople[0].update();

			if(activeTextBubble[0]){
				activeTextBubble[0].update();
				if(activeTextBubble[0].active === false){
					activeTextBubble[0] = new textBubbleObject;
				}
			}

			activeFadeObjects.forEach(function(fadeObject,index){
				fadeObject.update();
			});
		};

		//----------------------------------------
		//----------     CATEGORIES     ----------
		//----------------------------------------
		if(GAME_STATE === "categories"){
			c.fillStyle = backgroundColor;
			c.fillRect(0,0,screenWidth,screenHeight);

			c.drawImage(canadaBG,-7,0);

			c.save();
				c.globalAlpha = quitButtonAlpha;
				c.drawImage(quitButton,343,495);
			c.restore();

			activeTitleObjects.forEach(function(titleObject,index){
				titleObject.update();
			});
		}


		//---------------------------------------
		//----------     QUESTIONS     ----------
		//---------------------------------------
		if(GAME_STATE === "questions"){
			c.fillStyle = backgroundColor;
			c.fillRect(0,0,screenWidth,screenHeight);

			c.drawImage(canadaBG,-7,0);

			activeTitleObjects.forEach(function(titleObject,index){
				titleObject.update();
			});

			if(showAnswerButtons === true && popUpActive === false){
				c.drawImage(answerA,15,179);
				c.drawImage(answerB,15,263);
				if(answer3Text != ""){
					c.drawImage(answerC,15,343);
					c.drawImage(answerD,15,422);
				}
			}

			if(showQuestionText === true){

				c.textAlign = "left";
				c.fillStyle = "#000";
				c.font = "18px arial, sans-serif";
				wrapText(c,
					questionText,
					16,96,390,19);

				wrapText(c,
					answer1Text,
					81,191,323,19);

				wrapText(c,
					answer2Text,
					81,281,323,19);

				wrapText(c,
					answer3Text,
					81,360,323,19);

				wrapText(c,
					answer4Text,
					81,441,323,19);

				switch(currentCategory){
					case 1:
						c.drawImage(moneyHeader,20,27);
						break;
					case 2:
						c.drawImage(connectionsHeader,20,27);
						break;
					case 3:
						c.drawImage(socialHeader,20,27);
						break;
					case 4:
						c.drawImage(transitionHeader,20,27);
						break;
					case 5:
						c.drawImage(planningHeader,20,27);
						break;					
				}
			}

			if(questionAnswered === true && popUpActive === false){
				activeTitlePopups.forEach(function(titlePopUp,index){
					titlePopUp.update();
				});
			}

			if(popUpActive === true && showPopUpText === true){
				c.textAlign = "left";
				c.fillStyle = "#000";
				c.font = "20px arial, sans-serif";

				wrapText(c,
					popUpText,
					31,100,360,21);

				c.drawImage(didYouKnowHeader,20,27);

			}

			activeFadeObjects.forEach(function(fadeObject,index){
				fadeObject.update();
			});
		}//end of questions screen


		if(GAME_STATE === "scores"){
		}//end of scores screen


		//----------------------------------------
		//----------     END SCREEN     ----------
		//----------------------------------------
		if(GAME_STATE === "end_screen"){
			c.fillStyle = backgroundColor;
			c.fillRect(0,0,screenWidth,screenHeight);

			c.drawImage(canadaBG,-7,0);

			c.textAlign = "center";
			c.fillStyle = "#FFF";
			c.font = "18px arial, sans-serif";

			wrapText(c,
				endScreenText,
				halfWidth,58,387,19);	

			c.fillStyle = "#FFF";
			c.fillRect(86,204,245,73);

			c.fillStyle = "#003399";
			c.font = "25px arial, sans-serif";
			wrapText(c,
				"Tap here for links to more resources",
				halfWidth,236,265,26);


			c.drawImage(youthExpertsLogo,19,487);
			c.drawImage(federalLogo,173,502);
			c.drawImage(cscLogo,269,495);
			c.drawImage(ymcaLogo,354,486);

			activeTitlePopups[0].update();

			if(showEndResources === true){

				c.save()
					c.fillStyle = "#000"
					c.globalAlpha = 0.8;
					c.fillRect(0,0,screenWidth,screenHeight);
				c.restore();

				c.drawImage(questionBG,1,7);
				c.drawImage(okButton,342,488);

				activeURLButtons.forEach(function(urlButtonObject,index){
					urlButtonObject.update();
				});

			};

			activeFadeObjects.forEach(function(fadeObject,index){
				fadeObject.update();
			});
		}//end of end screen

	}//End of updateScreen


//               /$$                 /$$              
//              | $$                | $$              
//    /$$$$$$$ /$$$$$$    /$$$$$$  /$$$$$$    /$$$$$$ 
//   /$$_____/|_  $$_/   |____  $$|_  $$_/   /$$__  $$
//  |  $$$$$$   | $$      /$$$$$$$  | $$    | $$$$$$$$
//   \____  $$  | $$ /$$ /$$__  $$  | $$ /$$| $$_____/
//   /$$$$$$$/  |  $$$$/|  $$$$$$$  |  $$$$/|  $$$$$$$
//  |_______/    \___/   \_______/   \___/   \_______/
//  
	function changeState(){
		switch(GAME_STATE){
			//-----------------------------------
			//---------     LOADING     ---------
			//-----------------------------------
			case "loading":
				activeFadeObjects[0] = new screenFade(1,0,backgroundColor);
				activeTitlePeople[0] = new titlePeople();

				setupClouds();

				setTimeout(function(){
					activeTitleObjects[activeTitleObjects.length] = new titleObject(canadaLogo,55,screenHeight,55, 118);
				},850);

				setTimeout(function(){
					activeTitleObjects[activeTitleObjects.length] = new titleObject(welcomeTo,94,-200,94, 97);
				},1000);

				setTimeout(function(){
					activeTitlePopups[activeTitlePopups.length] = new titlePopUp(heartCad,41,134);
				},1500);

				setTimeout(function(){
					
					activeTitleObjects[activeTitleObjects.length] = new titleObject(youthExpertsLogo,19,screenHeight,19, 487);
					activeTitleObjects[activeTitleObjects.length] = new titleObject(federalLogo,173,screenHeight + 100,173, 502);
					activeTitleObjects[activeTitleObjects.length] = new titleObject(cscLogo,269,screenHeight + 200,269, 495);
					activeTitleObjects[activeTitleObjects.length] = new titleObject(ymcaLogo,354,screenHeight + 300,354, 486);
				},1800);

				setTimeout(function(){
					titleScreenText = "Welcome to Canada is a trivia game co-created with newcomer youth in Winnipeg, MB. In this game, learn about money, jobs, building connections, Canadian social customs, how to cope with change, and planning for the future.",
					activeTitlePopups[activeTitlePopups.length] = new titlePopUp(startGame,209,419);
					activeTitlePeople[0].active = true;
					activeTextBubble[0] = new textBubbleObject();
				},2300);

				setTimeout(function(){
					startButtonActive = true;
					activeTitlePopups.splice(1,1);
				},3500);


				GAME_STATE = "title";
				break;

			//--------------------------------
			//---------     TITLE    ---------
			//--------------------------------
			case "title":
				activeTitlePopups = [];
				activeTitleObjects = [];
				activeFadeObjects = [];
				
				activeTitleObjects[activeTitleObjects.length] = new titleObject(pickCategory,-290,15,69,15);

				activeTitleObjects[activeTitleObjects.length] = new titleObject(cat_01_btn,screenWidth,69,53,69);
				activeTitleObjects[activeTitleObjects.length] = new titleObject(cat_02_btn,screenWidth + 100,151,53,151);
				activeTitleObjects[activeTitleObjects.length] = new titleObject(cat_03_btn,screenWidth + 300,235,53,235);
				activeTitleObjects[activeTitleObjects.length] = new titleObject(cat_04_btn,screenWidth + 500,319,53,319);
				activeTitleObjects[activeTitleObjects.length] = new titleObject(cat_05_btn,screenWidth + 700,402,53,402);

				GAME_STATE = "categories";
				break;

			case "categories":
				activeTitlePopups = [];
				activeTitleObjects = [];
				activeFadeObjects = [];
				showQuestionText = false;

				activeTitleObjects[activeTitleObjects.length] = new titleObject(questionBG,1,screenHeight,1,7);
				
				setTimeout(function(){
					activeTitleObjects[activeTitleObjects.length] = new titleObject(answerA,-62,179,15,179);
					activeTitleObjects[activeTitleObjects.length] = new titleObject(answerB,-200,263,15,263);
					if(answer3Text != ""){
						activeTitleObjects[activeTitleObjects.length] = new titleObject(answerC,-300,343,15,343);
						activeTitleObjects[activeTitleObjects.length] = new titleObject(answerD,-400,422,15,422);
					}

					showQuestionText = true;
				},500);

				setTimeout(function(){
					showAnswerButtons = true;
					activeTitleObjects.splice(1,4);
				},1100);

				GAME_STATE = "questions";
				break;

			case "questions":

				if(totalQuestionsRemaining > 0){
					activeTitlePopups = [];
					activeTitleObjects = [];
					activeFadeObjects = [];
					popUpActive = false;
					showPopUpText = false;
					activeTitleObjects[activeTitleObjects.length] = new titleObject(pickCategory,-290,15,69,15);

					activeTitleObjects[activeTitleObjects.length] = new titleObject(cat_01_btn,screenWidth,69,53,69);
					activeTitleObjects[activeTitleObjects.length] = new titleObject(cat_02_btn,screenWidth + 100,151,53,151);
					activeTitleObjects[activeTitleObjects.length] = new titleObject(cat_03_btn,screenWidth + 300,235,53,235);
					activeTitleObjects[activeTitleObjects.length] = new titleObject(cat_04_btn,screenWidth + 500,319,53,319);
					activeTitleObjects[activeTitleObjects.length] = new titleObject(cat_05_btn,screenWidth + 700,402,53,402);

					showAnswerButtons = false;
					updateCategoryTracker();

					if(numberOfPlayers > 1){
						currentPlayer++;
						if(currentPlayer > numberOfPlayers){
							currentPlayer = 1;
						}
					}

					GAME_STATE = "categories";
				}else{

					//if multiplayer show final scores and winner
					if(numberOfPlayers > 1){
						activeTitlePopups = [];
						activeTitleObjects = [];
						activeFadeObjects = [];
						okayButtonActive = false;
						setTimeout(addOkayButton,800);
						finalScores();
						activeTitleObjects[activeTitleObjects.length] = new titleObject(congratsText,screenWidth,459,162,459);
						GAME_STATE = "scores";

					}else{
						activeFadeObjects[0] = new screenFade(0,1,backgroundColor);
						setTimeout(function(){
							showAnswerButtons = false;
							setupEndURLs();
							activeFadeObjects[0] = new screenFade(1,0,backgroundColor);
							activeTitlePopups[0] = new titlePopUp(playAgainBtn,209,384);
							GAME_STATE = "end_screen";
						},850);
					}
				}

				break;

			case "scores":
				activeFadeObjects[0] = new screenFade(0,1,backgroundColor);
				setupEndURLs();
				setTimeout(function(){
					showAnswerButtons = false;
					activeFadeObjects[0] = new screenFade(1,0,backgroundColor);
					activeTitlePopups[0] = new titlePopUp(playAgainBtn,920,115);
					GAME_STATE = "end_screen";
				},850);
				break;


			case "end_screen":
				activeFadeObjects[0] = new screenFade(1,0,backgroundColor);
				activeTitlePeople[0] = new titlePeople();
				activeTextBubble = [];
				setupClouds();

				setTimeout(function(){
					activeTitleObjects[activeTitleObjects.length] = new titleObject(canadaLogo,55,screenHeight,55, 118);
				},850);

				setTimeout(function(){
					activeTitleObjects[activeTitleObjects.length] = new titleObject(welcomeTo,94,-200,94, 97);
				},1000);

				setTimeout(function(){
					activeTitlePopups[activeTitlePopups.length] = new titlePopUp(heartCad,41,134);
				},1500);

				setTimeout(function(){
					activeTitleObjects[activeTitleObjects.length] = new titleObject(youthExpertsLogo,19,screenHeight,19, 487);
					activeTitleObjects[activeTitleObjects.length] = new titleObject(federalLogo,173,screenHeight + 100,173, 502);
					activeTitleObjects[activeTitleObjects.length] = new titleObject(cscLogo,269,screenHeight + 200,269, 495);
					activeTitleObjects[activeTitleObjects.length] = new titleObject(ymcaLogo,354,screenHeight + 300,354, 486);
				},1800);

				setTimeout(function(){
					titleScreenText = "Welcome to Canada is a trivia game co-created with newcomer youth in Winnipeg, MB. In this game, learn about money, jobs, building connections, Canadian social customs, how to cope with change, and planning for the future.",
					activeTitlePopups[activeTitlePopups.length] = new titlePopUp(startGame,209,419);
					activeTitlePeople[0].active = true;
					activeTextBubble[0] = new textBubbleObject();
				},2300);

				setTimeout(function(){
					startButtonActive = true;
					activeTitlePopups.splice(1,1);
				},3500);

				GAME_STATE = "title";
				break;
		}
	}
//   /$$                                 /$$    
//  |__/                                | $$    
//   /$$ /$$$$$$$   /$$$$$$  /$$   /$$ /$$$$$$  
//  | $$| $$__  $$ /$$__  $$| $$  | $$|_  $$_/  
//  | $$| $$  \ $$| $$  \ $$| $$  | $$  | $$    
//  | $$| $$  | $$| $$  | $$| $$  | $$  | $$ /$$
//  | $$| $$  | $$| $$$$$$$/|  $$$$$$/  |  $$$$/
//  |__/|__/  |__/| $$____/  \______/    \___/  
//                | $$                          
//                | $$                          
//                |__/   

	//******************************
	//******     ON TOUCH     ******
	//******************************
	function onTouch(e){
		//window.scrollTo(0,1);
		e.preventDefault();

 		if(!INPUT_TYPE){
			if(e.clientX){
				INPUT_TYPE = "mouse";
				container.removeEventListener("touchstart",onTouch);
				container.addEventListener("mouseup",onRelease);
				container.addEventListener("mousemove",onMove);
			}else{
				INPUT_TYPE = "touch";
				container.removeEventListener("mousedown",onTouch);
				container.addEventListener("touchend",onRelease);
			}
		}
		if(INPUT_TYPE == "mouse"){
			clickX = e.clientX - offsetX;clickY = e.clientY - offsetY;
		}else{
			clickX = e.touches[0].pageX - offsetX;clickY = e.touches[0].pageY - offsetY;
		}

		var modelY = clickY * (canvas.height / canvas.offsetHeight);
		var modelX = clickX * (canvas.width / canvas.offsetWidth);

	}//End of onTouch

	//********************************
	//******     ON RELEASE     ******
	//********************************
	function onRelease(e){
		//window.scrollTo(0,1);
		e.preventDefault();

		var modelY = clickY * (canvas.height / canvas.offsetHeight);
		var modelX = clickX * (canvas.width / canvas.offsetWidth);

		switch(GAME_STATE){
			case "title":
				if(modelX > 159 && modelX < 259){
					if(modelY > 373 && modelY < 463){
						changeState();
					}
				}
				break;

			case "categories":
				//quit button
				if(modelX > 347 && modelX < 416){//953,711
					if(modelY > 497){
						setupEndURLs();
						activeTitlePopups[0] = new titlePopUp(playAgainBtn,209,384);
						activeFadeObjects[0] = new screenFade(1,0,backgroundColor);
						GAME_STATE = "end_screen";
					}
				}

				if(categorySelected === false){
					//Category buttons
					if(modelX > 58 && modelX < 364){
						//Category 1
						if(modelY > 79 && modelY < 145){
							if(cat1Questions.length > 0){
								currentCategory = 1;
								getQuestion(cat1Questions);
								transitionToQuestions();
							}
						}
						//Category 2
						if(modelY > 164 && modelY < 230){
							if(cat2Questions.length > 0){
								currentCategory = 2;
								getQuestion(cat2Questions);
								transitionToQuestions();
							}
						}
						//Category 3
						if(modelY > 247 && modelY < 313){
							if(cat3Questions.length > 0){
								currentCategory = 3;
								getQuestion(cat3Questions);
								transitionToQuestions();
							}
						}
						//Category 4
						if(modelY > 331 && modelY < 397){
							if(cat4Questions.length > 0){
								currentCategory = 4;
								getQuestion(cat4Questions);
								transitionToQuestions();
							}
						}
						//Category 5
						if(modelY > 413 && modelY < 479){
							if(cat5Questions.length > 0){
								currentCategory = 5;
								getQuestion(cat5Questions);
								transitionToQuestions();
							}
						}
					}
				}
				
				break;

			case "questions":
				if(questionAnswered === false){
					if(modelY > 167 && modelY < 241){
						checkAnswer(1);
					}
					if(modelY > 249 && modelY < 323){
						checkAnswer(2);
					}
					if(modelY > 332 && modelY < 406){
						if(answer3Text != ""){
							checkAnswer(3);
						}
					}
					if(modelY > 415 && modelY < 489){
						if(answer3Text != ""){
							checkAnswer(4);
						}
					}	
				}else{
					if(popUpText != "" && popUpActive === false){
						activeTitleObjects = [];
						activeTitlePopups = [];
						activeTitleObjects.splice(activeTitleObjects.length-1,1);

						activeTitleObjects[activeTitleObjects.length] = new titleObject(questionBG,1,screenHeight,1,7);
						popUpActive = true;
						setTimeout(function(){
							showPopUpText = true;
							activeTitleObjects[activeTitleObjects.length] = new titleObject(continueBtn,58,screenHeight,58,515);
						},500);
						showQuestionText = false;
						categorySelected = false;
					}else{
						showQuestionText = false;
						categorySelected = false;
						changeState();
					}	
				}
				break;

			case "scores":
				break;

			case "end_screen":
				//check buttons
				if(showEndResources === true){
					for(ii=0;ii<endURLs.length;ii++){
						if(activeURLButtons[ii].clickCheck(modelX,modelY)){
							urlClicked = true;
							//console.log('exiting loop');
							break;
						};
					}
					//ok button
					if(modelX > 342 && modelX < 410){
						if(modelY > 488 && modelY < 540){
							showEndResources = false;
						}
					}
				}else{
					//play again button
					if(modelY > 331 && modelY < 423){
						if(modelX > 159 && modelX < 260){
							resetQuiz();
							changeState();
						}
					}

					//More resources button
					if(modelY > 203 && modelY < 280){
						if(modelX > 83 && modelX < 337){
							showEndResources = true;
						}
					}

					//end screen logos
					if(modelY > 483 && modelY < 540){
						//youth experts
						if(modelX > 11 && modelX < 149){
							window.open("https://youthexperts.ca/");
						}
						//federal
						if(modelX > 166 && modelX < 254){
							window.open("https://www.canada.ca/en/services/youth/canada-service-corps.html");
						}
						//csc
						if(modelX > 264 && modelX < 330){
							window.open("https://www.canada.ca/en/services/youth/canada-service-corps.html");
						}
						//ymca
						if(modelX > 346 && modelX < 401){
							window.open("http://www.ywinnipeg.ca/");
						}
					}
				}
				break;
		}
	}//End of onrelease	


	//*****************************
	//******     ON MOVE     ******
	//*****************************
	function onMove(e){
		//window.scrollTo(0,1);
		e.preventDefault();

		if(INPUT_TYPE == "mouse"){
			clickX = e.clientX - offsetX;clickY = e.clientY - offsetY;
		}else{
			clickX = e.touches[0].pageX - offsetX;clickY = e.touches[0].pageY - offsetY;
		}
	}

//   /$$$$$$$$                              /$$     /$$                              
//  | $$_____/                             | $$    |__/                              
//  | $$    /$$   /$$ /$$$$$$$   /$$$$$$$ /$$$$$$   /$$  /$$$$$$  /$$$$$$$   /$$$$$$$
//  | $$$$$| $$  | $$| $$__  $$ /$$_____/|_  $$_/  | $$ /$$__  $$| $$__  $$ /$$_____/
//  | $$__/| $$  | $$| $$  \ $$| $$        | $$    | $$| $$  \ $$| $$  \ $$|  $$$$$$ 
//  | $$   | $$  | $$| $$  | $$| $$        | $$ /$$| $$| $$  | $$| $$  | $$ \____  $$
//  | $$   |  $$$$$$/| $$  | $$|  $$$$$$$  |  $$$$/| $$|  $$$$$$/| $$  | $$ /$$$$$$$/
//  |__/    \______/ |__/  |__/ \_______/   \___/  |__/ \______/ |__/  |__/|_______/ 
//    

	//**********************************
	//******     GET QUESTION     ******
	//**********************************
	function getQuestion(questionsArray){
		var currentQuestion = questionsArray[questionsArray.length - 1];
		questionsArray.splice(questionsArray.length - 1,1);
		thisQuestion = eval("category_" + currentCategory +
		                "." + "question_" + currentQuestion);
        questionText = thisQuestion.text;
        answer1Text = thisQuestion.answer1;
        answer2Text = thisQuestion.answer2;
        answer3Text = thisQuestion.answer3;
        answer4Text = thisQuestion.answer4;

        popUpText = thisQuestion.popup.toString();  
        //console.log(popUpText);
        correctAnswer = thisQuestion.correctAnswer;

        questionAnswered = false;
	}

	//*************************************
	//******     FILL CATEGORIES     ******
	//*************************************
	//Receives an empty questions array and randomly fills it with
	//question numbers (non repeating)
	function fillCategory(questionArray){
		var availableNums = [1,2,3,4,5,6,7,8,9,10];
		for(ii=0;ii<5;ii++){
			var randomNum = Math.floor(Math.random() * availableNums.length);
			questionArray.push(availableNums[randomNum]);
			availableNums.splice(randomNum,1);
		}
	}


	//***********************************
	//******     ADD OK BUTTON     ******
	//***********************************
	function addOkayButton(){
		if(okayButtonActive === false){
			activeTitlePopups[1] = new titlePopUp(okButton,968,711);
			setTimeout(function(){
				okayButtonActive = true;
				activeTitlePopups.splice(1,1);

			},800);	
		}
	}

	//*******************************
	//******     WRAP TEXT     ******
	//*******************************
	function wrapText(context, text, x, y, maxWidth, lineHeight) {
		//console.log(text);
		var words = text.split(" ");
		var line = "";
		for(var n = 0; n < words.length; n++) {
		  var testLine = line + words[n] + " ";
		  var metrics = context.measureText(testLine);
		  var testWidth = metrics.width;
		  if(testWidth > maxWidth) {
			context.fillText(line, x, y);
			line = words[n] + " ";
			y += lineHeight;
		  }
		  else {
			line = testLine;
		  }
		}
		context.fillText(line, x, y);
	};//End of wrap text

	//***************************************
	//******     DRAW SCALED IMAGE     ******
	//***************************************
	function drawScaledImage(image, scale, x, y){
		var centerX = image.width / 2 * scale;
		var centerY = image.height / 2 * scale;
		c.save();
			c.translate(x - centerX, y - centerY);
			c.scale(scale,scale);
			c.drawImage(image,0,0);
		c.restore();
	};//End of draw scaled image

	//********************************
	//******     RESET QUIZ     ******
	//********************************
	function resetQuiz(){

		activeFadeObjects = [];
		activeTitleObjects = [];
		activeTitlePopups = [];
		activeTitlePeople = [];
		activeURLButtons = [];
		showCatButtons = false;

		plNumSelected = false;
		numberOfPlayers = 0;
		currentPlayer = 1;
		playerScores = [0,0,0,0]

		currentHilight = 0;
		startButtonActive = false;
		startGameBtnScale = 1.0;
		okayButtonActive = false;
		okayButtonScale = 1.0;

		cat1Scale = 1.0;
		cat2Scale = 1.0;
		cat3Scale = 1.0;
		cat4Scale = 1.0;
		cat5Scale = 1.0;

		categorySelected = false;
		answer1Scale = 1.0;
		answer2Scale = 1.0;
		answer3Scale = 1.0;
		answer4Scale = 1.0;
		categoryText = "";
		questionText = "";
		answer1Text = "";
		answer2Text = "";
		answer3Text = "";
		answer4Text = "";
		thisQuestion = null;
		currentCategory = 1;
		currentQuestion = 1;
		currentHilight = 0;
		showPrompt = false;
		showAnswerButtons = false;
		questionActive = false;
		popUpActive = false;
		questionAnswered = false;
		showAnswerPrompt = false;
		answeredCorrect = false;
		showPopUpText = false;
		totalQuestionsRemaining = 25;
		cat1Questions = [];
		cat2Questions = [];
		cat3Questions = [];
		cat4Questions = [];
		cat5Questions = [];

		categoryScores =[
			[],
			[],
			[],
			[],
			[]
		]

		winner = 0;

		fillCategory(cat1Questions);
		fillCategory(cat2Questions);
		fillCategory(cat3Questions);
		fillCategory(cat4Questions);
		fillCategory(cat5Questions);

		finalScoreText = "";

		cat_01_btn.src = "images/category_01_btn.png";
		cat_02_btn.src = "images/category_02_btn.png";
		cat_03_btn.src = "images/category_03_btn.png";
		cat_04_btn.src = "images/category_04_btn.png";
		cat_05_btn.src = "images/category_05_btn.png";

		showEndResources = false;
	};



	//*********************************************
	//******     TRANSITION TO QUESTIONS     ******
	//*********************************************
	function transitionToQuestions(){

		categorySelected = true;

		activeTitleObjects = [];


		activeTitleObjects[activeTitleObjects.length] = new titleObject(cat_01_btn,53,69 ,-320,69 );
		activeTitleObjects[activeTitleObjects.length] = new titleObject(cat_02_btn,53,151,-320,151);
		activeTitleObjects[activeTitleObjects.length] = new titleObject(cat_03_btn,53,235,-320,235);
		activeTitleObjects[activeTitleObjects.length] = new titleObject(cat_04_btn,53,319,-320,319);
		activeTitleObjects[activeTitleObjects.length] = new titleObject(cat_05_btn,53,402,-320,402);

		setTimeout(function(){
			changeState();
		},650);
	}



	//**********************************
	//******     CHECK ANSWER     ******
	//**********************************
	function checkAnswer(playerGuess){
		//set up correct and incorrect displays
		answeryPos = 0;
		correctYPos = 0;
		answeredCorrect = false;

		switch(thisQuestion.correctAnswer){
			case 1:
				answerYPos = 204;
				break;
			case 2:
				answerYPos = 289;
				break;	
			case 3:
				answerYPos = 369;
				break;	
			case 4:
				answerYPos = 452;
				break;	
		}

		switch(playerGuess){
			case 1:
				guessYPos = 204;
				break;
			case 2:
				guessYPos = 289;
				break;	
			case 3:
				guessYPos = 369;
				break;	
			case 4:
				guessYPos = 452;
				break;	
		}

		if(playerGuess === thisQuestion.correctAnswer){
			playerScores[currentPlayer-1] += 1;
			answeredCorrect = true;
			categoryScores[currentCategory-1].push(1);
			activeTitlePopups[activeTitlePopups.length] = new titlePopUp(bigCheck,44,answerYPos);
			activeTitleObjects[activeTitleObjects.length] = new titleObject(correctText,screenWidth,4,261,4);
		}else{
			categoryScores[currentCategory-1].push(0);
			activeTitlePopups[activeTitlePopups.length] = new titlePopUp(bigX,44,guessYPos);
			activeTitlePopups[activeTitlePopups.length] = new titlePopUp(bigCheck,44,answerYPos);
			activeTitleObjects[activeTitleObjects.length] = new titleObject(sorryText,screenWidth,4,278,4);
		}

		activeTitleObjects[activeTitleObjects.length] = new titleObject(continueBtn,58,screenHeight,58,515);

		totalQuestionsRemaining--;
		showAnswerPrompt = true;
		questionAnswered = true;
	}//end of check answer


	//*********************************************
	//******     UPDATE CATEGORY TRACKER     ******
	//*********************************************
	function updateCategoryTracker(){
		//Set size and redraw current category image
		var sourceImage;
		switch(currentCategory){
			case 1:
				sourceImage = cat_01_btn;
				break;
			case 2:
				sourceImage = cat_02_btn;
				break;
			case 3:
				sourceImage = cat_03_btn;
				break;
			case 4:
				sourceImage = cat_04_btn;
				break;
			case 5:
				sourceImage = cat_05_btn;
				break;				
		}

		redrawCanvas.width = sourceImage.width;
		redrawCanvas.height = sourceImage.height;
		redrawContext.drawImage(sourceImage,0,0);

		for(ii=0; ii<categoryScores[currentCategory-1].length; ii++){
			if(categoryScores[currentCategory-1][ii] === 1){
				redrawContext.drawImage(smallCheck,15 + (ii * 28),2);
			}else{
				redrawContext.drawImage(smallX,15 + (ii * 28),2);
			}
		}

		if(categoryScores[currentCategory-1].length === 5){
			//redrawContext.fillText("DONE!",30,30);
			redrawContext.drawImage(doneText,120,10);
		}

		//re-source image
		switch(currentCategory){
			case 1:
				cat_01_btn.src = redrawCanvas.toDataURL();
				break;
			case 2:
				cat_02_btn.src = redrawCanvas.toDataURL();
				break;
			case 3:
				cat_03_btn.src = redrawCanvas.toDataURL();
				break;
			case 4:
				cat_04_btn.src = redrawCanvas.toDataURL();
				break;
			case 5:
				cat_05_btn.src = redrawCanvas.toDataURL();
				break;				
		}


	};

	//***************************************
	//******     CALC FINAL SCORES     ******
	//***************************************
	function finalScores(){
		//Get the high score number
		var topScore = Math.max.apply(null, playerScores);

		//Find it in the array
		winner = playerScores.indexOf(topScore);
		winner += 1;

		//make sure it's not a tie
		var count = 0;
		for(ii=0;ii<numberOfPlayers;ii++){
			if(playerScores[ii] === topScore){
				count++;
			}
		}

		if(count > 1){
			finalScoreText = "It's a Tie Game!";
		}else{
			finalScoreText = "Player " + winner + " Wins!";
		}
	}


	function setupEndURLs(){

		for(ii=0;ii<endURLs.length;ii++){
			activeURLButtons[ii] = new urlButtonObject(
					endURLs[ii][0],
					endURLs[ii][1],
					endURLs[ii][2],
					endURLs[ii][3]
				)
		}


	}//end of endURL setup

	function setupClouds(){
		activeCloudObjects[0] = new cloudObject(-25,14);
		activeCloudObjects[1] = new cloudObject(220,60);
		activeCloudObjects[2] = new cloudObject(410,95);
		activeCloudObjects[3] = new cloudObject(-200,120);
	};

	//****************************
	//******     RESIZE     ******
	//****************************
	window.onresize = function() {
		offsetX = canvas.offsetLeft;
		offsetY = container.offsetTop;
		//checkRotation()
	};

	function checkRotation(){
		//var body = document.getElementsByTagName("body")[0];
		//var canvasBox = canvas.getBoundingClientRect();
		//console.log(window.innerHeight);
		//console.log(canvas.clientHeight);

		/*
		If the target rotation is landscape then when it's in
		lanscape mode there should be no difference between the
		canvas height and the body height.

		If the target rotation is portrait then when it's in
		portrait mode there should be no difference between the
		canvas width and the body width.	
		*/

/*		if(body.clientHeight > canvas.clientHeight){
			console.log("Wrong orientation");
			wrongOrientation = true;
		}else{
			console.log("fixed");
			wrongOrientation = false;
		}
*/
	}

}());//End of IIFE