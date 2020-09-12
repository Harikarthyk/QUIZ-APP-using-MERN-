export const getAllCategory = () => {
	return fetch(`http://api-quiz-endpoints.herokuapp.com/api/allCategory`, {
		method: 'GET',
	})
		.then((response) => response.json())
		.catch((error) => console.log(error));
};

export const getAllQuestionByCategory = (categoryId) => {
	return fetch(`https://api-quiz-endpoints.herokuapp.com/api/get/${categoryId}`)
		.then((response) => response.json())
		.catch((error) => console.log(error));
};

export const getCategoryById = (categoryId) => {
	return fetch(
		`https://api-quiz-endpoints.herokuapp.com/api/category/${categoryId}`,
	)
		.then((response) => response.json())
		.catch((error) => console.error(error));
};
