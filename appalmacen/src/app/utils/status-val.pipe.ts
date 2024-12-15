import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusVal'
})
export class StatusValPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value ? "Activo" : "Inactivo";
  }

}
