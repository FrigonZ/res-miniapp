export const formatNumber = (n: number) => {
  const s = n.toString();
  return s[1] ? s : `0${s}`;
};
