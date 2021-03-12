class Board {
	constructor() {
		this.boardState = new Array(64).fill(false);

		//first left to right by rows, the cols
		// 1 2 3
		// 4 5 6
		// 7 8 9
		this.whitePieces = [];
		this.blackPieces = [];
		this.pieceImages = [];
		this.loadImages();
		this.setBoard();
		this.whitesTurn = true;
		this.moveLog = [];
	}

	colToChar(col)
	{
		if (col == 0)
		{
			return "a"
		}
		if (col == 1)
		{
			return "b"
		}
		if (col == 2)
		{
			return "c"
		}
		if (col == 3)
		{
			return "d"
		}
		if (col == 4)
		{
			return "e"
		}
		if (col == 5)
		{
			return "f"
		}
		if (col == 6)
		{
			return "g"
		}
		if (col == 7)
		{
			return "h"
		}
		return "error!"
	}

	undoMove()
	{
		//should be the other color
		//whites turn - undo blacks move
		var lastMove = this.moveLog.pop()
		if (whitesTurn)
		{

		}
	}

	getKingSquare(isWhite)
	{
		if (!isWhite)
		{
			for (var i = 0; i < this.blackPieces.length; i++)
			{
				if (this.blackPieces[i].letter == "K")
				{
					return this.blackPieces[i].getSquare();
				}
			}
		}
		else
		{
			for (var i = 0; i < this.whitePieces.length; i++)
			{
				if( this.whitePieces[i].letter == "K")
				{
					return this.whitePieces[i].getSquare();
				}
			}
		}
	}

	squareAttacked(square, isWhite)
	{

		if (isWhite)
		{
			for (var i = 0; i < this.whitePieces.length; i++)
			{
				if( this.whitePieces[i].attacks(this)[square])
				{
					return true;
				}
			}
		}
		else
		{
			for (var i = 0; i < this.blackPieces.length; i++)
			{
				if (this.blackPieces[i].attacks(this)[square])
				{
					return true;
				}
			}
		}
		return false;
	}

	squaresColorAttacks(isWhite)
	{
		var moves = new Array(64).fill(false);
		if (isWhite)
		{
			for (var i = 0; i < this.whitePieces.length; i++)
			{
				var hold = this.whitePieces[i].attacks(this)
				for (var j = 0; j < hold.length; j++)
				{
					if (hold[j])
					{
						moves[j] = true;
					}
				}
			}
		}
		else	
		{
			for (var i = 0; i < this.blackPieces.length; i++)
			{
				var hold = this.blackPieces[i].attacks(this)
				for (var j = 0; j < hold.length; j++)
				{
					if (hold[j])
					{
						moves[j] = true;
					}
				}
			}
		}
		return moves;
	}

	placePiece(p)
	{
		if (p.isWhite)
		{
			this.whitePieces.push(p);
			this.boardState[p.col + p.row * 8] = true;
		}
		else
		{
			this.blackPieces.push(p);
			this.boardState[p.col + p.row * 8] = true;
		}
	}

	movePiece(p, col, row)
	{
		this.boardState[p.col + p.row * 8] = false;
		p.move(col, row)
		this.boardState[col + 8 * row] = true;
	}


	getPiece(col, row)
	{
		for (var i = 0; i < this.whitePieces.length; i++)
		{
			if( this.whitePieces[i].col == col && this.whitePieces[i].row == row )
			{
				return this.whitePieces[i];
			}
		}
		for (var i = 0; i < this.blackPieces.length; i++)
		{
			if( this.blackPieces[i].col == col && this.blackPieces[i].row == row )
			{
				return this.blackPieces[i];
			}
		}
		console.log("failed to get a piece at c: " + col + " r: " + row);
		return;
	}

	removePiece(col, row)
	{
		var hold = null;
		for (var i = 0; i < this.whitePieces.length; i++)
		{
			if( this.whitePieces[i].col == col && this.whitePieces[i].row == row )
			{
				hold = this.whitePieces.splice(i, 1)[0];
				this.boardState[col + 8 * row] = false;
				return hold;
			}
		}
		for (var i = 0; i < this.blackPieces.length; i++)
		{
			if( this.blackPieces[i].col == col && this.blackPieces[i].row == row )
			{
				hold = this.blackPieces.splice(i, 1)[0];
				this.boardState[col + 8 * row] = false;
				return hold;
			}
		}
		console.log("failed to remove a piece at c: " + col + " r: " + row);
		return hold;
	}

	castleQueenside(isWhite)
	{
		if (isWhite)
		{
			var rook = this.getPiece(0,7)
			var king = this.getPiece(4,7)
			this.movePiece(rook, 3, 7)
			this.movePiece(king, 2, 7)
		}
		else
		{
			var rook = this.getPiece(0,0)
			var king = this.getPiece(4,0)
			this.movePiece(rook, 3, 0)
			this.movePiece(king, 2, 0)
		}
	}

	castleKingside(isWhite)
	{
		if (isWhite)
		{
			var rook = this.getPiece(7,7)
			var king = this.getPiece(4,7)
			this.movePiece(rook, 5, 7)
			this.movePiece(king, 6, 7)
		}
		else
		{
			var rook = this.getPiece(7,0)
			var king = this.getPiece(4,0)
			this.movePiece(rook, 5, 0)
			this.movePiece(king, 6, 0)
		}
	}

	enPassantRight(col, isWhite)
	{
		console.log("enpcall:" + col);
		var pawnCaptured = null;
		if (isWhite)
		{
			var pawn = this.getPiece(col,3); //get pawn to move
			pawnCaptured = this.removePiece(col + 1, 3); //this is the pawn captures
			this.movePiece(pawn, col + 1, 2); //move the pawn
		}
		else
		{
			var pawn = this.getPiece(col,4)
			pawnCaptured = this.removePiece(col + 1,4)
			this.movePiece(pawn, col + 1, 5)
		}
		return pawnCaptured;
	}

	undoEnPassantRight(col, isWhite, capturedPawn)
	{
		console.log("reverseEnPassant" + col)
		var hold = null;
		if (isWhite)
		{
			var pawn = this.getPiece(col + 1, 2)
			this.boardState[col + 1, 2] = false;
			pawn.move(col , 3);
			this.placePiece(capturedPawn)
			this.boardState[col, 3] = true;
		}
		else
		{
			var pawn = this.getPiece(col + 1, 5)
			this.boardState[col + 1, 5] = false;
			pawn.move(col , 4);
			this.placePiece(capturedPawn)
			this.boardState[col, 4] = true;
		}
	}

	enPassantLeft(col, isWhite)
	{
		var pawnCaptured = null;
		if (isWhite)
		{
			var pawn = this.getPiece(col,3);
			pawnCaptured = this.removePiece(col - 1,3);
			this.movePiece(pawn, col - 1, 2);
		}
		else
		{
			var pawn = this.getPiece(col,4);
			pawnCaptured = this.removePiece(col - 1,4);
			this.movePiece(pawn, col - 1, 5);
		}
		return pawnCaptured;
	}

	squareOccupied(col, row)
	{
		return this.boardState[col + row * 8];
	}

	attemptMove(p, col, row)
	{
		console.log("----------------moveattempt------------")
		var moveText = p.letter + this.colToChar(p.col) + (8 - p.row )
		var arr = p.moves(this);
		var capture = false
		if (p.isWhite != this.whitesTurn)
		{
			console.log("wrong turn")
			return;
		}
		if (arr[col + 8 * row] == "CastleKingside")
		{
			this.castleKingside(this.whitesTurn);
		}
		else if (arr[col + 8 * row] == "CastleQueenside")
		{
			this.castleQueenside(this.whitesTurn);
		}
		else if (arr[col + 8 * row] == "En Passant Right")
		{
			console.log("enPassantRight")
			this.enPassantRight(col - 1, this.whitesTurn)
		}
		else if (arr[col + 8 * row] == "En Passant Left")
		{
			console.log("enPassantLeft")
			this.enPassantLeft(col + 1, this.whitesTurn)
		}
		else if (arr[col + 8 * row])
		{
			console.log("legal move")
			//console.log(arr)
		}
		else
		{
			console.log("illegal move")
			//console.log(arr)
			return;
		}
		//okay so the piece can move there
		var previousCol = p.col;
		var previousRow = p.row;
		this.boardState[previousCol + 8 * previousRow] = false;
		var ghostPiece;
		if (this.squareOccupied(col, row))
		{
			capture = true
			ghostPiece = this.removePiece(col, row);
			moveText = moveText + "x" + ghostPiece.letter + this.colToChar(col) + (8 - row)
		}
		else
		{
			moveText = moveText + this.colToChar(col) + (8 - row)
		}
		p.move(col, row);
		this.boardState[col + 8 * row] = true;
		//move sucess!
		//check if move leavs king in check
		if ( this.whitesTurn )
		{
			console.log("check if white king in check")
			if (this.squareAttacked(this.getKingSquare(true), false))
			{
				console.log("still in check, move failed")
				console.log(moveText + " has failed, white king still in check")
				p.move(previousCol, previousRow)
				this.boardState[previousCol + 8 * previousRow] = true;
				this.boardState[col + 8 * row] = false;
				if (capture)
				{
					this.placePiece(ghostPiece)
				}
				this.placePiece(ghostPiece)
				return
			}
		}
		else
		{
			console.log("check if black king in check")
			if (this.squareAttacked(this.getKingSquare(false), true))
			{
				console.log("still in check, move failed")
				console.log(moveText + " has failed, black king still in check")
				p.move(previousCol, previousRow)
				this.boardState[previousCol + 8 * previousRow] = true;
				this.boardState[col + 8 * row] = false;
				if (capture)
				{
					this.placePiece(ghostPiece)
				}
				return;
			}
		}

		//check for check
		if ( this.whitesTurn )
		{
			console.log("white just moved, check for check")
			if (this.squareAttacked(this.getKingSquare(false), true))
			{
				console.log("CHECK")
			}
		}
		else
		{
			console.log("black just moved, check for check")
			if (this.squareAttacked(this.getKingSquare(true), false))
			{
				console.log("CHECK")
			}
		}

		console.log(moveText)
		this.moveLog.push(moveText);
		console.log(this.moveLog)
		p.hasNotMoved = false;
		this.whitesTurn = !this.whitesTurn;
	}

	loadImages()
	{
		//white then black
		//pawn
		this.pieceImages.push(document.getElementById("wp"));
		this.pieceImages.push(document.getElementById("bp"));
		//knight
		this.pieceImages.push(document.getElementById("wn"));
		this.pieceImages.push(document.getElementById("bn"));
		//bishop
		this.pieceImages.push(document.getElementById("wb"));
		this.pieceImages.push(document.getElementById("bb"));
		//rook
		this.pieceImages.push(document.getElementById("wr"));
		this.pieceImages.push(document.getElementById("br"));
		//queen
		this.pieceImages.push(document.getElementById("wq"));
		this.pieceImages.push(document.getElementById("bq"));
		//king
		this.pieceImages.push(document.getElementById("wk"));
		this.pieceImages.push(document.getElementById("bk"));
	}

	setBoard()
	{
		//this.whitePieces.push(new King(4, 7, true));
		this.placePiece(new King(4, 7, true, this.pieceImages[10]));
	    this.placePiece(new Queen(3, 7, true, this.pieceImages[8]));
	    this.placePiece(new Bishop(2, 7, true, this.pieceImages[4]));
	    this.placePiece(new Bishop(5, 7, true, this.pieceImages[4]));
	    this.placePiece(new Knight(1, 7, true, this.pieceImages[2]));
	    this.placePiece(new Rook(0, 7, true, this.pieceImages[6]));
	    this.placePiece(new Knight(6, 7, true, this.pieceImages[2]));
	    this.placePiece(new Rook(7, 7, true, this.pieceImages[6]));

	    this.placePiece(new Pawn(4, 6, true, this.pieceImages[0]));
	    this.placePiece(new Pawn(3, 6, true, this.pieceImages[0]));
	    this.placePiece(new Pawn(2, 6, true, this.pieceImages[0]));
	    this.placePiece(new Pawn(5, 6, true, this.pieceImages[0]));
	    this.placePiece(new Pawn(1, 6, true, this.pieceImages[0]));
	    this.placePiece(new Pawn(0, 6, true, this.pieceImages[0]));
	    this.placePiece(new Pawn(6, 6, true, this.pieceImages[0]));
	    this.placePiece(new Pawn(7, 6, true, this.pieceImages[0]));

	    //black pieces
	    this.placePiece(new King(4, 0, false, this.pieceImages[11]));
	    this.placePiece(new Queen(3, 0, false, this.pieceImages[9]));
	    this.placePiece(new Bishop(2, 0, false, this.pieceImages[5]));
	    this.placePiece(new Bishop(5, 0, false, this.pieceImages[5]));
	    this.placePiece(new Knight(1, 0, false, this.pieceImages[3]));
	    this.placePiece(new Rook(0, 0, false, this.pieceImages[7]));
	    this.placePiece(new Knight(6, 0, false, this.pieceImages[3]));
	    this.placePiece(new Rook(7, 0, false, this.pieceImages[7]));

	    this.placePiece(new Pawn(4, 1, false, this.pieceImages[1]));
	    this.placePiece(new Pawn(3, 1, false, this.pieceImages[1]));
	    this.placePiece(new Pawn(2, 1, false, this.pieceImages[1]));
	    this.placePiece(new Pawn(5, 1, false, this.pieceImages[1]));
	    this.placePiece(new Pawn(1, 1, false, this.pieceImages[1]));
	    this.placePiece(new Pawn(0, 1, false, this.pieceImages[1]));
	    this.placePiece(new Pawn(6, 1, false, this.pieceImages[1]));
	    this.placePiece(new Pawn(7, 1, false, this.pieceImages[1]));

	}

	draw(ctx) 
	{
		var hold = this.squaresColorAttacks(this.whitesTurn)
		ctx.globalAlpha = 0.7;
		ctx.fillStyle = "green";
		for (var row = 0; row < 8; row++)
		{
			for (var col = 0; col < 8; col++)
			{
				if ( hold[row + col * 8] )
				{
					ctx.fillRect(row * 100, col * 100, 100, 100);
				}
			}
		}
		ctx.globalAlpha = 1.0;
		for (var i = 0; i < this.whitePieces.length; i++)
		{
			this.whitePieces[i].draw(ctx)
		}
		for (var i = 0; i < this.blackPieces.length; i++)
		{
			this.blackPieces[i].draw(ctx)
		}
	}
}