import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BatteryStatus } from '@ionic-native/battery-status';
import { NativeAudio } from '@ionic-native/native-audio';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  charge: number;
  chargeLevelSubscription: any;
  criticalLevelSubscription: any;

  constructor(public navCtrl: NavController,
              public batStatus: BatteryStatus,
              public audio: NativeAudio) {
              
    this.audio.preloadSimple('battery_critical', 'assets/sounds/battery_critical.mp3')
      .then(() => {console.log("loaded");},
            (err) => {console.log("load err: " + err);});
              
    this.chargeLevelSubscription = this.batStatus.onChange().subscribe(status => {
      this.charge = status.level;
      console.log("Charge:" + this.charge);

    
      
    });

    this.criticalLevelSubscription = this.batStatus.onCritical().subscribe(() => {

      //Set timeout so sound plays after Android system warning
      console.log("Starting delay");
      setTimeout(() => {
        console.log("Starting sound");
        this.audio.play('battery_critical').then(() => {console.log("worked");},
                                               (err) => {console.log("play err: "+ err);}
        );
      }, 1000);
      
    });

  }
  

}
