import { useState, useEffect, useCallback } from 'react';
import {
	ORDER_UPDATE_COUNTS_KEY,
	TASKS_INFO_STORAGE_KEY
} from '../../shared/config';

export const useOrderUpdateTracker = () => {
	const [updateCounts, setUpdateCounts] = useState(() => {
		const storedCounts = localStorage.getItem(ORDER_UPDATE_COUNTS_KEY);
		return storedCounts ? JSON.parse(storedCounts) : {};
	});

	const tasksInfo = JSON.parse(
		localStorage.getItem(TASKS_INFO_STORAGE_KEY) || '[]'
	);

	const resetUpdateCounts = useCallback(() => {
		setUpdateCounts({});
	}, []);

	const incrementUpdateCount = useCallback(orderId => {
		setUpdateCounts(prevCounts => {
			const newCount = (prevCounts[orderId] || 0) + 1;
			return { ...prevCounts, [orderId]: newCount };
		});
	}, []);

	useEffect(() => {
		const searchParams = new URLSearchParams(window.location.search);
		const code = searchParams.get('code');
		if (code) {
			incrementUpdateCount(code);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(
			ORDER_UPDATE_COUNTS_KEY,
			JSON.stringify(updateCounts)
		);
	}, [updateCounts]);

	return { tasksInfo, updateCounts, incrementUpdateCount, resetUpdateCounts };
};
