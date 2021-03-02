class Piece
{
	col = 0
	row = 0
	isWhite = true
	type = "King"
	letter = "K"
	moving = false
	pixelCol = 0
	pixelRow = 0
	constructor(col, row, isWhite, type, img)
	{
		this.col = col;
		this.row = row;
		this.isWhite = isWhite;
		this.type = type;
		this.img = img;
	}

	draw(ctx)
	{
		if (this.moving)
		{
			ctx.drawImage(this.img,this.pixelCol - 30,this.pixelRow - 30);
		}
		else
		{
	   		ctx.drawImage(this.img, 20 + this.col * 100 , 20 + this.row * 100);
	    }
	}
	
	move(col, row)
	{
		this.col = col;
		this.row = row;
	}
}

class King extends Piece
{
	constructor(col,row,isWhite, img)
	{
		super(col, row, isWhite, "King", img);
		this.letter = "K";
	}
}

class Queen extends Piece
{
	constructor(col,row,isWhite, img)
	{
		super(col, row, isWhite, "Queen", img);
		this.letter = "Q";
	}
}

class Rook extends Piece
{
	constructor(col,row,isWhite, img)
	{
		super(col, row, isWhite, "Rook", img);
		this.letter = "R";
	}
}

class Bishop extends Piece
{
	constructor(col,row,isWhite, img)
	{
		super(col, row, isWhite, "Bishop", img);
		this.letter = "B";
	}
}

class Knight extends Piece
{
	constructor(col,row,isWhite, img)
	{
		super(col, row, isWhite, "Knight", img);
		this.letter = "Kn";
	}
}

class Pawn extends Piece
{
	constructor(col,row,isWhite, img)
	{
		super(col, row, isWhite, "Pawn", img);
		this.letter = "P";
	}
}