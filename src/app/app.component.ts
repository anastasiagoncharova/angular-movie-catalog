import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ConfigService } from './config.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('overlayAnimation', [
        state('void', style({
            transform: 'translateY(5%)',
            opacity: 0
        })),
        state('visible', style({
            transform: 'translateY(0)',
            opacity: 1
        })),
        transition('void => visible', animate('{{showTransitionParams}}')),
        transition('visible => void', animate('{{hideTransitionParams}}'))
    ])
],
})

export class AppComponent implements OnInit {
  constructor(public confirmationService: ConfirmationService, private configService: ConfigService) { }
  @ViewChild('masterContainer') public masterContainer: ElementRef;
  public isModalShown = false;
  public buttonIsDisabled = false;
  public moviesList = [];
  public defaultColor = 'fff';
  public masterColor: string;
  public ngOnInit() {
    if (localStorage.getItem('moviesList')) {
      this.moviesList = JSON.parse(localStorage.getItem('moviesList'));
    }
    if (localStorage.getItem('masterColor')) {
      this.masterContainer.nativeElement.style.backgroundColor = localStorage.getItem('masterColor');
    } else {
      localStorage.setItem('masterColor', this.defaultColor);
    }
  }

  /**
   * Add item to list
   * @param data new item object
   */
  public addMovieToList(data) {
    this.isModalShown = false;
    this.moviesList.push({...data});
    localStorage.setItem('moviesList', JSON.stringify(this.moviesList));
  }

  /**
   * Delete item from list
   * @param id id of item to be removed
   */
  public onMovieDelete(id) {
    this.moviesList = this.moviesList.filter(item => item.id !== id);
    localStorage.setItem('moviesList', JSON.stringify(this.moviesList));
  }

  /**
   * Set selected master color
   * @param colorPicker input element with color value
   */
  public setMasterColor(colorPicker) {
    this.masterColor = colorPicker.value;
    this.masterContainer.nativeElement.style.backgroundColor = this.masterColor;
    this.configService.setColor(this.masterColor);
    localStorage.setItem('masterColor', this.masterColor);
  }

  /**
   * Save colors to localStorage
   */
  public onSelectColor() {
    localStorage.setItem('moviesList', JSON.stringify(this.moviesList));
  }
}
