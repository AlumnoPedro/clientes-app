import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { Region } from './region';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  public cliente: Cliente = new Cliente();
  regiones: Region[];
  public titulo: string = "Crear cliente";
  public errores: string[];

  constructor(private clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.cargarCliente();
    this.clienteService.getRegiones().subscribe(regiones => this.regiones = regiones);
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente)
      }
    })
  }

  create(): void {
    this.clienteService.create(this.cliente)
      .subscribe({
        next: (json) => {
          this.router.navigate(['/clientes'])
          swal.fire('Nuevo Cliente', `${json.mensaje}: ${json.cliente.nombre}`, 'success')
        },
        error: (err) => {
          this.errores = err.error.errors as string[];
          console.error("Codigo de error: " + err.status);
          console.error(err.error.errors);
        },
      });
  }

  update(): void {
    this.clienteService.update(this.cliente)
      .subscribe({
        next: (json) => {
          this.router.navigate(['/clientes'])
          swal.fire('Cliente Actualizado', `${json.mensaje}: ${json.cliente.nombre}`, 'success')
        },
        error: (err) => {
          this.errores = err.error.errors as string[];
          console.error("Codigo de error: " + err.status);
          console.error(err.error.errors);
        },
      });
  }

}
