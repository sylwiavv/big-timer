// export const setTargetIntoSearchParams = (
//   params: URLSearchParams,
//   milliseconds: number
// ) => {
//   if (milliseconds > 0) {
//     const targetTimestamp = Date.now() + milliseconds;
//     params.set('target', targetTimestamp.toString());
//   }
// };
export const setTargetIntoSearchParams = (
  params: URLSearchParams,
  targetTimestamp: number
) => {
  params.set('target', targetTimestamp.toString()); // Ustawiamy docelowy timestamp
};
