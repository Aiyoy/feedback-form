export const emulatedRequest = async () => {
  const promise = new Promise<IResponse>((res) => {
    setTimeout(() => {
      const random: number = Math.random();
      if (random > 0.5) {
        res({ message: 'Запрос отправлен успешно!', status: 'success' });
      } else {
        res({ message: 'Что-то пошло не так...', status: 'error' });
      }
    }, 3000);
  });
  return promise;
};
