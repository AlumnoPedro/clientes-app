import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint:string = "http://localhost:8080/api/clientes"; 
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router: Router) { }

  getClientes(page: number): Observable<any> {
    //return of(CLIENTES);
    return this.http.get(this.urlEndPoint + "/page/" + page).pipe(
      //Como la paginacion ya no trae los clientes en la raiz hay que cambiar el response a un tipo flexxible para
      //recuperar el content (la parte del json donde estan los clientes)
      tap((response:any) => {
        (response.content as Cliente[]).forEach( cliente => {
          console.log(cliente.nombre);
        }
        ) 
      }),
      map((response:any) => { 
        (response.content as Cliente[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          //cliente.createAt = formatDate(cliente.createAt,'EEEE dd, MMMM yyyy', 'es');
          return cliente;
        });
        return response;
      }
      ),
      tap(response => {
        (response.content as Cliente[]).forEach( cliente => {
          console.log(cliente.nombre);
        }
        ) 
      })
    );
  }

  create(cliente: Cliente) : Observable<any> {
    return this.http.post<any>(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {

        if(e.status==400){
          return throwError(() => e); 
        }

        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(() => e); 
      })
    )
  }

  getCliente(id: any): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(() => e); 
      })
    )
  }

  update(cliente: Cliente) : Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {

        if(e.status==400){
          return throwError(() => e); 
        }
        
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(() => e); 
      })
    )
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(() => e); 
      })

    )
  }

}
