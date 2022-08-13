import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Moment } from 'src/app/Moment';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css']
})
export class MomentFormComponent implements OnInit {

  @Input() btnText!: string;
  @Output() onSubmit = new EventEmitter<Moment>();
  @Input() momentData:Moment | null = null;

  filePath:string = '';
  imageRender: any;

  momentForm!:FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.momentForm = new FormGroup({
      id: new FormControl(this.momentData ? this.momentData.id : ''),
      title: new FormControl(this.momentData ? this.momentData.title : '',[Validators.required]),
      description: new FormControl(this.momentData ? this.momentData.description : '',[Validators.required]),
      image: new FormControl(this.momentData ? this.momentData.image : ''),
    });

  }


  get title(){
    return this.momentForm.get('title')!;
  }

  get description(){
    return this.momentForm.get('description')!;
  }

  handleInputChange(event:any){
    //atualiza componente
    const input = document.querySelector('#input-file') as HTMLInputElement;
    this.filePath = input.value;

    const file: File = event.target.files[0];
    this.momentForm.patchValue({image : file});

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageRender = reader.result;

      reader.readAsDataURL(file);
   }
  }

  submit(){
    if(this.momentForm.invalid){
      return;
    }
    console.log(this.momentForm.value);
    this.onSubmit.emit(this.momentForm.value);


  }

}
