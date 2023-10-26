import { TASKS_INFO_STORAGE_KEY } from '../../shared/config';
import LocalStorageManager from '../../shared/lib/local-storage-manager';
import { taskLocalStorage } from './use-task-local-storage';

const tasksInfo = new LocalStorageManager(TASKS_INFO_STORAGE_KEY);

export const handleSaveTaskToLocalStorage = (submitData, props) => {
	const { storeTaskAndUpdateIfExists } = taskLocalStorage();
	let stringWithoutCommasPercentage;
	let parsedNumberPercentage = submitData.percentage;
	let stringWithoutCommasBeatBy;
	let parsedNumberBeatBy = submitData.beatBy;

	if (typeof submitData.percentage === 'string') {
		stringWithoutCommasPercentage = submitData.percentage.replace(/,/g, '');
		parsedNumberPercentage = parseFloat(stringWithoutCommasPercentage);
	}

	if (typeof submitData.beatBy === 'string') {
		stringWithoutCommasBeatBy = submitData.beatBy.replace(/,/g, '');
		parsedNumberBeatBy = parseFloat(stringWithoutCommasBeatBy);
	}

	storeTaskAndUpdateIfExists({
		percentage: parsedNumberPercentage,
		beatBy: parsedNumberBeatBy,
		isMerchant: submitData.isMerchant ? 'merchant' : null,
		...props
	});
};

export const handleDeleteTask = props => {
	tasksInfo.saveData(
		tasksInfo.readData().filter(task => task.id !== props.id)
	);
};
