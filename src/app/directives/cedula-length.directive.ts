import { Directive, HostListener, Input, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCedulaLength]'
})
export class CedulaLengthDirective {

  @Input('appCedulaLength') maxLength!: number; // Recibe el límite de dígitos

  constructor(@Self() private ngControl: NgControl) {} // Inyecta el control del formulario

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Limita la cantidad de dígitos
    if (value.length > this.maxLength) {
      const newValue = value.slice(0, this.maxLength); // Recorta el valor
      input.value = newValue; // Actualiza el valor en el input
      this.ngControl.control?.setValue(newValue); // Actualiza el valor en el formulario reactivo
      event.preventDefault(); // Evita que se ingrese más de lo permitido
    }
  }
}