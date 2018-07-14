import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogConfirmCancelModel } from '../../models/DialogConfirmCancelModel';

@Component({
    selector: 'iam-dialog-confirm-cancel',
    templateUrl: './dialog-confirm-cancel.component.html',
    styleUrls: ['./dialog-confirm-cancel.component.css']
})
export class DialogConfirmCancelComponent implements OnInit
{
    title: string; line1: string; line2: string;

    constructor(
        private dialogRef: MatDialogRef<DialogConfirmCancelComponent>,
        @Inject(MAT_DIALOG_DATA) { title, line1, line2 }: DialogConfirmCancelModel)
    {
        this.title = title;
        this.line1 = line1;
        this.line2 = line2;
    }

    ngOnInit()
    {
    }

    confirm()
    {
        this.dialogRef.close(true);
    }

    close()
    {
        this.dialogRef.close(false);
    }
}
