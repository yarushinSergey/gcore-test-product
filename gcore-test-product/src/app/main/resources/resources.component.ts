import { Component, OnInit } from '@angular/core';
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
  public quote;

  constructor(private route: ActivatedRoute,
              private gcoreSharedLibraryService: GcoreSharedLibraryService,
              private _http: HttpClient) {
    this.gcoreSharedLibraryService.addStatus("ResourcesComponentInitilized");
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.gcoreSharedLibraryService.addStatus("ResourcesComponentRouteResolved");
      this.sectionTitle = data?.section;
      const httpClientIsTheSame: boolean = (this._http === this.gcoreSharedLibraryService.getHttpClient());
      this.gcoreSharedLibraryService.addStatus("HttpClientIsTheSame:" + httpClientIsTheSame);
    });

    this._http.get("https://favqs.com/api/qotd").subscribe({
      next: (response:any) => {
        this.quote = response?.quote;
        this.gcoreSharedLibraryService.addStatus("QuoteWasReceived");
      },
      error: (errMsg:any)=>{
        console.error(errMsg);
      }
    });
  }
}
