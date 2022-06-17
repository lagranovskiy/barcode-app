import { GameSelectorComponent } from './views/game-selector/game-selector.component';
import { GameStatisticsComponent } from './views/game-statistics/game-statistics.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'start', component: GameSelectorComponent },
  { path: 'statistics', component: GameStatisticsComponent },
  { path: '**', component: GameStatisticsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
