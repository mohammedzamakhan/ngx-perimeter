import { NgModule, Inject, Optional, ModuleWithProviders } from '@angular/core';
import { PerimeterDirective } from './perimeter.directive';
import { PERIMETER_CONFIG, PerimeterService, IPerimeterConfig } from './perimeter.service';

@NgModule({
  declarations: [PerimeterDirective],
  imports: [
  ],
  exports: [PerimeterDirective]
})
export class PerimeterModule {

  static forRoot(config: IPerimeterConfig = {}): ModuleWithProviders  {
    return {
      ngModule: PerimeterModule,
      providers: [
        { provide: PERIMETER_CONFIG, useValue: {}, multi: true, deps: [PerimeterService] },
        { provide: PERIMETER_CONFIG, useValue: config, multi: true },
        PerimeterService
      ]
    };
  }

  constructor(
    ps: PerimeterService,
    @Optional() @Inject(PERIMETER_CONFIG) configs: any[] = [],
  ) {
    if (!configs) {
      return;
    }

    configs.forEach(config => ps.addConfig(config));
  }
}
