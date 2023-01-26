import {Component, ViewChild} from '@angular/core';
import {DataService} from "./services/data.service";
import {Company} from "./entities/Company";
import {AutoComplete} from "primeng/autocomplete";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app';

  constructor(private dataService: DataService) {
  }

  @ViewChild('autoCompleteForm')
  private pAutocomplete?: AutoComplete;

  company?: Company;

  error: string = '';

  websites: Company[] = [];

  search(event: any){
    if(event.query) {
      this.dataService.getData(event.query).subscribe(arrayOfObjects => {
        this.websites = arrayOfObjects
        this.error = '';
      }, error => {
        if(this.pAutocomplete){
          this.pAutocomplete.loading = false;
          this.pAutocomplete.inputEL.nativeElement.blur();
        }
        this.error = error.statusText;
        console.log('Http Error', error)
      })
    }
  }


  openList(){
    if(this.websites.length != 0){
      this.pAutocomplete?.show();
    }
  }
}
