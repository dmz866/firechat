import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit
{
  mensaje = "";

  constructor() { }

  enviarMensaje()
  {
    console.log(this.mensaje);
  }

  ngOnInit() {
  }

}
