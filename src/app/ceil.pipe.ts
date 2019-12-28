import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ceil'
})
export class CeilPipe implements PipeTransform {

  transform(value: any, args?: any): any {
  //  console.log(value);
    return Math.ceil(value);
  }

}
