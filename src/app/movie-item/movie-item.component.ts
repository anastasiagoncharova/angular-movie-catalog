import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ConfigService } from './../config.service';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss']
})
export class MovieItemComponent implements OnInit {
  @Input() movieItem;
  @Output() public deleteMovie = new EventEmitter();
  @Output() public selectColor = new EventEmitter();
  @ViewChild('movie') public movie: ElementRef;
  public selectedColor: string;
  constructor(private configService: ConfigService) { }

  public ngOnInit() {
    this.configService.getColor().subscribe(color => {
      this.movie.nativeElement.style.backgroundColor = this.movieItem.color ? this.movieItem.color : color;
    });
    this.movie.nativeElement.style.backgroundColor = this.movieItem.color ? this.movieItem.color : localStorage.getItem('masterColor');
  }

  /**
   * Delete button click handler
   * @param id id of item to be removed
   */
  public onItemRemove(id) {
    this.deleteMovie.emit(id);
  }

  /**
   * Set selected color
   * @param colorPicker input element with color value
   */
  public setColor(colorPicker) {
    this.movieItem.color = colorPicker.value;
    this.movie.nativeElement.style.backgroundColor = this.movieItem.color;
    this.selectColor.emit();
  }
}
