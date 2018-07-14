import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialogConfig, MatDialog } from '@angular/material';

import { DialogConfirmCancelComponent } from '../dialog-confirm-cancel/dialog-confirm-cancel.component';
import { IdentityResponse } from '../../models/identity-response';
import { IdentityTableComponent } from '../identity-table/identity-table.component';
import { IdentityService } from '../../services/identity.service';
import { NotifyService } from '../../services/notify.service';

@Component({
    selector: 'iam-identity-list',
    templateUrl: './identity-list.component.html',
    styleUrls: ['./identity-list.component.css'],
    providers: [IdentityService, NotifyService]
})
export class IdentityListComponent implements OnInit
{
    @ViewChild(IdentityTableComponent) idTable: IdentityTableComponent;

    searchValue = '';
    emptyRow: IdentityResponse = { "uid": -1, "name": "", "email": "" };
    selectedRow: IdentityResponse = this.emptyRow;
    identities;

    constructor(
        private titleService: Title,
        private dialog: MatDialog,
        private notify: NotifyService,
        private dataService: IdentityService
    ) { }

    ngOnInit()
    {
        this.titleService.setTitle('Identity list');
    }

    eventSelectRow(row)
    {
        this.selectedRow = row;
    }

    deleteIdentity()
    {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        dialogConfig.data = {
            title: 'Confirm to delete', line1: this.selectedRow.name, line2: this.selectedRow.email
        };

        const dialogRef = this.dialog.open(DialogConfirmCancelComponent,
            dialogConfig);

        dialogRef.afterClosed().subscribe(
            choice =>
            {
                if (!choice) { return; }
                this.dataService
                    .delete(this.selectedRow.uid)
                    .catch(resp =>
                    {
                        console.log('deleteIdentity catch', resp);
                        this.notify.error("Delete identity error. Please try again!");
                    })
                    .then(resp =>
                    {
                        if (resp['hasError']) {
                            this.notify.error('Server\'s message : ' + resp['errorMessage']);
                            return;
                        }
                        this.notify.success(`Identity "${this.selectedRow.name}" was deleted`);
                        this.selectedRow = this.emptyRow;
                        this.idTable.getIdentities(this.searchValue.trim());
                    });
            }
        );
    }

    searchIdentity()
    {
        this.idTable.getIdentities(this.searchValue.trim());
    }

}
