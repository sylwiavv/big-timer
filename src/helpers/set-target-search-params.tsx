export const setTargetIntoSearchParams = (
  params: URLSearchParams,
  milliseconds: number
) => {
  if (milliseconds > 0) {
    const targetTimestamp = Date.now() + milliseconds;
    params.set('target', targetTimestamp.toString());
  }
};
