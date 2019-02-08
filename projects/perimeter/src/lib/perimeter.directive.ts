import { Directive, ElementRef, Input, Output, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Directive({
  selector: '[ngxPerimeter]'
})
export class PerimeterDirective implements AfterViewInit, OnDestroy {
  @Input() padding: string | number;
  @Input() once = false;
  @Output() breach = new EventEmitter();
  breached = false;
  mousemove: Observable<any>;
  resize: Observable<any>;

  mouseMoveSubscription: Subscription;
  resizeSubscription: Subscription;

  bounds;
  initialOffset;

  constructor(private el: ElementRef) {
    this.mousemove = fromEvent(window, 'mousemove');
    this.resize = fromEvent(window, 'resize');
  }

  ngAfterViewInit() {
    this.bounds = this.el.nativeElement.getBoundingClientRect();
    this.initialOffset = window.pageYOffset;

    this.mouseMoveSubscription = this.mousemove.subscribe(({ clientX, clientY }) => {
      const { initialOffset, bounds, breach, once } = this;
      if (!bounds) {
        return;
      }
      const offsetY = window.pageYOffset - initialOffset;
      const { top, right, bottom, left } = bounds;
      if (typeof this.padding === 'string') {
        this.padding = parseInt(this.padding, 10);
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
        this.breached = true;

        if (once) {
          this.mouseMoveSubscription.unsubscribe();
          this.resizeSubscription.unsubscribe();
        }

      } else {
        this.breached = false;
      }

    });

    this.resizeSubscription = this.resize.subscribe(() => {
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
