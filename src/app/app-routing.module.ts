import { RecordViewComponent } from './views/record-view/record-view.component';
import { SauberUnsauberComponent } from './views/sauber-unsauber/sauber-unsauber.component';
import { FruechteDesGeistesComponent } from './views/fruechte-des-geistes/fruechte-des-geistes.component';
import { GameSelectorComponent } from './views/game-selector/game-selector.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ApostelnComponent} from "./views/aposteln/aposteln.component";

const routes: Routes = [
  { path: 'start', component: GameSelectorComponent },
  { path: 'fruechte-des-geistes', component: FruechteDesGeistesComponent },
  { path: 'sauber-unsauber', component: SauberUnsauberComponent },
  { path: 'aposteln', component: ApostelnComponent },
  { path: 'rekorde', component: RecordViewComponent },
  { path: '**', component: GameSelectorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
