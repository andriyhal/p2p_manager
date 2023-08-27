async function fetchBestOrderPrice(tradeType) {
	try {
		const response = await fetch(
			`/api/orders/best?tradeType=${tradeType}`,
			{
				method: 'GET' // Используйте GET запрос для получения данных
				// Дополнительные параметры запроса, заголовки и т.д.
			}
		);

		if (!response.ok) {
			throw new Error('Error fetching best order price');
		}

		const data = await response.json();
		return data.order.price; // Предположим, что сервер возвращает структуру с полем "price" внутри объекта "order"
	} catch (error) {
		console.error('Error fetching best order price:', error);
		throw error; // Можно обработать ошибку здесь или передать выше
	}
}
