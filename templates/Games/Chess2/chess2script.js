class Game {
	constructor(pieces) {		
		this.board   = document.getElementById('board');
		this.squares = this.board.querySelectorAll('.square');
		this.pieces  = pieces;
		this.turn    = 'white';
		this.turnSign = document.getElementById('turn');
		this.clickedPiece = null;
		this.allowedMoves = null;
		this.addEventListeners();
		this.whiteSematary = document.getElementById('whiteSematary');
		this.blackSematary = document.getElementById('blackSematary');
	}

	addEventListeners() {
		this.pieces.forEach( piece => {
			piece.img.addEventListener("click", this.pieceMove.bind(this)); 
			piece.img.addEventListener("dragstart", this.pieceMove.bind(this)); 
			piece.img.addEventListener("drop", this.pieceMove.bind(this));
		});
		this.squares.forEach( square => {
			square.addEventListener("click", this.movePiece.bind(this)); 
			square.addEventListener("dragover", function(event){
				event.preventDefault();
			}); 
			square.addEventListener("drop", this.movePiece.bind(this)); 
		});
	}

	pieceMove(event) {
		const name = event.target.getAttribute('id');
		const allowedMoves = this.getPieceAllowedMoves(event, name);
		if (allowedMoves) {
			const position = this.getPieceByName(name).position;
			const clickedSquare = document.getElementById(position);

			/*if (event.type == 'click' && this.clickedPiece && this.clickedPiece.name == name) {
				this.setClickedPiece(null);
				return this.clearSquares();
			}*/
			clickedSquare.classList.add('clicked-square');

			allowedMoves.forEach( allowedMove => {
				if (document.body.contains(document.getElementById(allowedMove))) {
					document.getElementById(allowedMove).classList.add('allowed');		
				}	
			});
		}
		else{
			this.clearSquares();
		}
	}

	changeTurn() {
		console.log("turn changed");
		if (this.turn == 'white') {
			this.turn = 'black';
			this.turnSign.innerHTML = "Black's Turn";
			turnnr ++
			wturnnr ++
			wmandarins ++
			wfingers ++
			if(bnoult === true){bnoult = false
					wfingers = 0
				console.log("black no-ult reset")}
			wguns ++

			if(whiteinviss === true){
				whitereturn()
			}
			if(blackinviss === true){
				blackreturn()
			}
			//whiteinviss = false
			//blackinviss = false
			updatetext()
		}
		else{
			this.turn = 'white';
			this.turnSign.innerHTML = "White's Turn";
			turnnr ++
			bturnnr ++
			bmandarins ++
			bfingers ++
			if(wnoult === true){wnoult = false
					bfingers = 0
				console.log("white no-ult reset")}
			bguns ++

		if(whiteinviss === true){
			whitereturn()
		}
		if(blackinviss === true){
		blackreturn()
	}
			//whiteinviss = false
			//blackinviss = false
			updatetext()
		}
	}

	getPiecesByColor(color) {
		return this.pieces.filter(obj => {
		  return obj.color === color
		});
	}

	getPlayerPositions(color){
		const pieces = this.getPiecesByColor(color);
		return pieces.map( a => parseInt(a.position));
	}

	filterPositions(positions) {
		return positions.filter(pos => {
			return pos > 10 && pos < 89
		});
	};

	unblockedPositions(allowedPositions=[], position, color, checking=true){
		position = parseInt(position);
		const unblockedPositions = [];

		if (color == 'white') {
			var myBlockedPositions    = this.getPlayerPositions('white');
			var otherBlockedPositions = this.getPlayerPositions('black');
		}
		else{
			var myBlockedPositions    = this.getPlayerPositions('black');
			var otherBlockedPositions = this.getPlayerPositions('white');
		}
		
		if (this.clickedPiece.hasRank('pawn') || this.clickedPiece.hasRank('supe')) {
			for (const move of allowedPositions[0]) { //attacking moves
				if (checking && this.myKingChecked(move)) continue;
				if (otherBlockedPositions.indexOf(move) != -1) unblockedPositions.push(move);
			}
			const blockedPositions = myBlockedPositions + otherBlockedPositions;
			for (const move of allowedPositions[1]) { //moving moves
				if (blockedPositions.indexOf(move) != -1) break;
				else if (checking && this.myKingChecked(move, false)) continue;
				unblockedPositions.push(move);
			}
		}
		else{
			allowedPositions.forEach( allowedPositionsGroup => {
				for (const move of allowedPositionsGroup) {
					if (myBlockedPositions.indexOf(move) != -1) {
						break;
					}
					else if ( checking && this.myKingChecked(move) ) {
						continue;
					}
					unblockedPositions.push(move);
					if (otherBlockedPositions.indexOf(move) != -1) break;
				}
			});
		}
			
		return this.filterPositions(unblockedPositions);
	}

	getPieceAllowedMoves(event, pieceName){
		const piece = this.getPieceByName(pieceName);
		if(this.turn == piece.color){
			this.clearSquares();
			this.setClickedPiece(piece);
			if (event.type == 'dragstart') {
				event.dataTransfer.setData("text", event.target.id);
			}

			let pieceAllowedMoves = piece.getAllowedMoves();
			if (piece.rank == 'king') {
				pieceAllowedMoves = this.getCastlingSquares(pieceAllowedMoves);
			}

			const allowedMoves = this.unblockedPositions( pieceAllowedMoves, piece.position, piece.color, true );
			this.allowedMoves = allowedMoves;
			return allowedMoves;
		}
		else if (this.clickedPiece && this.turn == this.clickedPiece.color && this.allowedMoves && this.allowedMoves.indexOf(piece.position) != -1) {
			this.kill(piece);
		}
		else{
			return 0;
		}
	}

	getCastlingSquares(allowedMoves) {
		if ( !this.clickedPiece.ableToCastle || this.king_checked(this.turn) ) return allowedMoves;
		const rook1 = this.getPieceByName(this.turn+'Rook1');
		const rook2 = this.getPieceByName(this.turn+'Rook2');
		if (rook1 && rook1.ableToCastle) {
			const castlingPosition = rook1.position + 2
            if(
                !this.positionHasExistingPiece(castlingPosition - 1) &&
                !this.positionHasExistingPiece(castlingPosition) && !this.myKingChecked(castlingPosition, true) &&
                !this.positionHasExistingPiece(castlingPosition + 1) && !this.myKingChecked(castlingPosition + 1, true)
            )
			allowedMoves[1].push(castlingPosition);
		}
		if (rook2 && rook2.ableToCastle) {
			const castlingPosition = rook2.position - 1;
			if(
                !this.positionHasExistingPiece(castlingPosition - 1) && !this.myKingChecked(castlingPosition - 1, true) &&
                !this.positionHasExistingPiece(castlingPosition) && !this.myKingChecked(castlingPosition, true)
            )
			allowedMoves[0].push(castlingPosition);
		}
		return allowedMoves;
	}

	getPieceByName(piecename) {
		return this.pieces.filter( obj => obj.name === piecename )[0];
	}

	getPieceByPos(piecePosition) {
		return this.pieces.filter(obj =>  obj.position === piecePosition )[0];
	}

	positionHasExistingPiece(position) {
		return this.getPieceByPos(position) != undefined;
	}

	setClickedPiece(piece) {
		this.clickedPiece = piece;
	}

	movePiece(event, square='') {
		square = square || event.target;
		if (square.classList.contains('allowed')) {
			const clickedPiece = this.clickedPiece;
			if (clickedPiece) {
				const newPosition = square.getAttribute('id');
				if (clickedPiece.hasRank('king') || clickedPiece.hasRank('pawn') || clickedPiece.hasRank('supe'))
					clickedPiece.changePosition(newPosition, true);
				else
					clickedPiece.changePosition(newPosition);
				square.append(clickedPiece.img);
				this.clearSquares();
				this.changeTurn();
				if (this.king_checked(this.turn)) {
					if (this.king_dead(this.turn)) {
						this.checkmate(clickedPiece.color);
					}
					else{
						// alert('check');
					}
				}
			}
			else{
				return 0;
			}
		}
		if (event) event.preventDefault();
	}

	kill(piece) {
		piece.img.parentNode.removeChild(piece.img);
		piece.img.className = '';

		if (piece.color == 'white') this.whiteSematary.querySelector('.'+piece.rank).append(piece.img);
		else this.blackSematary.querySelector('.'+piece.rank).append(piece.img);

		const chosenSquare = document.getElementById(piece.position);
		this.pieces.splice(this.pieces.indexOf(piece), 1);
		this.movePiece('', chosenSquare);
	}

	castleRook(rookName) {
		const rook = this.getPieceByName(rookName);
		const newPosition = rookName.indexOf('Rook2') != -1 ? rook.position - 2 : rook.position + 3;

		this.setClickedPiece(rook);
		const chosenSquare = document.getElementById(newPosition);
		chosenSquare.classList.add('allowed');

		this.movePiece('', chosenSquare );
		this.changeTurn();
	}

	promote(pawn) {
		const queenName = pawn.name.replace('Pawn', 'Queen');
		const image = pawn.img;
		image.id = queenName;
		image.src = image.src.replace('Pawn', 'Queen');
		this.pieces.splice(this.pieces.indexOf(pawn), 1);
		this.pieces.push( new Queen(pawn.position, queenName) );
	}
	
	//Here code for change character aka promote code stuff, trigger in file from pawn, me thinks its called changeposition.
	/*
	promote(pawn) {
		const knightName = pawn.name.replace('Pawn', 'Knight');
		const image = pawn.img;
		image.id = knightName;
		image.src = image.src.replace('Pawn', 'Knight');
		this.pieces.splice(this.pieces.indexOf(pawn), 1);
		this.pieces.push( new Knight(pawn.position, knightName) );
	}
	*/

	supepromote(supe) {
		const superpawnName = supe.name.replace('Supe', 'SuperPawn');
		const image = supe.img;
		image.id = superpawnName;
		image.src = image.src.replace('Supe', 'SuperPawn');
		this.pieces.splice(this.pieces.indexOf(supe), 1);
		this.pieces.push( new Superpawn(supe.position, superpawnName) );
	}

	myKingChecked(pos, kill=true){
		const piece = this.clickedPiece;
		const originalPosition = piece.position;
		const otherPiece = this.getPieceByPos(pos);
		const should_kill_other_piece = kill && otherPiece && otherPiece.rank != 'king';
		piece.changePosition(pos);
		if (should_kill_other_piece) this.pieces.splice(this.pieces.indexOf(otherPiece), 1);
		if (this.king_checked(piece.color)) {
			piece.changePosition(originalPosition);
			if (should_kill_other_piece) this.pieces.push(otherPiece);
			return 1;
		}
		else{
			piece.changePosition(originalPosition);
			if (should_kill_other_piece) this.pieces.push(otherPiece);
			return 0;
		}
	}

	king_dead(color) {
		const pieces = this.getPiecesByColor(color);
		for (const piece of pieces) {
			this.setClickedPiece(piece);
			const allowedMoves = this.unblockedPositions( piece.getAllowedMoves(), piece.position, piece.color, true );
			if (allowedMoves.length) {
				this.setClickedPiece(null);
				return 0;
			}
		}
		this.setClickedPiece(null);
		return 1;
	}

	king_checked(color) {
		const piece = this.clickedPiece;
		const king = this.getPieceByName(color + 'King');
		const enemyColor = (color == 'white') ? 'black' : 'white';
		const enemyPieces = this.getPiecesByColor(enemyColor);
		for (const enemyPiece of enemyPieces) {
			this.setClickedPiece(enemyPiece);
			const allowedMoves = this.unblockedPositions( enemyPiece.getAllowedMoves(), enemyPiece.position, enemyColor, false );
			if (allowedMoves.indexOf(king.position) != -1) {
				this.setClickedPiece(piece);
				return 1;
			}
		}
		this.setClickedPiece(piece);
		return 0;
	}

	clearSquares(){
		this.allowedMoves = null;
		const allowedSquares = this.board.querySelectorAll('.allowed');
		allowedSquares.forEach( allowedSquare => allowedSquare.classList.remove('allowed') );
		const cllickedSquare = document.getElementsByClassName('clicked-square')[0];
		if (cllickedSquare) cllickedSquare.classList.remove('clicked-square');
	}

	checkmate(color){
		const endScene = document.getElementById('endscene');
		endScene.getElementsByClassName('winning-sign')[0].innerHTML = color + ' Wins';
		endScene.classList.add('show');
	}
}


