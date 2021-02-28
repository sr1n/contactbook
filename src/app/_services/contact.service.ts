import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  toggle:boolean=true;
  sortedData:any;
  constructor(private http:HttpClient) { }

   toggleService()
   {
     this.toggle=!this.toggle
     //return this.toggle;
   }

   getSorted()
   {
     
   }
   getContacts(pageno):Observable<any>
   {
     return this.http.get('https://reqres.in/api/users?page='+pageno)
   }

}
