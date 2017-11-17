import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})

export class DropdownDirective {
    @HostBinding('class.ocultar') isOpen = false;

    @HostListener('click') toggleOpen() {
        this.isOpen = !this.isOpen;
    }

}
@Directive({
    selector: '[appModalDropdown]'
})

export class DropdownModalDirective {
    @HostBinding('class.showModal') isOpen = false;

    @HostListener('click') toggleOpen() {
        this.isOpen = !this.isOpen;
    }

}

@Directive({
    selector: '[appHover]'
})

export class HoverDirective {
    @HostBinding('class.showEditDelete') isOpen = false;

    @HostListener('mouseenter') open() {
        this.isOpen = !this.isOpen;
    }
    @HostListener('mouseleave') close() {
        this.isOpen = !this.isOpen;
    }
}
