import { Injectable, InjectionToken } from '@angular/core';

export interface IPerimeterConfig {
  padding?: number;
  breach?: () => {};
}

export const PERIMETER_CONFIG = new InjectionToken<PerimeterService>('PERIMETER_CONFIG');

@Injectable({
  providedIn: 'root'
})
export class PerimeterService {
  padding: number;
  breach: () => {};
  constructor() { }

  addConfig(config: IPerimeterConfig) {
    if (config.padding) {
      this.padding = config.padding;
    }

    if (config.breach) {
      this.breach = config.breach;
    }
  }
}
