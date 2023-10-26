export const convertStringToNumber = str => {
	let cleanedStr = str.replace(/,/g, '');

	cleanedStr = cleanedStr.replace('.', ',');
	cleanedStr = cleanedStr.replace(',', '.');

	return parseFloat(cleanedStr);
};
