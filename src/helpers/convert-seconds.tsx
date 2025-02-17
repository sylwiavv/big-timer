export const convertSeconds = (totalSeconds: number) => {
  const convertedHours = Math.floor(totalSeconds / 3600);
  const convertedMinutes = Math.floor((totalSeconds % 3600) / 60);
  const convertedSeconds = totalSeconds % 60;

  return { convertedHours, convertedMinutes, convertedSeconds };
};

export const convertToSeconds = (
  hours: number,
  minutes: number,
  seconds: number
): number => {
  return hours * 3600 + minutes * 60 + seconds;
};
