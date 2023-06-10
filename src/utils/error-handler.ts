export function errorHandler<T>(
  promise: Promise<T>,
  improve?: string,
): Promise<(T | null)[] | [never, null]> {
  return promise
    .then((res) => [null, res])
    .catch((reason) => {
      if (improve) {
        Object.assign(reason, improve);
      }
      return [reason];
    });
}
