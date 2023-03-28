import React from "react";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { render } from "react-dom/cjs/react-dom.production.min";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

function isArrayFull( arr )
{
  for ( var i = 0, l = arr.length; i < l; i++ )
  {
    if ( 'undefined' == typeof arr[i] || null === arr[i] )
    {
      return false
    }
  }
  return true;
}

function Square ({value, onClick}) {
	return(
		<button className={"square" } onClick={onClick}>
			{value}
		</button>
	)
}

function isWinner(squares){
	const Patterns = [
		[0,1,2],
		[3,4,5],
		[6,7,8],
		[0,3,6],
		[1,4,7],
		[2,5,8],
		[0,4,8],
		[2,4,6]
	]

	for (let i=0; i<Patterns.length; i++){
		const [a,b,c]= Patterns[i]

		if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
			return squares[a]
		}
	}

	return null;
}

const playerColor = (n) => {
	if (n == 1){
		return " text-white";
	}else{
		return " text-success";
	}
}

var init = 0;

//create your first component
function Home() {
	const [squares, setSquares] = React.useState(Array(9).fill(null));
	const [isX, setIsX] = React.useState(true);
	const handleClick = (i) => {
		if (isWinner(squares) || squares[i]) {
			return;
		}

		squares[i] = isX ? 'X' : 'O';
		setSquares(squares);
		setIsX(!isX);
	};

	const winner = isWinner(squares);
	let status;
	var ccc = 1;

	if (winner) {
		ccc = 2;
		status = `${winner} Wins!`;
	} else {
		{ isArrayFull(squares) ? status = 'Tied' : status = "It's " + (isX ? 'X' : 'O') + " Turn!"; }
		;
	}


	const handleRestart = () => {
		{ init === 0 ? setIsX(true) : setIsX(false)}
		setSquares(Array(9).fill(null));
	};


	const Board = () => {
		return (
			<div className="board">
				<h2 className={"status" + playerColor(ccc)}><strong>{status}</strong></h2>
				<div className="board-row m-0">
					<Square value={squares[0]} onClick={() => handleClick(0)} />
					<Square value={squares[1]} onClick={() => handleClick(1)} />
					<Square value={squares[2]} onClick={() => handleClick(2)} />
				</div>
				<div className="board-row">
					<Square value={squares[3]} onClick={() => handleClick(3)} />
					<Square value={squares[4]} onClick={() => handleClick(4)} />
					<Square value={squares[5]} onClick={() => handleClick(5)} />
				</div>
				<div className="board-row">
					<Square value={squares[6]} onClick={() => handleClick(6)} />
					<Square value={squares[7]} onClick={() => handleClick(7)} />
					<Square value={squares[8]} onClick={() => handleClick(8)} />
				</div>
				<button className="restart" onClick={handleRestart}>Restart Game!</button>
				<br></br>
				<button className="restart" onClick={()=>setIsToggled(!isToggled)}>Menu</button>
			</div>
		);
	};

	const [isToggled, setIsToggled] = useState(false);
	const handleSelectX = () => {
		init = 0;
		setIsX(true);
		setSquares(Array(9).fill(null));
		setIsToggled(!isToggled);
	};
	const handleSelectY = () => {
		setIsX(false);
		init = 1;
		setSquares(Array(9).fill(null));
		setIsToggled(!isToggled);
	};

	const Menu = () => {

		return (
			<div className="menu-board">
				<h1 class="mt-5 mb-4 text-white"><strong>CHOOSE YOUR WEAPON</strong></h1>
				<input className="mr-3" type="text" id="player1" placeholder="player 1 username"></input>
				<input className="ml-3" type="text" id="player2" placeholder="player 2 username"></input>
				<br className="mb-4"></br>
				<button className="btnn x" onClick={handleSelectX}>X</button>
				<button className="btnn y" onClick={handleSelectY}>Y</button>
			</div>
		);
	};

	return (
		<div className="body text-center">
			<h1 className="pt-5 text-white"><strong>Tic Tac Toe in React.js!</strong></h1>
			<h2 className="mt-3 text-white"><strong>Pick a weapon</strong></h2>
			{!isToggled ? <Menu /> : <Board />}
		</div>
	);
}

export default Home;
