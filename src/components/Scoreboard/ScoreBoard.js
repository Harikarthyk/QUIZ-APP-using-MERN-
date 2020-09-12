import React from 'react';
import './ScoreBoard.css';
function ScoreBoard({ correct, wrong, skip, color }) {
	return (
		<div className="scoreboard" style={{ background: color }}>
			<div className="socreboard__header">
				<strong>Hey Dev</strong> Your Score Board
			</div>
			<div className="scoreboard__details">
				<div className="scoreboard__option">✅ Correct Answers : {correct}</div>
				<div className="scoreboard__option">❎ Wrong Answers :{wrong}</div>
				<div className="scoreboard__option">❗❗ Skipped :{skip}</div>
			</div>
		</div>
	);
}

export default ScoreBoard;
