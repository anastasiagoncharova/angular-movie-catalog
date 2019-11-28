import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddMovieDialogComponent } from './add-movie-dialog/add-movie-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MovieItemComponent } from './movie-item/movie-item.component';

@NgModule({
  declarations: [
    AppComponent,
    AddMovieDialogComponent,
    MovieItemComponent
  ],
  imports: [
    BrowserModule,
    ConfirmDialogModule,
    ButtonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
