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
		for (var i = 0; i < this.whitePieces.length; i++)
		{
			if( this.whitePieces[i].col == col && this.whitePieces[i].row == row )
			{
				this.whitePieces.splice(i, 1);
				this.boardState[col + 8 * row] = false;
				return;
			}
		}
		for (var i = 0; i < this.blackPieces.length; i++)
		{
			if( this.blackPieces[i].col == col && this.blackPieces[i].row == row )
			{
				this.blackPieces.splice(i, 1);
				this.boardState[col + 8 * row] = false;
				return;
			}
		}
		return;
	}

	movePiece(p, col, row)
	{
		var arr = p.moves(this);
		if (arr[col + 8 * row])
		{
			console.log("legal move")
			console.log(arr)
			p.hasNotMoved = false;
		}
		else
		{
			console.log("illegal move")
			console.log(arr)
			return;
		}
		var previousCol = p.col;
		var previousRow = p.row;
		this.boardState[previousCol + 8 * previousRow] = false;
		if (this.squareOccupied(col, row))
		{
			this.removePiece(col, row);
		}
		p.move(col, row);
		this.boardState[col + 8 * row] = true;
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