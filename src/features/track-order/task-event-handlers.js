import LocalStorageManager from '../../shared/lib/local-storage-manager';
import useTaskLocalStorage from './use-task-local-storage';

const tasksInfo = new LocalStorageManager('tasksInfo');

export const handleSaveTaskToLocalStorage = (submitData, props) => {
	const { storeTaskAndUpdateIfExists } = useTaskLocalStorage();
	const stringWithoutCommasPriceLimit = submitData.priceLimit.replace(
		/,/g,
		''
	);
	const parsedNumberPriceLimit = parseFloat(stringWithoutCommasPriceLimit);

	const stringWithoutCommasBeatBy = submitData.beatBy.replace(/,/g, '');
	const parsedNumberBeatBy = parseFloat(stringWithoutCommasBeatBy);

	storeTaskAndUpdateIfExists({
		priceLimit: parsedNumberPriceLimit,
		beatBy: parsedNumberBeatBy,
		...props
	});
};

export const handleDeleteTask = props => {
	tasksInfo.saveData(
		tasksInfo.readData().filter(task => task.orderId !== props.orderId)
	);
};
