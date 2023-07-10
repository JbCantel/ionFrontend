
import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
public myReceita!: String;
  public env = environment;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {

    this.http.get(environment.apiURL + '/receita'  ).subscribe((response) => {
      console.log('Todos os artigos:', response);
    }, (error) => {
      console.error(error)
    })

  }

  buscar(){
    this.http.get(environment.apiURL + this.myReceita + '/json')
    .subscribe(response=> {console.log(response)})

}

}
