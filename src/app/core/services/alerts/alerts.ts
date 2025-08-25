import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'; 

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  success(message: string, title: string = 'Éxito'): void {
  Swal.fire({
    title: title,
    text: message,
    imageUrl: 'assets/succesfull_logo.png',
    imageWidth:162,
    imageHeight: 150,
    showConfirmButton: false,
    background: '#fff',
    color: '#333',
    customClass: {
      popup: 'successful-popup',
      title: 'successful-titulo',
      confirmButton: 'successful-confirmar',
      htmlContainer: 'successful-contenido'
    }
  });
}
  error(message: string, title: string = 'Error'): void {
    Swal.fire({
       title: title,
    text: message,
    imageUrl: 'assets/error_logo.png',
    imageWidth: 155,
    imageHeight: 150,
    showConfirmButton: false,
    background: '#fff',
    color: '#333',
    customClass: {
      popup: 'successful-popup',
      title: 'successful-titulo',
      confirmButton: 'successful-confirmar',
      htmlContainer: 'successful-contenido'
    }
    });
  }

  warning(message: string, title: string = 'Advertencia'): void {
    Swal.fire({
      icon: 'warning',
      title,
      text: message
    });
  }

  info(message: string, title: string = 'Información'): void {
    Swal.fire({
      icon: 'info',
      title,
      text: message
    });
  }
}