export const delayedTaskRunner = (sleep) => {
  let terminate = false;

  const start = async (callback) => {
    const update = async () => {
      if (!terminate) {
        await new Promise((res) => setTimeout(res, sleep));
        if (!terminate) {
          await callback();
          await update();
        }
      }
    };

    terminate = false;
    await update();
  };

  const stop = () => {
    terminate = true;
  };

  return { start, stop };
};
