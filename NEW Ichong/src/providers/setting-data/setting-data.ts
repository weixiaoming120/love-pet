import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import { HttpClient } from '@angular/common/http';
@Injectable()
export class SettingDataProvider {
  // true: dark-theme
  // false: light-theme
  theme: BehaviorSubject<boolean>;
  constructor() {
    this.theme = new BehaviorSubject(false);
  }

  setActiveTheme(theme) {
    this.theme.next(theme);
  }
  getActiveTheme() {
    return this.theme.asObservable();
  }
}
