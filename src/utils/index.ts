
export const sleep = (timer = 1000): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, timer)
  })
}

export const toTime = (num: number): string => {
  const hours = Math.floor(num / 60);
  const minutes = num % 60;

  return `${hours}:${minutes}`;
}