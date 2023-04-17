import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit{

  cliente: Cliente;
  titulo: string = "Detalle del cliente";
  public fotoSeleccionada: File; 

  constructor(private clienteService: ClienteService, private activatedRoute: ActivatedRoute){}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      //El signo + es para convertir el parametro de la ruta en un tipo number
      let id: number = +params.get('id');
      
      if(id){
        this.clienteService.getCliente(id).subscribe( cliente => {
          this.cliente = cliente;
        });
      }
    });
  }

  seleccionarFoto(event){
    this.fotoSeleccionada = event.target.files[0];
    console.log(this.fotoSeleccionada);
    if(this.fotoSeleccionada.type.indexOf('image')<0){
      swal.fire('Error seleccionar imagen: ', 'El archivo debe ser una imagen', 'error');
      this.fotoSeleccionada = null;
    }
  }

  subirFoto(){
    if(!this.fotoSeleccionada){
      swal.fire('Error Upload: ', 'Debe seleccionar una foto', 'error');
    } else {
    this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id).subscribe(cliente => {
      this.cliente = cliente;
      swal.fire('La foto se ha subido completamente!', `La foto se ha subido con exito: ${this.cliente.foto}`, 'success');
    });
  }
}
}
