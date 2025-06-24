import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMaxLength]'
})
export class MaxLengthDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const maxLength = 10; // Define el número máximo de caracteres

    if (input.value.length > maxLength) {
      input.value = input.value.slice(0, maxLength);
      event.preventDefault(); // Evita que se escriban más caracteres
    }
  }
}