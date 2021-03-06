import {Component, Input, OnInit} from '@angular/core';
import {Board} from "../../model/board";
import {GameService} from "../../service/game.service";
import {EnumCellType} from "../../model/enum-cell-type.enum";
import {Coords} from "../../model/coords";
import {Cell} from "../../model/cell";
import {SalvoService} from "../../service/salvo.service";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input() board: Board;
  @Input() disabled: boolean;

  EnumCellType: typeof EnumCellType = EnumCellType;

  constructor(private salvoService: SalvoService) {
  }

  ngOnInit() {
  }

  onPrepSalvo(cell: Cell) {
    if (this.disabled) {
      return false;
    }
    return this.salvoService.prepSalvo(cell);
  }

}