const pieces = [
	new Rook(11, 'whiteRook1'),
	new Knight(12, 'whiteKnight1'),
	new Gob(13, 'whiteGob'),
	new Queen(14, 'whiteQueen'),
	new King(15, 'whiteKing'),
	new Bishop(16, 'whiteBishop2'),
	new Knight(17, 'whiteKnight2'),
	new Gobl(18, 'whiteGobl'),
	new Pawn(21, 'whitePawn1'),
	new Onetwo(22, 'whiteOnetwo'),
	new Pawn(23, 'whitePawn3'),
	new Pawn(24, 'whitePawn4'),
	new Supe(25, 'whiteSupe'),
	new Pawn(26, 'whitePawn6'),
	new Pawn(27, 'whitePawn7'),
	new Pawn(28, 'whitePawn8'),

	new Pawn(71, 'blackPawn1'),
	new Pawn(72, 'blackPawn2'),
	new Pawn(73, 'blackPawn3'),
	new Pawn(74, 'blackPawn4'),
	new Supe(75, 'blackSupe'),
	new Pawn(76, 'blackPawn6'),
	new Onetwo(77, 'blackOnetwo'),
	new Pawn(78, 'blackPawn7'),
	new Gobl(81, 'blackGobl'),
	new Knight(82, 'blackKnight1'),
	new Bishop(83, 'blackBishop1'),
	new Queen(84, 'blackQueen'),
	new King(85, 'blackKing'),
	new Gob(86, 'blackGob'),
	new Knight(87, 'blackKnight2'),
	new Rook(88, 'blackRook2')
];

