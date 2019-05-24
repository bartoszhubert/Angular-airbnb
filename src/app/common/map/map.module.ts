import { NgModule } from "@angular/core";
import { AgmCoreModule } from "@agm/core";
import { CommonModule } from "@angular/common";

import { MapService } from "./map.service";
import { CamelizePipe } from "ngx-pipes";
import { MapComponent } from "./map.component";

@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyA-GcQoOnvhk44HJ1006afmG-oeA-AFsEM"
    })
  ],
  exports: [MapComponent],
  providers: [MapService, CamelizePipe]
})
export class MapModule {}
