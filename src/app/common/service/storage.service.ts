import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() { }

  /**
   * 获取localStorage中的数据
   * @param key 键
   */
  getLocalStorage(key: string): any {
    const value = localStorage.getItem(key);
    if (value) {
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    }
    return null;
  }

  /**
   * 设置localStorage中的数据
   * @param key 键
   * @param value 值
   */
  setLocalStorage(key: string, value: any): void {
    if (typeof value === 'object') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
  }

  /**
   * 删除localStorage中的数据
   * @param key 键
   */
  removeLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * 清空localStorage
   */
  clearLocalStorage(): void {
    localStorage.clear();
  }

  /**
   * 获取sessionStorage中的数据
   * @param key 键
   */
  getSessionStorage(key: string): any {
    const value = sessionStorage.getItem(key);
    if (value) {
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    }
    return null;
  }

  /**
   * 设置sessionStorage中的数据
   * @param key 键
   * @param value 值
   */
  setSessionStorage(key: string, value: any): void {
    if (typeof value === 'object') {
      sessionStorage.setItem(key, JSON.stringify(value));
    } else {
      sessionStorage.setItem(key, value);
    }
  }

  /**
   * 删除sessionStorage中的数据
   * @param key 键
   */
  removeSessionStorage(key: string): void {
    sessionStorage.removeItem(key);
  }

  /**
   * 清空sessionStorage
   */
  clearSessionStorage(): void {
    sessionStorage.clear();
  }
}