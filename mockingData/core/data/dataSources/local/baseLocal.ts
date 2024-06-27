export interface IBaseLocalData {
  setLocalStorage(key: string, data: string): void;
  setIdLocalStorage(key: string, id: string): void;
  setTokenLocalStorage(key: string, token: string): void;
  getLocalStorage(key: string): string | null;
  removeLocalStorage(key: string): void;
}

export class BaseLocalDataImpl implements IBaseLocalData {
  setLocalStorage(key: string, data: string): void {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(key, jsonData);
  }

  setIdLocalStorage(key: string, id: string): void {
    localStorage.setItem(key, id);
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
