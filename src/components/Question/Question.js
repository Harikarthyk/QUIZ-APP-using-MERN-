import React from 'react';
import './Question.css';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/theme-monokai';

function Question({
	category,
	question,
	index,
	color,
	ans,
	setAns,
	viewScoreboard,
}) {
	return (
		<div className="question" style={{ background: color }}>
			<div className="question__header">
				{index + 1} {question.question}
			</div>
			{question.code ? (
				<div className="question__code">
					<AceEditor
						style={{
							height: '250px',
							width: '100%',
						}}
						mode={category}
						theme="monokai"
						fontSize={20}
						readOnly={true}
						value={question.code}
						setOptions={{ showLineNumbers: false }}
					/>
				</div>
			) : (
				''
			)}
			{!viewScoreboard ? (
				<div className="question__option">
					{question.options.map((option, optionIndex) => (
						<div key={optionIndex} className="question__optionValue">
							<input
								type="radio"
								name={question._id}
								id={option}
								onChange={() => {
									let newArray = ans;
									newArray[index] = 1 + optionIndex;
									setAns(newArray);
								}}
								value={option}
							/>
							<label htmlfor={option}>{option}</label>
						</div>
					))}
				</div>
			) : (
				<React.Fragment>
					<div className="question__option">
						{question.ans === ans[index] ? (
							<div className="question__ResultOption  question__Rightoption ">
								{question.options[ans[index] - 1]}{' '}
								<strong> is the Correct Answer </strong>
							</div>
						) : (
							<React.Fragment>
								{ans[index] === -1 ? (
									<div className="question__ResultOption question__Skippedoption">
										'You have Skipped the Question'
									</div>
								) : (
									<div className="question__ResultOption  question__Wrongoption">
										<strong>Your Answer : </strong>{' '}
										{question.options[ans[index] - 1]}
									</div>
								)}

								<div className="question__ResultOption question__Rightoption">
									<strong>Right Answer : </strong>
									{question.options[question.ans - 1]}
								</div>
							</React.Fragment>
						)}
					</div>
					<div className="question__explaination">
						<strong>Exlaination</strong> {question.explaination}
					</div>
				</React.Fragment>
			)}
		</div>
	);
}

export default Question;
