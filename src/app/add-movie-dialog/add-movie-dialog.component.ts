import { Component, ElementRef, Input, NgZone, OnInit, Renderer2, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import uuid from 'uuid';

@Component({
  selector: 'app-add-movie-dialog',
  templateUrl: './add-movie-dialog.component.html',
  styleUrls: ['./add-movie-dialog.component.scss'],
  animations: [
    trigger('animation', [
      state('void', style({
        transform: 'translate3d(0, 25%, 0) scale(0.9)',
        opacity: 0
      })),
      state('visible', style({
        transform: 'none',
        opacity: 1
      })),
      transition('* => *', animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)'))
    ])
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [ConfirmationService]
})
export class AddMovieDialogComponent extends ConfirmDialog implements OnInit {

  constructor(private formBuilder: FormBuilder,
    el: ElementRef, renderer: Renderer2,
    confirmationService: ConfirmationService,
    zone: NgZone) {
    super(el, renderer, confirmationService, zone);
  }

  public addMovieForm: FormGroup;
  public header = 'Add movie';
  @Output() public movieAdd = new EventEmitter();
  @Output() public closeModal = new EventEmitter();
  @Input() rejectLabel = 'Cancel';

  public ngOnInit() {
    this.buildForm();
  }

  /**
   * Build form
   */
  private buildForm() {
    this.addMovieForm = this.formBuilder.group({
      movieName: [ '', [Validators.required] ],
      movieLink: [ '', [Validators.required, Validators.pattern(/(http|https):\/\/(?:.*\.|.*)imdb.com\/title(?:\?|\/)([a-z]{2}\d+)/i)]]
    });
  }

  /**
   * Submit form
   * @param value submitted item object
   */
  public onSubmit({ value }) {
    value.id = uuid.v4();
    this.movieAdd.emit(value);
  }

  /**
   * Close modal
   */
  public onClose() {
    this.closeModal.emit();
  }
}
