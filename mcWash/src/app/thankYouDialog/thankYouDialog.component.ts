import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-thank-you-dialog',
  standalone: true,
  imports: [
    CommonModule, MatButtonModule, MatDialogModule
  ],
  template: ` <h1 mat-dialog-title>Merci !</h1>
  <div mat-dialog-content>
    <p>Votre paiement a été traité avec succès.</p>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="close()">Fermer</button>
  </div>`,
  styleUrl: './thankYouDialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThankYouDialogComponent { 
  constructor(private dialogRef: MatDialogRef<ThankYouDialogComponent>) {}

  close() {
    this.dialogRef.close();
  }
}
