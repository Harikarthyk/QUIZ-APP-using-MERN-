import React, { useState, useEffect } from 'react';
import { addQuestion, getAllCategory } from '../../helper/helper';
import './AddQuestion.css';

function AddQuestion() {
	const [allCategory, setAllCategory] = useState([]);
	const [result, setResult] = useState({
		error: '',
		message: '',
	});
	const [input, setInput] = useState({
		category: '',
		question: '',
		code: '',
		options: [],
		ans: 1,
		explaination: '',
	});
	const [optionValue, setOptionValue] = useState({
		option0: '',
		option1: '',
		option2: '',
		option3: '',
	});
	useEffect(() => {
		preloadAllCategories();
	}, []);
	const preloadAllCategories = async () => {
		await getAllCategory().then((response) => {
			if (response.error) {
				console.error(response.error);
				return;
			}

			setInput({ ...input, category: response.categories[0]._id });
			setAllCategory(response.categories);
		});
	};
	const handleButtonAddQuestion = () => {
		let tempArr = [];
		tempArr.push(optionValue.option0);
		tempArr.push(optionValue.option1);
		tempArr.push(optionValue.option2);
		tempArr.push(optionValue.option3);
		setInput({ ...input, options: tempArr });
		addQuestionToDB();
	};
	const addQuestionToDB = async () => {
		await addQuestion(input)
			.then((response) => {
				if (response.error) {
					setResult({ ...result, error: response.error });
					return;
				}
				setResult({ ...result, message: response.message });
			})
			.catch((error) => console.log(error));
	};
	return (
		<div className="addques">
			<div className="addques_container">
				<div className="addques_message">
					{result.message ? (
						<div className="addques_sucess">{result.message}</div>
					) : (
						''
					)}
					{result.error ? (
						<div className="addques_error">{result.error}</div>
					) : (
						''
					)}
				</div>
				<div className="addques_header">
					<div className="addques_title">Contribute Question 🖊🖊</div>
				</div>
				<div className="addques_form">
					<div className="form_category">
						<label htmlFor="categories">Select the Category</label>
						<select
							onChange={(e) => {
								setInput({ ...input, category: e.target.value });
							}}
							id="categories"
						>
							{allCategory.map((category) => (
								<option key={category._id} value={category._id}>
									{category.name}
								</option>
							))}
						</select>
					</div>

					<div className="form_question">
						<label htmlFor="question">Question</label>
						<textarea
							id="question"
							onChange={(e) => {
								setInput({ ...input, question: e.target.value });
							}}
							value={input.question}
						/>
						<div className="form_code">
							<label htmlFor="code">
								If question Contains any Code (<i>Optional</i>)
							</label>
							<textarea
								onChange={(e) => {
									setInput({ ...input, code: e.target.value });
								}}
								id="code"
								value={input.code}
							/>
						</div>
						<div className="form_option">
							<input
								type="text"
								value={optionValue.option0}
								onChange={(e) => {
									setOptionValue({ ...optionValue, option0: e.target.value });
								}}
								placeholder="Enter option 1"
							/>
							<input
								type="text"
								value={optionValue.option1}
								onChange={(e) => {
									setOptionValue({ ...optionValue, option1: e.target.value });
								}}
								placeholder="Enter option 2"
							/>
							<input
								type="text"
								value={optionValue.option2}
								onChange={(e) => {
									setOptionValue({ ...optionValue, option2: e.target.value });
								}}
								placeholder="Enter option 3"
							/>
							<input
								type="text"
								value={optionValue.option3}
								onChange={(e) => {
									setOptionValue({ ...optionValue, option3: e.target.value });
								}}
								placeholder="Enter option 4"
							/>
						</div>
						<div className="form_ans">
							<label htmlFor="ans">Enter the Option Number</label>
							<input
								id="ans"
								type="number"
								min="1"
								max="4"
								placeholder="Enter the Option Number"
								value={input.ans}
								onChange={(e) => {
									setInput({ ...input, ans: e.target.value });
								}}
							/>
						</div>
						<div className="form__explaination">
							<label htmlFor="explaination">Enter the explaination</label>
							<textarea
								onChange={(e) => {
									setInput({ ...input, explaination: e.target.value });
								}}
								value={input.explaination}
								id="explaination"
							/>
						</div>
						<div className="form_button">
							<button onClick={handleButtonAddQuestion}>Add Question</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddQuestion;
