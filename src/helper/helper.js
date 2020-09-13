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
export const addQuestion = (question) => {
	return fetch(
		`http://api-quiz-endpoints.herokuapp.com/api/add/5f4a5663751a87977cda2fc3`,
		{
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(question),
		},
	)
		.then((docs) => {
			return docs.json();
		})
		.catch((error) => console.log(error));
};
