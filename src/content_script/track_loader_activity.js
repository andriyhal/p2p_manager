import { observeElementMutations } from '../shared/lib/observe_element_mutations';
import { unmountTaskForms } from './unmount_task_form';
import { useAddCreateTaskForm } from './use-add-create-task-form';

const observerOptions = {
	childList: true,
	subtree: true
};

const isLoader = element => {
	if (
		!!element &&
		element.attributes.length === 1 &&
		element.children.length === 1 &&
		element.children[0].children.length === 4
	) {
		return true;
	}

	return false;
};

const callback = async (mutationsList, observer) => {
	for (let mutation of mutationsList) {
		if (mutation.type === 'childList') {
			if (isLoader(mutation.addedNodes[0])) {
				unmountTaskForms();
			}

			if (isLoader(mutation.removedNodes[0])) {
				await useAddCreateTaskForm();
			}
		}
	}
};

const startElement = document.getElementById('__APP');
const traversalPath = [
	{ type: 'child', index: 1 },
	{ type: 'child', index: 0 },
	{ type: 'child', index: 1 },
	{ type: 'child', index: 1 },
	{ type: 'child', index: 1 },
	{ type: 'child', index: 0 }
];

export const trackLoaderActivity = () =>
	observeElementMutations(
		startElement,
		traversalPath,
		observerOptions,
		callback
	);
