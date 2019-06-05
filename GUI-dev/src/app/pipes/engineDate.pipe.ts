import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'engineDate'})
export class EngineDatePipe implements PipeTransform {
  transform(values: string, args: string[]): string {
    const regex = /^(\d*),(\d*),(\d*),(\d*),(\d*),(\d*)/;


    // In some cases, no seconds are delivered
    if (regex.exec(values)[6])
    {
      return regex.exec(values)[4] + ":" + regex.exec(values)[5] +  " "
        + regex.exec(values)[3] + "." + regex.exec(values)[2] + "." + regex.exec(values)[1];
    }
    // Former string was year, month, day, hour, minute, second
    return regex.exec(values)[4] + ":" + regex.exec(values)[5] + ":" + regex.exec(values)[6] + " "
      + regex.exec(values)[3] + "." + regex.exec(values)[2] + "." + regex.exec(values)[1];
  }
}
