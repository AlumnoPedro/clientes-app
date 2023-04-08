import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent {
  public cliente: Cliente = new Cliente();
  public titulo: string = "Crear cliente";

  constructor(private clienteService: ClienteService, private router: Router){
   
  }

  public create(): void {
    this.clienteService.create(this.cliente)
    .subscribe(cliente => {
      this.router.navigate(['/clientes'])
      swal.fire('Nuevo Cliente', `Cliente ${cliente.nombre} creado con exito`, 'success')
    }
    )
  }

}
