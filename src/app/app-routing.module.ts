import { SauberUnsauberComponent } from './views/sauber-unsauber/sauber-unsauber.component';
import { FruechteDesGeistesComponent } from './views/fruechte-des-geistes/fruechte-des-geistes.component';
import { GameSelectorComponent } from './views/game-selector/game-selector.component';
import { GameStatisticsComponent } from './components/game-statistics/game-statistics.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'start', component: GameSelectorComponent },
  { path: 'fruechte-des-geistes', component: FruechteDesGeistesComponent },
  { path: 'sauber-unsauber', component: SauberUnsauberComponent },
  { path: '**', component: GameSelectorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
