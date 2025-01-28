import { Pipe, PipeTransform } from '@angular/core';
import { ItemStatusEnum, ItemStatusNamespace } from '../models/item-status.enum';

@Pipe({
  name: 'itemStatusToClass'
})
export class ItemStatusToClassPipe implements PipeTransform {

  transform(status: ItemStatusEnum): string {
    return ItemStatusNamespace.mapStatusToClass(status);
  }

}