const game = new Game(pieces);

var turnnr = 0

var wturnnr = 0
var bturnnr = 0

var wmandarins = 0
var bmandarins = 0

var wfingers = 0
var bfingers = 0

wguns = 0
bguns = 0

wnoult = false
bnoult = false

wmarault = true
bmarault = true

wgoblult = true
bgoblult = true

wgobult = true
bgobult = true

whiteinviss = false
blackinviss = false


  function skipwhite(){
	if (game.turn == "white"){
	console.log("bout to change white");
	game.changeTurn()
	wturnnr --
	}
  }

  function skipblack(){
	if (game.turn == "black"){
	console.log("bout to change black");
	game.changeTurn()
	bturnnr --
	}
  }

  function updatetext(){
	document.getElementById("turnnr").innerHTML = "Turn Nr " + turnnr;
	document.getElementById("wmandarins").innerHTML = ": " + wmandarins;
	document.getElementById("bmandarins").innerHTML = ": " + bmandarins;
	document.getElementById("wfingers").innerHTML = ": " + wfingers;
	document.getElementById("bfingers").innerHTML = ": " + bfingers;
	document.getElementById("wguns").innerHTML = ": " + wguns;
	document.getElementById("bguns").innerHTML = ": " + bguns;
	checkqueendeadwhite()
	checkqueendeadblack()
	checkgobldeadblack()
	checkgobldeadwhite()
	checkgobdeadblack()
	checkgobdeadwhite()
	if(wfingers >= 13 && wgoblult === true){
		document.getElementById("wfingers").innerHTML = ": 12";
		document.getElementById("wnoult").innerHTML = "<img src='static/img201/button.png' onclick='goblultwhite()' width= '80px'></img>"
	}
	else if(wfingers >= 13){
		document.getElementById("wfingers").innerHTML = ": 12";
		document.getElementById("wnoult").innerHTML = "<img src='static/img201/buttonpressed.png' onclick='goblultwhite()' width= '80px'></img>"
	}
	if(bfingers >= 13 && bgoblult === true){
		document.getElementById("bfingers").innerHTML = ": 12";
		document.getElementById("bnoult").innerHTML = "<img src='static/img201/button.png' onclick='goblultblack()' width= '80px'></img>"
	}
	else if(bfingers >= 13){
		document.getElementById("bfingers").innerHTML = ": 12";
		document.getElementById("bnoult").innerHTML = "<img src='static/img201/buttonpressed.png' onclick='goblultblack()' width= '80px'></img>"
	}
	if(wmandarins >= 10 && wmarault === true){
		document.getElementById("wmandarins").innerHTML = ": 10";
		document.getElementById("wskipbutton").innerHTML = "<img src='static/img201/button.png' onclick='maraultwhite()' width= '80px'></img>"
	} 
	else if(wmandarins >= 10){
		document.getElementById("wmandarins").innerHTML = ": 10";
		document.getElementById("wskipbutton").innerHTML = "<img src='static/img201/buttonpressed.png' onclick='maraultwhite()' width= '80px'></img>"
	}
	if(bmandarins >= 10 && bmarault === true){
		document.getElementById("bmandarins").innerHTML = ": 10";
		document.getElementById("bskipbutton").innerHTML = "<img src='static/img201/button.png' onclick='maraultblack()' width= '80px'></img>"
	}
	else if(bmandarins >= 10){
		document.getElementById("bmandarins").innerHTML = ": 10";
		document.getElementById("bskipbutton").innerHTML = "<img src='static/img201/buttonpressed.png' onclick='maraultblack()' width= '80px'></img>"
	}
	if(wguns >= 8 && wgobult === true){
		document.getElementById("wguns").innerHTML = ": 7";
		document.getElementById("wblind").innerHTML = "<img src='static/img201/button.png' onclick='gobultwhite()' width= '80px'></img>"
	}
	else if(wguns >= 8){
		document.getElementById("wguns").innerHTML = ": 7";
		document.getElementById("wblind").innerHTML = "<img src='static/img201/buttonpressed.png' onclick='gobultwhite()' width= '80px'></img>"
	}
	if(bguns >= 8 && bgobult === true){
		document.getElementById("bguns").innerHTML = ": 7";
		document.getElementById("bblind").innerHTML = "<img src='static/img201/button.png' onclick='gobultblack()' width= '80px'></img>"
	}
	else if(bguns >= 8){
		document.getElementById("bguns").innerHTML = ": 7";
		document.getElementById("bblind").innerHTML = "<img src='static/img201/buttonpressed.png' onclick='gobultblack()' width= '80px'></img>"
	}
	document.getElementById("wturnnr").innerHTML = "White Turns: " + wturnnr;
	document.getElementById("bturnnr").innerHTML = "Black Turns: " + bturnnr;
	if(turnnr === 20){
		console.log("SuperPawns activated")
		alert("Crackheads are activated; Now to find the Imposter Pawn.")
	}


	/*if(turnnr >= 20){
		game.promoteSupes(supe)
		console.log("Supes activated")
		alert("SuperPawns activated")
	}*/

	console.log("text updated")
  }


  function goblultwhite(){
	if(wfingers >= 12 && wnoult === false && game.turn == "black" && wgoblult === true){
	bnoult = true
	console.log("black no-ult active")
		document.getElementById("wnoult").innerHTML = "<img src='static/img201/buttonpressed.png' onclick='goblultwhite()' width= '80px'></img>"
		wfingers = 0
		//wfingers --
		updatetext()
	} else if(wgoblult === false){
		console.log("your gobl is dead")
		alert("Your Gandalf of Blasphemy is dead")
	} else if(game.turn == "white" && wnoult === true){
		console.log("your ult is blocked")
		alert("Your ult is blocked")
	} else if(game.turn == "white"){
		console.log("use your ult when enemy is playing")
		alert("Use your ult when enemy is playing")
	}else{
		console.log("ult not ready")
		alert("Ult not ready")
	}
  }

  function goblultblack(){
	if(bfingers >= 12 && bnoult === false && game.turn == "white" && bgoblult === true){
	wnoult = true
	console.log("white no-ult active")
		document.getElementById("bnoult").innerHTML = "<img src='static/img201/buttonpressed.png' onclick='goblultblack()' width= '80px'></img>"
		bfingers = 0
		//bfingers --
		updatetext()
	} else if(bgoblult === false){
		console.log("your gobl is dead")
		alert("Your Gandalf of Blasphemy is dead")
	} else if(game.turn == "black" && bnoult === true){
		console.log("your ult is blocked")
		alert("Your ult is blocked")
	} else if(game.turn == "black"){
		console.log("use your ult when enemy is playing")
		alert("Use your ult when enemy is playing")
	}else{
		console.log("ult not ready")
		alert("Ult not ready")
	}
  }

  function maraultwhite(){
	if(wmandarins >= 10 && game.turn == "white" && wnoult === false && wmarault === true){
		console.log("yes ult.")
		document.getElementById("wskipbutton").innerHTML = "<img src='static/img201/buttonpressed.png' onclick='maraultwhite()' width= '80px'></img>"
		wmandarins = 0
		skipwhite()
		wmandarins --
		updatetext()
	} else if(wmarault === false){
		console.log("your queen is dead")
		alert("Your Mara is dead")
	} else if(game.turn == "black"){
		console.log("not your turn")
		alert("Not your turn")
	} else if(game.turn == "white" && wnoult === true){
		console.log("your ult is blocked")
		alert("Your ult is blocked")
	} else {
		console.log("ult not ready")
		alert("Ult not ready")
	}
  }

  function maraultblack(){
	if(bmandarins >= 10 && game.turn == "black" && bnoult === false && bmarault === true){
		console.log("yes ult.")
		document.getElementById("bskipbutton").innerHTML = "<img src='static/img201/buttonpressed.png' onclick='maraultblack()' width= '80px'></img>"
		bmandarins = 0
		skipblack()
		bmandarins --
		updatetext()
	} else if(bmarault === false){
		console.log("your queen is dead")
		alert("Your Mara is dead")
	} else if(game.turn == "white"){
		console.log("not your turn")
		alert("Not your turn")
	} else if(game.turn == "black" && bnoult === true){
		console.log("your ult is blocked")
		alert("Your ult is blocked")
	} else {
		console.log("ult not ready")
		alert("Ult not ready")
	}
  }


  // Mara ult blocks
  function checkqueendeadblack(){
	const collection = document.getElementById("bdeadqueen").children;
	//console.log(collection)
let text = "";
for (let i = 0; i < collection.length; i++) {
  text += collection[i].tagName + "<br>";

if(collection[i].id=="blackQueen"){console.log("black queen is dead")
stopmaraultblack()}
}
//document.getElementById("demo").innerHTML = text;
  }

  function checkqueendeadwhite(){
	const collection = document.getElementById("wdeadqueen").children;
	//console.log(collection)
let text = "";
for (let i = 0; i < collection.length; i++) {
  text += collection[i].tagName + "<br>";

if(collection[i].id=="whiteQueen"){console.log("white queen is dead")
stopmaraultwhite()}
}
//document.getElementById("demo").innerHTML = text;
  }

  function stopmaraultwhite(){
	wmarault = false
	console.log("white mara ult blocked")
  }

  function stopmaraultblack(){
	bmarault = false
	console.log("black mara ult blocked")
  }


  // Gobl Ults block
  function checkgobldeadblack(){
	const collection = document.getElementById("bdeadgobl").children;
	//console.log(collection)
let text = "";
for (let i = 0; i < collection.length; i++) {
  text += collection[i].tagName + "<br>";

if(collection[i].id=="blackGobl"){console.log("black gobl is dead")
stopgoblultblack()}
}
//document.getElementById("demo").innerHTML = text;
  }

  function checkgobldeadwhite(){
	const collection = document.getElementById("wdeadgobl").children;
	//console.log(collection)
let text = "";
for (let i = 0; i < collection.length; i++) {
  text += collection[i].tagName + "<br>";

if(collection[i].id=="whiteGobl"){console.log("white gobl is dead")
stopgoblultwhite()}
}
//document.getElementById("demo").innerHTML = text;
  }

  function stopgoblultwhite(){
	wgoblult = false
	console.log("white gobl ult blocked")
  }

  function stopgoblultblack(){
	bgoblult = false
	console.log("black gobl ult blocked")
  }


   // Gob Ult block etc
   function checkgobdeadblack(){
	const collection = document.getElementById("bdeadgob").children;
	//console.log(collection)
let text = "";
for (let i = 0; i < collection.length; i++) {
  text += collection[i].tagName + "<br>";

if(collection[i].id=="blackGob"){console.log("black gob is dead")
stopgobultblack()}
}
//document.getElementById("demo").innerHTML = text;
  }

  function checkgobdeadwhite(){
	const collection = document.getElementById("wdeadgob").children;
	//console.log(collection)
let text = "";
for (let i = 0; i < collection.length; i++) {
  text += collection[i].tagName + "<br>";

if(collection[i].id=="whiteGob"){console.log("white gob is dead")
stopgobultwhite()}
}
//document.getElementById("demo").innerHTML = text;
  }

  function stopgobultwhite(){
	wgobult = false
	console.log("white gob ult blocked")
  }

  function stopgobultblack(){
	bgobult = false
	console.log("black gob ult blocked")
  }

  function gobultwhite(){
	if(wguns >= 7 && game.turn == "black" && wnoult === false && wgobult === true){
		console.log("yes ult.")
		document.getElementById("wblind").innerHTML = "<img src='static/img201/buttonpressed.png' onclick='gubultwhite()' width= '80px'></img>"
		wguns = 0
		whiteinvis()
		//wguns --
		updatetext()
	} else if(wgobult === false){
		console.log("your gob is dead")
		alert("Your Gandalf of Blindness is dead")
	} else if(game.turn == "white"){
		console.log("use your ult when enemy is playing")
		alert("use your ult when enemy is playing")
	} else if(game.turn == "black" && wnoult === true){
		console.log("your ult is blocked")
		alert("Your ult is blocked")
	} else {
		console.log("ult not ready")
		alert("Ult not ready")
	}
  }

  function gobultblack(){
	if(bguns >= 7 && game.turn == "white" && bnoult === false && bgobult === true){
		console.log("yes ult.")
		document.getElementById("bblind").innerHTML = "<img src='static/img201/buttonpressed.png' onclick='gubultblack()' width= '80px'></img>"
		bguns = 0
		blackinvis()
		//bguns --
		updatetext()
	} else if(bgobult === false){
		console.log("your gob is dead")
		alert("Your Gandalf of Blindness is dead")
	} else if(game.turn == "black"){
		console.log("use your ult when enemy is playing")
		alert("use your ult when enemy is playing")
	} else if(game.turn == "white" && bnoult === true){
		console.log("your ult is blocked")
		alert("Your ult is blocked")
	} else {
		console.log("ult not ready")
		alert("Ult not ready")
	}
  } 
  
 
  // Gob ult and recet
  function whiteinvis(){
const col1 = document.getElementById("whiteGobl")
col1.src = col1.src.replace('white', 'winvis');

const col2 = document.getElementById("whiteKnight1")
col2.src = col2.src.replace('white', 'winvis');

const col3 = document.getElementById("whiteKnight2")
col3.src = col3.src.replace('white', 'winvis');

const col4 = document.getElementById("whiteKing")
col4.src = col4.src.replace('white', 'winvis');

const col5 = document.getElementById("whiteBishop2")
col5.src = col5.src.replace('white', 'winvis');

const col6 = document.getElementById("whiteQueen")
col6.src = col6.src.replace('white', 'winvis');

const col7 = document.getElementById("whiteGob")
col7.src = col7.src.replace('white', 'winvis');

const col8 = document.getElementById("whiteRook1")
col8.src = col8.src.replace('white', 'winvis');

const ggggsgsg = document.getElementById("whitePawn1")
ggggsgsg.src = ggggsgsg.src.replace('white', 'winvis');

const wwewewwewe = document.getElementById("whitePawn3")
wwewewwewe.src = wwewewwewe.src.replace('white', 'winvis');

const fagagg = document.getElementById("whitePawn4")
fagagg.src = fagagg.src.replace('white', 'winvis');

const screaew = document.getElementById("whiteSupe")
screaew.src = screaew.src.replace('white', 'winvis');

const cllection = document.getElementById("whitePawn6")
cllection.src = cllection.src.replace('white', 'winvis');

const collection = document.getElementById("whitePawn7")
collection.src = collection.src.replace('white', 'winvis');

const ersttt = document.getElementById("whitePawn8")
ersttt.src = ersttt.src.replace('white', 'winvis');

const eswrff = document.getElementById("whiteOnetwo")
eswrff.src = eswrff.src.replace('white', 'winvis');
/*
//const coleee = document.getElementsByClassName("pawn")
//coleee.src = coleee.src.replace('white', 'winvis');
*/
console.log("whiteinvis = true")
whiteinviss = true
  }

  function blackinvis(){
	const col1 = document.getElementById("blackGobl")
	col1.src = col1.src.replace('black', 'binvis');
	
	const col2 = document.getElementById("blackKnight1")
	col2.src = col2.src.replace('black', 'binvis');
	
	const col3 = document.getElementById("blackKnight2")
	col3.src = col3.src.replace('black', 'binvis');
	
	const col4 = document.getElementById("blackKing")
	col4.src = col4.src.replace('black', 'binvis');
	
	const col5 = document.getElementById("blackBishop1")
	col5.src = col5.src.replace('black', 'binvis');
	
	const col6 = document.getElementById("blackQueen")
	col6.src = col6.src.replace('black', 'binvis');
	
	const col7 = document.getElementById("blackGob")
	col7.src = col7.src.replace('black', 'binvis');
	
	const col8 = document.getElementById("blackRook2")
	col8.src = col8.src.replace('black', 'binvis');
	
	const ggggsgsg = document.getElementById("blackPawn1")
	ggggsgsg.src = ggggsgsg.src.replace('black', 'binvis');
	
	const wwewewwewe = document.getElementById("blackPawn3")
	wwewewwewe.src = wwewewwewe.src.replace('black', 'binvis');
	
	const fagagg = document.getElementById("blackPawn4")
	fagagg.src = fagagg.src.replace('black', 'binvis');
	
	const screaew = document.getElementById("blackSupe")
	screaew.src = screaew.src.replace('black', 'binvis');
	
	const cllection = document.getElementById("blackPawn6")
	cllection.src = cllection.src.replace('black', 'binvis');
	
	const collection = document.getElementById("blackPawn7")
	collection.src = collection.src.replace('black', 'binvis');
	
	const ersttt = document.getElementById("blackPawn2")
	ersttt.src = ersttt.src.replace('black', 'binvis');
	
	const eswrff = document.getElementById("blackOnetwo")
	eswrff.src = eswrff.src.replace('black', 'binvis');

	console.log("blackinvis = true")
	blackinviss = true
	}

  function whitereturn(){
	const col1 = document.getElementById("whiteGobl")
col1.src = col1.src.replace('winvis', 'white');

const col2 = document.getElementById("whiteKnight1")
col2.src = col2.src.replace('winvis', 'white');

const col3 = document.getElementById("whiteKnight2")
col3.src = col3.src.replace('winvis', 'white');

const col4 = document.getElementById("whiteKing")
col4.src = col4.src.replace('winvis', 'white');

const col5 = document.getElementById("whiteBishop2")
col5.src = col5.src.replace('winvis', 'white');

const col6 = document.getElementById("whiteQueen")
col6.src = col6.src.replace('winvis', 'white');

const col7 = document.getElementById("whiteGob")
col7.src = col7.src.replace('winvis', 'white');

const col8 = document.getElementById("whiteRook1")
col8.src = col8.src.replace('winvis', 'white');

const ggggsgsg = document.getElementById("whitePawn1")
ggggsgsg.src = ggggsgsg.src.replace('winvis', 'white');

const wwewewwewe = document.getElementById("whitePawn3")
wwewewwewe.src = wwewewwewe.src.replace('winvis', 'white');

const fagagg = document.getElementById("whitePawn4")
fagagg.src = fagagg.src.replace('winvis', 'white');

const screaew = document.getElementById("whiteSupe")
screaew.src = screaew.src.replace('winvis', 'white');

const cllection = document.getElementById("whitePawn6")
cllection.src = cllection.src.replace('winvis', 'white');

const collection = document.getElementById("whitePawn7")
collection.src = collection.src.replace('winvis', 'white');

const ersttt = document.getElementById("whitePawn8")
ersttt.src = ersttt.src.replace('winvis', 'white');

const eswrff = document.getElementById("whiteOnetwo")
eswrff.src = eswrff.src.replace('winvis', 'white');

whiteinviss = false
  }

  function blackreturn(){
	const col1 = document.getElementById("blackGobl")
col1.src = col1.src.replace('binvis', 'black');

const col2 = document.getElementById("blackKnight1")
col2.src = col2.src.replace('binvis', 'black');

const col3 = document.getElementById("blackKnight2")
col3.src = col3.src.replace('binvis', 'black');

const col4 = document.getElementById("blackKing")
col4.src = col4.src.replace('binvis', 'black');

const col5 = document.getElementById("blackBishop1")
col5.src = col5.src.replace('binvis', 'black');

const col6 = document.getElementById("blackQueen")
col6.src = col6.src.replace('binvis', 'black');

const col7 = document.getElementById("blackGob")
col7.src = col7.src.replace('binvis', 'black');

const col8 = document.getElementById("blackRook2")
col8.src = col8.src.replace('binvis', 'black');

const ggggsgsg = document.getElementById("blackPawn1")
ggggsgsg.src = ggggsgsg.src.replace('binvis', 'black');

const wwewewwewe = document.getElementById("blackPawn3")
wwewewwewe.src = wwewewwewe.src.replace('binvis', 'black');

const fagagg = document.getElementById("blackPawn4")
fagagg.src = fagagg.src.replace('binvis', 'black');

const screaew = document.getElementById("blackSupe")
screaew.src = screaew.src.replace('binvis', 'black');

const cllection = document.getElementById("blackPawn6")
cllection.src = cllection.src.replace('binvis', 'black');

const collection = document.getElementById("blackPawn7")
collection.src = collection.src.replace('binvis', 'black');

const ersttt = document.getElementById("blackPawn2")
ersttt.src = ersttt.src.replace('binvis', 'black');

const eswrff = document.getElementById("blackOnetwo")
eswrff.src = eswrff.src.replace('binvis', 'black');

blackinviss = false
  }

  function openCharacters(){
		window.open("Characters.html", "_blank");
  }