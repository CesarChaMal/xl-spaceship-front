import {Component, Input, OnInit} from '@angular/core';
import {Board} from "../../model/board";
import {GameService} from "../../service/game.service";
import {EnumCellType} from "../../model/enum-cell-type.enum";
import {Coords} from "../../model/coords";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input() board: Board;

  EnumCellType: typeof EnumCellType = EnumCellType;

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
  }

  onPrepSalvo(coords: Coords) {
    this.gameService.prepSalvo(coords);
  }

}
