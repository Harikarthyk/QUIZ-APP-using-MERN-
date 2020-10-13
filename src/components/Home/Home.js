import React, { useEffect, useState } from 'react';
import { getAllCategory } from '../../helper/helper';
import { Link } from 'react-router-dom';
import './Home.css';
import Loader from 'react-loader-spinner';

function Home() {
	const [allCategory, setAllCategory] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		preloadAllCategory();
	}, []);
	const preloadAllCategory = async () => {
		await getAllCategory()
			.then((response) => {
				setAllCategory(response.categories);
				setLoading(false);
			})
			.catch((error) => console.error(error));
	};
	return (
		<div className="home">
			<div className="home__header">
				<div className="home__title">
					<strong>
						Hey Dev{' '}
						<span role="img" aria-label="" alt="emojii">
							😎😎
						</span>
					</strong>{' '}
					Let's test your Knowledge
				</div>
			</div>
			<div className="home__body">
				{loading ? (
					<Loader type="Oval" color="#00BFFF" height={50} width={50} />
				) : (
					''
				)}
				{allCategory.map((category) => (
					<Link
						key={category._id}
						className="home__body_block"
						style={{ backgroundColor: category.bgColor }}
						// onClick={() => handleClick(category)}
						to={'/api/' + category._id}
					>
						<div className="home__body_block_img">
							<img src={category.logo} alt={category.name} />
						</div>
						<div className="home__body_block_title_wrapper">
							<div className="home__body_block_title">{category.name}</div>
						</div>
					</Link>
				))}
			</div>
			<Link className="home__body__addQuestion" to="/addquestion">
				<button>Add Question</button>
			</Link>
		</div>
	);
}

export default Home;
