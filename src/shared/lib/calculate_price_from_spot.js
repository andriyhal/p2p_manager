export const calculatePriceFromSpot = ({ p2pPrice, spotPrice }) => {
	return (p2pPrice / spotPrice) * 100;
};
