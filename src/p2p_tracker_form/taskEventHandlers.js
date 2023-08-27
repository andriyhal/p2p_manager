import LocalStorageManager from '../utils/local-storage-manager';
import useTaskLocalStorage from './useTaskLocalStorage';

const tasksInfo = new LocalStorageManager('tasksInfo');

export const handleSaveTaskToLocalStorage = (submitData, props) => {
	const { storeTaskAndUpdateIfExists } = useTaskLocalStorage();
	const stringWithoutCommasPriceThreshold = submitData.priceThreshold.replace(
		/,/g,
		''
	);
	const parsedNumberPriceThreshold = parseFloat(
		stringWithoutCommasPriceThreshold
	);

	const stringWithoutCommasTargetOrderAmount =
		submitData.targetOrderAmount.replace(/,/g, '');
	const parsedNumberTargetOrderAmount = parseFloat(
		stringWithoutCommasTargetOrderAmount
	);

	storeTaskAndUpdateIfExists({
		priceThreshold: parsedNumberPriceThreshold,
		targetOrderAmount: parsedNumberTargetOrderAmount,
		...props
	});
};

export const handleDeleteTask = props => {
	tasksInfo.saveData(
		tasksInfo.readData().filter(task => task.orderId !== props.orderId)
	);
};
