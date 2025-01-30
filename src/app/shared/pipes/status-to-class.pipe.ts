import { Pipe, PipeTransform } from '@angular/core';
import { StatusEnum, StatusNamespace } from '../enums/status.enum';

@Pipe({
  name: 'statusToClass'
})
export class StatusToClassPipe implements PipeTransform {

  transform(status: StatusEnum): string {
    return StatusNamespace.mapStatusToClass(status);
  }

}
