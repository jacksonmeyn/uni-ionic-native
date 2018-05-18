import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DeviceOrientation, DeviceOrientationCompassHeading} from '@ionic-native/device-orientation';

@Component({
  selector: 'page-compass',
  templateUrl: 'compass.html'
})
export class CompassPage {

  
  headingDegrees: number;
  headingSymbol: string;

  constructor(public navCtrl: NavController,
              public orientation: DeviceOrientation) {
/*       const errorString: string = "Can't determine your orientation at this time";
      orientation.getCurrentHeading().then(
        (data: DeviceOrientationCompassHeading) => {
          console.log(data);
          this.headingDegrees = data.magneticHeading;
        },
        (error: any) => {
          this.headingDegrees = -1;
          this.headingSymbol = errorString;
          console.log(error);
        }
      ) */

      orientation.watchHeading({frequency: 1000}).subscribe(
        (data: DeviceOrientationCompassHeading) => {
          console.log("Drect: " + data.magneticHeading);
          this.headingDegrees = data.magneticHeading;
        }
      );

  }

}
