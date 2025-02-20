// export const convertSeconds = (totalSeconds: number) => {
//   const convertedHours = Math.floor(totalSeconds / 3600);
//   const convertedMinutes = Math.floor((totalSeconds % 3600) / 60);
//   const convertedSeconds = totalSeconds % 60;

//   return { convertedHours, convertedMinutes, convertedSeconds };
// };

export const convertMilliseconds = (totalMilliseconds: number) => {
  const convertedHoursM = Math.floor(totalMilliseconds / 3_600_000);
  const convertedMinutesM = Math.floor(
    (totalMilliseconds % 3_600_000) / 60_000
  );
  const convertedSecondsM = Math.floor((totalMilliseconds % 60_000) / 1_000);

  return { convertedHoursM, convertedMinutesM, convertedSecondsM };
};

// export const convertToSeconds = (
//   hours: number,
//   minutes: number,
//   seconds: number
// ): number => {
//   return hours * 3600 + minutes * 60 + seconds;
// };

export const convertToMilliseconds = (
  hours: number,
  minutes: number,
  seconds: number
): number => {
  const totalMilliseconds = (hours * 3600 + minutes * 60 + seconds) * 1000;
  return totalMilliseconds;
};
