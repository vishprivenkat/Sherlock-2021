import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceNewLines'
})
export class ReplaceNewLinesPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/\n/g, '<br>');
  }

}
