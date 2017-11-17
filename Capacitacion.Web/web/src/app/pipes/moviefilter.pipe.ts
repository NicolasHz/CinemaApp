import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class MoviefilterPipe implements PipeTransform {
  transform(value: any = [] , filterString: string, propName: string ): any {

    if (filterString === '') {
      return value;
    }
    const resultArray = [];
    for (const item of value) {
      const regx = new RegExp(filterString, 'i');
      if (item[propName].match(regx) ) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
