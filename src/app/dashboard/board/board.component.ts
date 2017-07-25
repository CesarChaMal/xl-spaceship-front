import {Component, Input, OnInit} from '@angular/core';
import {Board} from "../../model/board";
import {GameService} from "../../service/game.service";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input() board: Board;

  constructor() { }

  ngOnInit() {
  }

}
