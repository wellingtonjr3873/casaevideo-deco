export type Res<T> = {
    error: boolean;
    value?: T;
    message?: string;
  };