// OrderEditor.js
import React from 'react';
import { useOrderUpdateTracker } from '../use-order-update-tracker';
import { OrderItem } from './order_item';

const styles = {
	editor: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: '20px'
	},
	resetButton: {
		padding: '10px 15px',
		fontSize: '16px',
		cursor: 'pointer',
		margin: '10px 0'
	}
};

export const OrderUpdateCounter = () => {
	const { tasksInfo, updateCounts, resetUpdateCounts } =
		useOrderUpdateTracker();

	return (
		<>
			<div style={styles.editor}>
				{tasksInfo.map(order => (
					<OrderItem
						key={order.id}
						order={order}
						countUpdate={updateCounts[order.id]}
					/>
				))}
			</div>
			<button style={styles.resetButton} onClick={resetUpdateCounts}>
				Reset Count Updates
			</button>
		</>
	);
};
