import { ReadonlyURLSearchParams } from "next/navigation";

export const sleep = (timer = 1000): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, timer)
  })
}

export const formatTime = (num: number): string => {
  const hours = Math.floor(num / 60);
  const minutes = num % 60;

  return `${hours}:${minutes}`;
}

export const dateFormatter = new Intl.DateTimeFormat('en-US');

export const getQuery = (searchParams: ReadonlyURLSearchParams, paramName: string, value: string) => {
  const currentQuery = new URLSearchParams(Array.from(searchParams.entries()));

  if (value) {
    currentQuery.set(paramName, value.toString())
  } else {
    currentQuery.delete(paramName);
  }

  return currentQuery.size > 0
      ? `?${currentQuery.toString()}`
      : '';
}