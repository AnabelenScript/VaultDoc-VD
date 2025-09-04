import { AfterViewInit, Directive, ElementRef } from "@angular/core";

@Directive({ selector: '[appAutoFocus]' })
export class AutoFocusInputDirective implements AfterViewInit {
    constructor(private el: ElementRef<HTMLInputElement>){}

    ngAfterViewInit(): void {
        this.el.nativeElement.focus()
    }
}