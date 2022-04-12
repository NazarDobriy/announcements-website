import { Pipe, PipeTransform } from '@angular/core';
import { IAnnouncement } from '../models/announcement.interface';

@Pipe({
  name: 'searchfilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: IAnnouncement[], searchTitle: string): IAnnouncement[] {
    if (!value || !searchTitle) {
      return value;
    }
    return value.filter((data: IAnnouncement) => {
      return data.title.toLocaleLowerCase().includes(searchTitle.toLocaleLowerCase());
    });
  }

}