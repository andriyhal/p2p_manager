import { findButtonByText, getInputEditPrice } from "../shared/lib/dom-scraper";

export const postOrder = async (newPrice) => {
  console.log("edit price");
  const priceInputElement = await getInputEditPrice();

  console.log("price input element", priceInputElement);

  const lastValue = priceInputElement.value;
  priceInputElement.value = newPrice;

  const event = new Event("input", { bubbles: true });
  event.simulated = true;

  const tracker = priceInputElement._valueTracker;

  if (tracker) {
    tracker.setValue(lastValue);
  }

  priceInputElement.dispatchEvent(event);

  setTimeout(async () => {
    try {
      const buttonPost = await findButtonByText([
        "Post",
        "Опубликовать",
        "Опублікувати",
      ]);

      buttonPost.click();

      const buttonConfirm = await findButtonByText([
        "Confirm to post",
        "Подтвердить публикацию",
        "Підтвердити публікацію",
      ]);

      buttonConfirm.click();
    } catch (error) {
      console.error("Error:", error);
    }
  }, 1000);
};
