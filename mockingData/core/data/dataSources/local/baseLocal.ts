export interface IBaseLocalData {
  setLocalStorage(key: string, data: string): void;
  setTokenLocalStorage(key: string, token: string): void;
  getLocalStorage(key: string): string | null;
  removeLocalStorage(key: string): void;
}

export class BaseLocalDataImpl implements IBaseLocalData {
  setLocalStorage(key: string, data: string): void {
    localStorage.setItem(key, data);
  }

  setTokenLocalStorage(key: string, token: string): void {
    localStorage.setItem(key, token);
  }

  getLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
  }

  removeLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }
}
