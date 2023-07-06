import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-receita',
  templateUrl: './receita.page.html',
  styleUrls: ['./receita.page.scss'],
})
export class ReceitaPage implements OnInit {
  public myReceita!: String;

  constructor(
    private http: HttpClient) { }

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
