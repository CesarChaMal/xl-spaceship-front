import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BoardComponent } from './dashboard/board/board.component';
import {FormsModule} from "@angular/forms";
import {GameService} from "./service/game.service";
import {HttpModule} from "@angular/http";
import {Ng2Webstorage} from "ngx-webstorage";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2Webstorage,
    Ng2Webstorage.forRoot({prefix: 'xl', separator: '.', caseSensitive: true}),
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
