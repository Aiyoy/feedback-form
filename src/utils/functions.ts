export const emulatedRequest = async () => {
  const promise = new Promise<IResponse>((res) => {
    setTimeout(() => {
      const random: number = Math.random();
      if (random > 0.5) {
        res({ message: 'Everything is fine', status: 'success' });
      } else {
        res({ message: 'Something went wrong', status: 'error' });
      }
    }, 3000);
  });
  return promise;
};
