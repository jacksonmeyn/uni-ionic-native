import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BatteryStatus } from '@ionic-native/battery-status';
import { NativeAudio } from '@ionic-native/native-audio';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  charge: number;
  isPluggedIn: boolean;
  chargeLevelSubscription: any;
  criticalLevelSubscription: any;
  lowLevelSubscription: any;

  constructor(public navCtrl: NavController,
              public batStatus: BatteryStatus,
              public audio: NativeAudio,
              public changeDetector: ChangeDetectorRef) {
              
    this.audio.preloadSimple('battery_critical', 'assets/sounds/battery_critical.mp3')
      .then(() => {console.log("loaded");},
            (err) => {console.log("load err: " + err);});
    this.audio.preloadSimple('battery_low', 'assets/sounds/battery_low.mp3')
      .then(() => {console.log("loaded");},
            (err) => {console.log("load err: " + err);});
    this.audio.preloadSimple('battery_charging', 'assets/sounds/battery_charging.mp3')
      .then(() => {console.log("loaded");},
            (err) => {console.log("load err: " + err);});
    this.audio.preloadSimple('battery_not_charging', 'assets/sounds/battery_not_charging.mp3')
      .then(() => {console.log("loaded");},
            (err) => {console.log("load err: " + err);});
              
    this.chargeLevelSubscription = this.batStatus.onChange().subscribe(status => {
      if (status.isPlugged != this.isPluggedIn) {
        //Battery has changed from charging to not charging or vice versa
        this.isPluggedIn = status.isPlugged;
        switch (this.isPluggedIn) {
          case true:
            this.audio.play('battery_charging');
            break;
          case false:
            this.audio.play('battery_not_charging');
            break;
          default:
            break;
        }
      }
      this.charge = status.level;
      this.changeDetector.detectChanges();
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

    this.lowLevelSubscription = this.batStatus.onLow().subscribe(() => {
      //Set timeout so sound plays after Android system warning
      console.log("Starting delay");
      setTimeout(() => {
        console.log("Starting sound");
        this.audio.play('battery_low').then(() => {console.log("worked");},
                                               (err) => {console.log("play err: "+ err);}
        );
      }, 1000);
    })

  }

/*   getBattery() {
    this.updateBattery()
      .then((charge) => {
        this.charge = charge;
        console.log("Chrge " + this.charge);
      })
  }

  updateBattery() : Promise<any> {
    return new Promise(resolve => {
      this.chargeLevelSubscription = this.batStatus.onChange().subscribe((status) => {
        if (status.isPlugged != this.isPluggedIn) {
          //Battery has changed from charging to not charging or vice versa
          this.isPluggedIn = status.isPlugged;
          switch (this.isPluggedIn) {
            case true:
              this.audio.play('battery_charging');
              break;
            case false:
              this.audio.play('battery_not_charging');
              break;
            default:
              break;
          }
        }
        console.log("Charge changed");
      })
    })
  }

  ionViewDidLoad () {
    console.log("Looded");
    this.getBattery();
  } */
  

}
