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

      const errorString: string = "Can't determine your orientation at this time";
      orientation.watchHeading({frequency: 1000}).subscribe(
        (data: DeviceOrientationCompassHeading) => {
          console.log("Drect: " + data.magneticHeading);
          this.headingDegrees = Math.round(data.magneticHeading);
          this.headingSymbol = this.degToCompass(this.headingDegrees);
        },
        (err) => {
          this.headingDegrees = -1;
          this.headingSymbol = errorString;
        }
      );

  }

  //Thanks to https://stackoverflow.com/a/25867068 for this function
  degToCompass(num : number) : string {
    var val: number = Math.floor((num / 22.5) + 0.5);
    var arr: string[] = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
  }

}
