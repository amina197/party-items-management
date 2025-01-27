import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public saveData<T>(key: string, value: T): void {
    try {
      const json = JSON.stringify(value);
      localStorage.setItem(key, json);
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  }

  public loadData<T>(key: string): T | null {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : null;
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      return null;
    }
  }

  public removeData(key: string): void {
    localStorage.removeItem(key);
  }
}
