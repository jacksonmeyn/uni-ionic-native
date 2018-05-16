import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { CompassPage } from '../compass/compass';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CompassPage;
  tab3Root = AboutPage;

  constructor() {

  }
}
