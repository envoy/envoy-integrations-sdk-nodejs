interface PromiseFulfilledResult<T> {
  status: 'fulfilled';
  value: T;
}

interface PromiseRejectedResult {
  status: 'rejected';
  reason: unknown;
}

type PromiseSettledResult<T> = PromiseFulfilledResult<T> | PromiseRejectedResult;

export default function promiseAllSettled<T extends readonly unknown[] | []>(
  promises: T,
): Promise<Array<PromiseSettledResult<T[number]>>> {
  // @ts-expect-error Promise.allSettled is not supported in our target lib. Replace this function once it is.
  if (typeof Promise.allSettled === 'function') {
    // @ts-expect-error Promise.allSettled is not supported in our target lib.
    return Promise.allSettled(promises);
  }

  return Promise.all(
    promises.map((p: unknown) =>
      Promise.resolve(p).then(
        (value) => ({ status: 'fulfilled' as const, value }),
        (reason) => ({ status: 'rejected' as const, reason }),
      ),
    ),
  );
}
