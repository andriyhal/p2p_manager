const FLAG_NAME = 'orderLocked';

export const lockOrder = () => localStorage.setItem(FLAG_NAME, true);
export const unlockOrder = () => localStorage.removeItem(FLAG_NAME);
export const isLocked = () => !!localStorage.getItem(FLAG_NAME);