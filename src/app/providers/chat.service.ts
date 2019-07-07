import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { Mensaje } from '../interfaces/mensaje.interface';
import { map } from "rxjs/operators";
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService
{
  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats = [];
  public usuario: any = {};

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth)
  {
    this.afAuth.authState.subscribe(user =>
      {
        console.log(user);
        if(!user)
        {
          return;
        }

        this.usuario.nombre = user.displayName;
        this.usuario.uid = user.uid;
      });
  }

  login(proveedor: string)
  {
    this.afAuth.auth.signInWithPopup((proveedor === 'google') ? new auth.GoogleAuthProvider() :
                                                                new auth.TwitterAuthProvider());
  }

  logout()
  {
    this.usuario = {};
    this.afAuth.auth.signOut();
  }

  cargarMensajes()
  {
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc').limit(5));
    return this.itemsCollection.valueChanges().pipe(map
      ( (mensajes: Mensaje[]) =>
      {
        this.chats = [];
        for(let mensaje of mensajes)
        {
          this.chats.unshift(mensaje);
        }
      }));
  }

  agregarMensaje(texto: string)
  {
    const mensaje: Mensaje =
    {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    };

    return this.itemsCollection.add(mensaje);
  }
}
