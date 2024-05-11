export const SendExcludeProvider = async (): Promise<unknown | undefined> => {
  let data;
  await new Promise<void>(resolve => {
    setTimeout(() => {
      data = true;
      resolve();
    }, 5000);
  });

  return data;
};
