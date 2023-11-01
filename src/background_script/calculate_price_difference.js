export const calculatePriceDifference = (yourPrice, competitorPrice) => {
  const difference = Math.abs(yourPrice - competitorPrice);
  return difference.toFixed(2);
};
