import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { NavigationComponent } from './components/navigation/navigation.component';
import { GameSelectorComponent } from './views/game-selector/game-selector.component';
import { GameStatisticsComponent } from './components/game-statistics/game-statistics.component';
import { FruechteDesGeistesComponent } from './views/fruechte-des-geistes/fruechte-des-geistes.component';
import { SauberUnsauberComponent } from './views/sauber-unsauber/sauber-unsauber.component';
import { HttpClientModule } from '@angular/common/http';
import { SpielfeldComponent } from './components/spielfeld/spielfeld.component';
import { SpielerdatenComponent } from './components/spielerdaten/spielerdaten.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CountdownComponent } from './components/countdown/countdown.component';
import { QrFrageAnzeigeComponent } from './components/qr-frage-anzeige/qr-frage-anzeige.component';
import { QRCodeModule } from 'angularx-qrcode';
import { ZwischensummePipe } from './pipes/zwischensumme/zwischensumme.pipe';
import { KorrekteAntwortenPipe } from './pipes/korrekte-antworten/korrekte-antworten.pipe';
import { FalscheAntwortenPipe } from './pipes/falsche-antworten/falsche-antworten.pipe';
import { RecordViewComponent } from './views/record-view/record-view.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    GameSelectorComponent,
    GameStatisticsComponent,
    FruechteDesGeistesComponent,
    SauberUnsauberComponent,
    SpielfeldComponent,
    SpielerdatenComponent,
    CountdownComponent,
    QrFrageAnzeigeComponent,
    ZwischensummePipe,
    KorrekteAntwortenPipe,
    FalscheAntwortenPipe,
    RecordViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatGridListModule,
    HttpClientModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    QRCodeModule,
    MatSnackBarModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
