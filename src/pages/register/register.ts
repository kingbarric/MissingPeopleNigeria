import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {HomePage} from "../home/home";
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CrudService } from "../../services/CrudService";


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  private form : FormGroup;
  states;
  lgas;

  constructor(public nav: NavController,private formBuilder: FormBuilder, private crudService: CrudService) {
    this.form = new FormGroup({
      firstname: new FormControl('',[Validators.required]),
      othernames: new FormControl(['']),
      lastname: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      stateId: new FormControl('',[Validators.required]),
      lgaId: new FormControl('',[Validators.required]),
      address: new FormControl(''),
      nin: new FormControl('',[Validators.required]),
      dateOfBirth: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
    });
  }

  ionViewCanEnter(){
   this.findStates();
  }

  // register and go to home page
  register() {
   // this.nav.setRoot(HomePage);
   console.log(this.form.value)
   this.crudService.saveData('citizens/save',this.form.value,0)
   .subscribe((e:any)=>{
     
     console.log('data saved: ',e);
     if(e.code==0){
      this.crudService.toast(e.message);
      this.nav.setRoot(LoginPage);
    }else{
      this.crudService.toast(e.message);
    }
   })
  }

  // go to login page
  login() {
    this.nav.setRoot(LoginPage);
  }

  findStates(){
    this.crudService.getAll('states/all')
    .subscribe((e:any)=>{
this.states = e;


    })
  }

  changeLga(event:any,data){
   // console.log('events: ',data);
    this.lgas = data.nigeriaStateLgaList;
  }
}
