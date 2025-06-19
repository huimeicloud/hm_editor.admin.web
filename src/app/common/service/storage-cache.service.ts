import { Injectable } from '@angular/core';

@Injectable()
export class StorageCacheService {
    localStorageCache = {
        get: (key: string): any => {
            try {
                const value = localStorage.getItem(key);
                if (value !== null) {
                    return JSON.parse(value);
                }
                return null;
            } catch (e) {
                return null;
            }
        },
        set: (key: string, value: any): void => {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (e) {
                console.error('Error saving to localStorage', e);
            }
        },
        remove: (key: string): void => {
            try {
                localStorage.removeItem(key);
            } catch (e) {
                console.error('Error removing from localStorage', e);
            }
        }
    };

    sessionStorageCache = {
        get: (key: string): any => {
            try {
                const value = sessionStorage.getItem(key);
                if (value !== null) {
                    return JSON.parse(value);
                }
                return null;
            } catch (e) {
                return null;
            }
        },
        set: (key: string, value: any): void => {
            try {
                sessionStorage.setItem(key, JSON.stringify(value));
            } catch (e) {
                console.error('Error saving to sessionStorage', e);
            }
        },
        remove: (key: string): void => {
            try {
                sessionStorage.removeItem(key);
            } catch (e) {
                console.error('Error removing from sessionStorage', e);
            }
        }
    };

    constructor() { }

    /**
     * 从本地存储中获取值
     * @param key 键
     * @param defaultValue 默认值
     */
    getItem(key: string, defaultValue: any = null): any {
        try {
            const value = localStorage.getItem(key);
            if (value !== null) {
                return JSON.parse(value);
            }
            return defaultValue;
        } catch (e) {
            return defaultValue;
        }
    }

    /**
     * 向本地存储中设置值
     * @param key 键
     * @param value 值
     */
    setItem(key: string, value: any): void {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Error saving to localStorage', e);
        }
    }

    /**
     * 从本地存储中移除值
     * @param key 键
     */
    removeItem(key: string): void {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error('Error removing from localStorage', e);
        }
    }
}