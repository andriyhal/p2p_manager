import { useState } from 'react';
import ReactDOM from 'react-dom';

export const useIdManagerForUnmount = () => {
	const [ids, setIds] = useState([]);

	const addId = id => {
		setIds(prevIds => [...prevIds, id]);
	};

	const removeId = id => {
		setIds(prevIds => prevIds.filter(prevId => prevId !== id));
		ReactDOM.unmountComponentAtNode(document.getElementById(id));
	};

	const removeAll = () => {
		ids.forEach(id =>
			ReactDOM.unmountComponentAtNode(document.getElementById(id))
		);
		setIds([]);
	};

	return { ids, addId, removeId, removeAll };
};
