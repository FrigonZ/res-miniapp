import { formatNumber } from './number';

export const formatTime = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    `${[year, month, day].map(formatNumber).join('/')
    } ${
      [hour, minute, second].map(formatNumber).join(':')}`
  );
};

export const formatTimeString = (time: string) => {
  const dateAndTime = time.split('T');
  if(!dateAndTime[1]) return '';
  const times = dateAndTime[1].split(':');

  return `${dateAndTime[0]}  ${Number(times[0])+8}:${times[1]}`;
};
