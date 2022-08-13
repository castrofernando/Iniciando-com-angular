import { Component, OnInit } from '@angular/core';
import { Moment } from 'src/app/Moment';
import { MomentService } from 'src/app/services/moment.service';
import { Response } from 'src/app/Response';
import { MessagesService } from 'src/app/services/messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent implements OnInit {

  btnText:string = 'Compartilhar!';
  constructor(private momentService: MomentService,
              private messagesServices: MessagesService,
              private router:Router) { }

  ngOnInit(): void {
  }

  async createHandler(moment:Moment ){
    console.log(event);
    const formData = new FormData();
    formData.append('title',moment.title);
    formData.append('description', moment.description);
    if(moment.image){
      formData.append('image',moment.image);
    }

    //todo

    let data:string = '';
    //enviar para o service
    await this.momentService.createMoment(formData).subscribe();

    //exibir mensagem
    this.messagesServices.add("Salvo com sucesso!");
    //redirect
    this.router.navigate(['/']);
  }
}
