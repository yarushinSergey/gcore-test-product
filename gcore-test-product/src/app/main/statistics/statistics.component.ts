import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {GcoreSharedLibraryService} from "gcore-shared-library";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  public sectionTitle = "";

  constructor(private route: ActivatedRoute,
              private gcoreSharedLibraryService: GcoreSharedLibraryService,) {
    this.gcoreSharedLibraryService.addStatus("StatisticsInitilized");
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.gcoreSharedLibraryService.addStatus("StatisticsRouteResolved");
      this.sectionTitle = data?.section;
    });
  }

  public get freeAPIs(): any[]{
    return this.gcoreSharedLibraryService.freeAPIs?.slice(0, 10);
  }
}
