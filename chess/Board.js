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

	castleQueenside(isWhite)
	{
		if (isWhite)
		{
			var rook = this.getPiece(0,7)
			var king = this.getPiece(4,7)
			this.boardState[rook.col + 8 * rook.row] = false;
			this.boardState[king.col + 8 * king.row] = false;
			rook.move(3, 7);
			king.move(2, 7)
			this.boardState[3, 7] = true;
			this.boardState[2, 7] = true;
		}
		else
		{
			var rook = this.getPiece(0,0)
			var king = this.getPiece(4,0)
			this.boardState[rook.col + 8 * rook.row] = false;
			this.boardState[king.col + 8 * king.row] = false;
			rook.move(3, 0);
			king.move(2, 0)
			this.boardState[3, 0] = true;
			this.boardState[2, 0] = true;
		}
	}

	castleKingside(isWhite)
	{
		if (isWhite)
		{
			var rook = this.getPiece(7,7)
			var king = this.getPiece(4,7)
			this.boardState[rook.col + 8 * rook.row] = false;
			this.boardState[king.col + 8 * king.row] = false;
			rook.move(5, 7);
			king.move(6, 7)
			this.boardState[5, 7] = true;
			this.boardState[6, 7] = true;
		}
		else
		{
			var rook = this.getPiece(7,0)
			var king = this.getPiece(4,0)
			this.boardState[rook.col + 8 * rook.row] = false;
			this.boardState[king.col + 8 * king.row] = false;
			rook.move(5, 0);
			king.move(6, 0)
			this.boardState[5, 0] = true;
			this.boardState[6, 0] = true;
		}
	}

	enPassantRight(col, isWhite)
	{
		console.log("enpcall:" + col)
		var hold = null;
		if (isWhite)
		{
			var pawn = this.getPiece(col,3)
			var pawnCaptured = this.getPiece(col + 1,3)
			console.log("enpcall:" + col)
			this.boardState[pawn.col + 8 * pawn.row] = false;
			this.boardState[pawnCaptured.col + 8 * pawnCaptured.row] = false;
			hold = this.removePiece(col + 1, 3);
			pawn.move(col + 1, 2 );
			this.boardState[col + 1, 2] = true;
		}
		else
		{
			console.log("enpcallb:" + col)
			var pawn = this.getPiece(col,4)
			var pawnCaptured = this.getPiece(col + 1,4)
			this.boardState[pawn.col + 8 * pawn.row] = false;
			this.boardState[pawnCaptured.col + 8 * pawnCaptured.row] = false;
			hold = this.removePiece(col + 1, 4);
			pawn.move(col + 1, 5 );
			this.boardState[col + 1, 5] = true;
		}
		return hold
	}

	enPassantLeft(col, isWhite)
	{
		var hold = null;
		if (isWhite)
		{
			var pawn = this.getPiece(col,3)
			var pawnCaptured = this.getPiece(col - 1,3)
			this.boardState[pawn.col + 8 * pawn.row] = false;
			this.boardState[pawnCaptured.col + 8 * pawnCaptured.row] = false;
			hold = this.removePiece(col - 1, 3);
			pawn.move(col - 1, 2 );
			this.boardState[col - 1, 2] = true;
		}
		else
		{
			var pawn = this.getPiece(col,4)
			var pawnCaptured = this.getPiece(col - 1,4)
			this.boardState[pawn.col + 8 * pawn.row] = false;
			this.boardState[pawnCaptured.col + 8 * pawnCaptured.row] = false;
			hold = this.removePiece(col - 1, 4);
			pawn.move(col - 1, 5 );
			this.boardState[col - 1, 5] = true;
		}
		return hold;
	}

	squareOccupied(col, row)
	{
		return this.boardState[col + row * 8];
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
		return hold;
	}

	movePiece(p, col, row)
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
			p.hasNotMoved = false;
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