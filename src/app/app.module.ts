import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { NavigationComponent } from './components/navigation/navigation.component';
import { GameSelectorComponent } from './views/game-selector/game-selector.component';
import { GameStatisticsComponent } from './components/game-statistics/game-statistics.component';
import { FruechteDesGeistesComponent } from './views/fruechte-des-geistes/fruechte-des-geistes.component';
import { SauberUnsauberComponent } from './views/sauber-unsauber/sauber-unsauber.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    GameSelectorComponent,
    GameStatisticsComponent,
    FruechteDesGeistesComponent,
    SauberUnsauberComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatGridListModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
