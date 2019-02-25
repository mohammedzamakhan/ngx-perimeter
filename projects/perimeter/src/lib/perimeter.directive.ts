import { Directive, ElementRef, Input, Output, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { PerimeterService } from './perimeter.service';

const mousemove: Observable<any> = fromEvent(window, 'mousemove');
const resize: Observable<any> = fromEvent(window, 'resize');

@Directive({
  selector: '[ngxPerimeter]'
})
export class PerimeterDirective implements AfterViewInit, OnDestroy {
  @Input() padding: string | number;
  @Input() once = false;
  @Output() breach = new EventEmitter();
  breached = false;

  mouseMoveSubscription: Subscription;
  resizeSubscription: Subscription;

  private bounds: any;
  private initialOffset: number;

  constructor(private el: ElementRef, private ps: PerimeterService) { }

  ngAfterViewInit() {
    this.bounds = this.el.nativeElement.getBoundingClientRect();
    this.initialOffset = window.pageYOffset;

    this.mouseMoveSubscription = mousemove.subscribe(({ clientX, clientY }) => {
      const { initialOffset, bounds, breach, once } = this;
      if (!bounds) {
        return;
      }
      const offsetY = window.pageYOffset - initialOffset;
      const { top, right, bottom, left } = bounds;
      if (typeof this.padding === 'string') {
        this.padding = parseInt(this.padding, 10);
      } else if (!this.padding && this.ps.padding) {
        this.padding = this.ps.padding;
      }

      if (
        // Cursor is not too far left
        clientX > (left - this.padding) &&
        // Cursor is not too far right
        clientX < (right + this.padding) &&
        // Cursor is not too far up
        clientY > ((top - offsetY) - this.padding) &&
        // Cursor is not too far down
        clientY < ((bottom - offsetY) + this.padding)
      ) {

        if (this.breached) {
          return;
        }

        breach.emit();
        if (this.ps.breach) {
          this.ps.breach();
        }
        this.breached = true;

        if (once) {
          this.mouseMoveSubscription.unsubscribe();
          this.resizeSubscription.unsubscribe();
        }

      } else {
        this.breached = false;
      }

    });

    this.resizeSubscription = resize.subscribe(() => {
      if (this.el.nativeElement) {
        this.initialOffset = window.pageYOffset;
        this.bounds = this.el.nativeElement.getBoundingClientRect();
      }
    });
  }

  ngOnDestroy() {
    if (this.mouseMoveSubscription) {
      this.mouseMoveSubscription.unsubscribe();
      this.resizeSubscription.unsubscribe();
    }
  }
}
