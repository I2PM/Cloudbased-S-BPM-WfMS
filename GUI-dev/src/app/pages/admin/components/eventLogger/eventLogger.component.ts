import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import {ProcessesService} from '../../../../allProcesses.service';
import { EventLoggerService} from '../../../../evntLogger.service';

@Component({
  selector: 'ngx-event-logger',
  styleUrls: [],
  templateUrl: './eventLogger.html',
})
export class EventLoggerComponent implements OnInit {
   processModels = [];
   error = undefined;
   selectedProcessModel = {subjectModels: undefined};
   selectedSubject = undefined;
   loadedEventLogForProcessModel = undefined;
   loadedEventLogForSubject = undefined;
   eventLog = [];

  constructor(protected processService: ProcessesService, protected eventLoggerService: EventLoggerService) { }

  ngOnInit(): void {
    const that = this;
    this.processService.getProcessModels()
      .subscribe(
         data => {
            that.processModels = JSON.parse(data['_body']);
         },
         err => that.error = err,
       );
  }

  getEventLog(processModel, subject): void {
    const that = this;
    this.eventLoggerService.getEventLog(processModel.pmId, subject.name)
      .subscribe(
         data => {
           that.loadedEventLogForProcessModel = processModel;
           that.loadedEventLogForSubject = subject.name;
           const result = JSON.parse(data['_body']);
           if ( result.length === 0 ) {
             that.error = 'Für dieses Prozessmodell gibt es keinen (vollständigen) Event-Log!';
           } else {
             that.eventLog = result;
           }
         },
         err => {
           that.error = err;
           that.loadedEventLogForProcessModel = undefined;
           that.loadedEventLogForSubject = undefined;
           that.eventLog = [];
         },
       );
  }

  downloadEventLog(processModel, subject) {
    window.open(this.eventLoggerService.getEventLogDownloadLink(processModel.pmId, subject.name));
  }
}
