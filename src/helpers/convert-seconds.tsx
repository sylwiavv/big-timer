export const convertMilliseconds = (totalMilliseconds: number) => {
  const convertedHoursM = Math.floor(totalMilliseconds / 3_600_000);
  const convertedMinutesM = Math.floor(
    (totalMilliseconds % 3_600_000) / 60_000
  );
  const convertedSecondsM = Math.floor((totalMilliseconds % 60_000) / 1_000);

  return { convertedHoursM, convertedMinutesM, convertedSecondsM };
};

export const convertToMilliseconds = (
  hours: number,
  minutes: number,
  seconds: number
): number => {
  const totalMilliseconds = (hours * 3600 + minutes * 60 + seconds) * 1000;
  return totalMilliseconds;
};
