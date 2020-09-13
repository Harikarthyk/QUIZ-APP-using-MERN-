import React from 'react';
import './ScoreBoard.css';
function ScoreBoard({ correct, wrong, skip, color, time, sec }) {
	const avgTime = () => {
		var timestamp = Math.round(
			(parseInt(correct) + parseInt(wrong) + parseInt(skip)) / parseInt(sec),
		);
		var hours = Math.floor(timestamp / 60 / 60);
		var minutes = Math.floor(timestamp / 60) - hours * 60;
		var seconds = timestamp % 60;
		if (hours <= 9) hours = '0' + hours;
		if (minutes <= 9) minutes = '0' + minutes;
		if (seconds <= 9) seconds = '0' + seconds;
		return `${hours}:${minutes}:${seconds} sec `;
	};
	return (
		<div className="scoreboard" style={{ background: color }}>
			<div className="socreboard__header">
				<strong>Hey Dev</strong> Your Score Board
			</div>
			<div className="scoreboard__details">
				<div className="scoreboard__option">✅ Correct Answers : {correct}</div>
				<div className="scoreboard__option">❎ Wrong Answers :{wrong}</div>
				<div className="scoreboard__option">❗❗ Skipped :{skip}</div>
				<div className="scoreboard__option">
					⏰ Total Time Taken : {time} sec
				</div>
				{/* <div className="scoreboard__option">
					Average Time Taken for one Question : {avgTime()}
				</div> */}
			</div>
		</div>
	);
}

export default ScoreBoard;
