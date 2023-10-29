import { useIdManagerForUnmount } from './use_id_manager_for_unmount';

export const unmountTaskForms = () => {
	const { removeAll } = useIdManagerForUnmount();
	removeAll();
};
