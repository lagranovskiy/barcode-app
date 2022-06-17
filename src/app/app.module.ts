import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { NavigationComponent } from './components/navigation/navigation.component';
import { GameSelectorComponent } from './views/game-selector/game-selector.component';
import { GameStatisticsComponent } from './views/game-statistics/game-statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    GameSelectorComponent,
    GameStatisticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
