import { Component } from '@angular/core';
import { Cliente } from './cliente';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent {
  public cliente: Cliente = new Cliente();
  public titulo: string = "Crear cliente";

  public create(): void {
    console.log("Clicked");
    console.log(this.cliente);
  }

}
