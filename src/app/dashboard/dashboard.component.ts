import { Component, OnInit } from '@angular/core';
import { ContactService } from '../_services/contact.service';
import { PagerService } from '../_services/pager.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  sortFlag: boolean = false;
  contactsArray: any[] = [];
  contactsObj: any[] = [];
  allItems: any[] = [];
  pager: any = {};
  pagedItems: any[];
  resObj: any;
  searchText: any;

  constructor(public _service: ContactService, public pagerService: PagerService) { }

  ngOnInit(): void {

    this.loadData(1);  //For initial load 
  }

  loadData(pageno) {   //To load the data
    this._service.getContacts(pageno).subscribe(res => {
      this.contactsObj = res.data;
      this.resObj = res;
      this.pager = this.pagerService.getPager(this.resObj.total, pageno, this.resObj.per_page);
    })
  }

  toggle() {
    this._service.toggleService();   //Toggling to display in list and grid view
  }

  setPage(page: number) {    //Sorting based on name and email
    if (page < 1 || page > this.resObj.total_pages) {
      return;
    }
    this.pager = this.pagerService.getPager(this.resObj.total, page, this.resObj.per_page);
    this.loadData(page);

  }


  

  sortFun(type) {  //sorting based on name and email
    this.sortFlag=true;
    if (type === "email") {
      this.contactsObj.sort((a, b) => a.email.localeCompare(b.email))

      this.contactsArray = this.contactsObj;
    }
    else if (type === "name") {
      this.contactsObj.sort((a, b) => a.first_name.localeCompare(b.first_name))
      this.contactsArray = this.contactsObj
    }
  }



}
