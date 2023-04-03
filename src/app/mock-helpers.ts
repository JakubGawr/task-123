import { delay, of, switchMap, throwError } from 'rxjs';

export const serverMock = <T>(data: T, err = false) =>
  of(data).pipe(
    delay(1000),
    switchMap((e) => (err ? throwError(() => '') : of(e)))
  );
