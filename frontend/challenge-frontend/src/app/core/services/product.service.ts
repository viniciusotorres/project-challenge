import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getProducts(page: number = 0, size: number = 10): Observable<any> {
    return this.http.get<any>(`${this.url}/products?page=${page}&size=${size}`);
  }
}
