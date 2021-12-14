import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {GcoreSharedLibraryService} from 'gcore-shared-library';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  public sectionTitle = "";
  public infoFromShell = "";
  public fact;

  constructor(private route: ActivatedRoute,
              private gcoreSharedLibraryService: GcoreSharedLibraryService,
              private _http: HttpClient) {
    this.gcoreSharedLibraryService.addStatus("ResourcesComponentInitilized");
  }
  @ViewChild('messageText') messageText!: ElementRef;

  ngOnInit(): void {
    this.gcoreSharedLibraryService.shellButtonClicked.subscribe((info:string)=>{
      this.infoFromShell += ` ${info}`;
    });

    this.route.data.subscribe((data) => {
      this.gcoreSharedLibraryService.addStatus("ResourcesComponentRouteResolved");
      this.sectionTitle = data?.section;
      const httpClientIsTheSame: boolean = (this._http === this.gcoreSharedLibraryService.getHttpClient());
      this.gcoreSharedLibraryService.addStatus("HttpClientIsTheSame:" + httpClientIsTheSame);
    });

    this._http.get("https://asli-fun-fact-api.herokuapp.com/").subscribe({
      next: (response:any) => {
        this.fact = response?.data;
        this.gcoreSharedLibraryService.addStatus("QuoteWasReceived");
      },
      error: (errMsg:any)=>{
        console.error(errMsg);
      }
    });
  }

  public sendText(){
    const message:string = this.messageText.nativeElement.value;
    this.gcoreSharedLibraryService.incomingMessageSent.next(message);
  }
}
