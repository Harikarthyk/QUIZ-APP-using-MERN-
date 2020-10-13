import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getAllQuestionByCategory, getCategoryById } from '../../helper/helper';
import Question from '../Question/Question';
import ScoreBoard from '../Scoreboard/ScoreBoard';
import './Category.css';
import { FaHandPointLeft, FaHandPointRight } from 'react-icons/fa';
import Loader from 'react-loader-spinner';

function Category() {
	const history = useHistory();
	const [category, setCategory] = useState('');
	const [questions, setQuestions] = useState([]);
	const [viewIndex, setViewIndex] = useState(0);
	const [loading, setLoading] = useState(true);
	const [ans, setAns] = useState([]);
	const [viewScoreboard, setViewScoreBoard] = useState(false);
	const [time, setTime] = useState(0);
	const [scoreBoard, setScoreBoard] = useState({
		Correct: 0,
		Wrong: 0,
		Skipped: 0,
	});
	useEffect(() => {
		let categoryId = history.location.pathname.split('/')[2];
		preloadCateogry(categoryId);
		preloadQuestion(categoryId);
	}, []);
	useEffect(() => {
		if (!viewScoreboard)
			setTimeout(() => {
				setTime(time + 1);
			}, 1000);
	}, [time]);
	const preloadCateogry = async (categoryId) => {
		await getCategoryById(categoryId)
			.then((response) => {
				if (response.error) {
					console.error(response.error);
					return;
				}
				setCategory(response.category[0]);
			})
			.catch((error) => console.error(error));
	};
	const preloadQuestion = async (categoryId) => {
		await getAllQuestionByCategory(categoryId)
			.then((response) => {
				if (response.error) {
					console.error(response.error);
					return;
				}
				setLoading(false);
				setQuestions(response.questions);
				let newArray = new Array(response.questions.length - 1).fill(-1);
				setAns(newArray);
			})
			.catch((error) => console.error(error));
	};
	const handleValidation = () => {
		if (!window.confirm('Do you want to submit...')) return;
		let newScoreBoard = { Correct: 0, Wrong: 0, Skipped: 0 };
		for (let i = 0; i < ans.length; i++) {
			if (ans[i] === -1) newScoreBoard.Skipped++;
			else if (ans[i] == questions[i].ans) newScoreBoard.Correct++;
			else newScoreBoard.Wrong++;
		}

		setScoreBoard({
			...scoreBoard,
			Wrong: newScoreBoard.Wrong,
			Skipped: newScoreBoard.Skipped,
			Correct: newScoreBoard.Correct,
		});
		setViewScoreBoard(true);
		setViewIndex(0);
	};
	const timer = () => {
		var timestamp = time;
		var hours = Math.floor(timestamp / 60 / 60);
		var minutes = Math.floor(timestamp / 60) - hours * 60;
		var seconds = timestamp % 60;
		if (hours <= 9) hours = '0' + hours;
		if (minutes <= 9) minutes = '0' + minutes;
		if (seconds <= 9) seconds = '0' + seconds;
		return `${hours}:${minutes}:${seconds} `;
	};
	return (
		<div className="category">
			<div
				className="category__header"
				style={{
					backgroundColor: category.bgColor,
				}}
			>
				<div className="category__headerQuit">
					{viewIndex + 1} / {questions.length - 1}
				</div>
				<div className="category__headerTitle">
					<div className="category__headerTitleImage">
						<img src={category.logo} alt={category.name} />
					</div>
					<div className="category__headerTitleText">{category.name}</div>
				</div>
				<div className="category__headeTimer">{timer()}</div>
			</div>
			<div className="category__loading">
				{loading ? (
					<Loader type="Oval" color="#00BFFF" height={50} width={50} />
				) : (
					''
				)}
			</div>
			{viewScoreboard ? (
				<ScoreBoard
					correct={scoreBoard.Correct}
					wrong={scoreBoard.Wrong}
					skip={scoreBoard.Skipped}
					color={category.bgColor}
					time={timer()}
					sec={time}
				/>
			) : (
				''
			)}
			<React.Fragment>
				<div>
					{questions.map((question, index) => {
						if (index === viewIndex)
							return (
								<Question
									key={question._id}
									category={category.name.toLowerCase()}
									question={question}
									index={index}
									color={category.bgColor}
									ans={ans}
									setAns={setAns}
									viewScoreboard={viewScoreboard}
								/>
							);
					})}
				</div>
				<div className="category__questionToggle">
					{viewIndex >= 1 ? (
						<div
							className="category__togglePre"
							onClick={() => {
								if (viewIndex >= 1) setViewIndex(viewIndex - 1);
							}}
						>
							<FaHandPointLeft />
						</div>
					) : (
						''
					)}
					{questions.length - 2 !== viewIndex ? (
						<div
							onClick={() => {
								if (viewIndex + 1 <= questions.length - 1)
									setViewIndex(viewIndex + 1);
							}}
							className="category__toggleNext"
						>
							<FaHandPointRight />
						</div>
					) : (
						''
					)}
					{questions.length - 2 === viewIndex && !viewScoreboard ? (
						<div className="category__toggleNext" onClick={handleValidation}>
							Submit
						</div>
					) : (
						''
					)}
				</div>
			</React.Fragment>
		</div>
	);
}

export default Category;
