import { Directive, inject } from "@angular/core";
import { GenericDestroy } from "./destroy.generic";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

@Directive()
export class GenericPage extends GenericDestroy {
  protected readonly dialog = inject(MatDialog);
  protected dialogConfig = new MatDialogConfig();
  protected columns: string[] = [];

  constructor() {
    super();
    this.dialogConfig = { height: '405px', width: '400px' };
  }
}