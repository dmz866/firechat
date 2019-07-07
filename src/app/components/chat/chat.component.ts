import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit
{
  mensaje = "";
  elemento: any;

  constructor(public chatService: ChatService)
  {
    this.chatService.cargarMensajes().subscribe( () =>
    {
      setTimeout(() =>
      {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 20);
    });
  }

  enviarMensaje()
  {
    if(this.mensaje.length > 0)
    {
      this.chatService.agregarMensaje(this.mensaje)
      .then( () =>
      {
        this.mensaje = '';
        console.log('Mensaje enviado');
      })
      .catch( error =>
        {
          console.error('Error al enviar', error);
        });
    }
  }

  ngOnInit()
  {
    this.elemento = document.getElementById('app-mensajes');
  }

}
