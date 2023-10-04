import { TASKS_INFO_STORAGE_KEY } from '../../shared/config';
import LocalStorageManager from '../../shared/lib/local-storage-manager';
import useTaskLocalStorage from './use-task-local-storage';

const tasksInfo = new LocalStorageManager(TASKS_INFO_STORAGE_KEY);

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
		tasksInfo.readData().filter(task => task.id !== props.id)
	);
};
