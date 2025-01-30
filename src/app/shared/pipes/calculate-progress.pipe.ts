import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculateProgress'
})
export class CalculateProgressPipe implements PipeTransform {

  transform(initialBudget: number, remainingBudget: number): number {
    if (initialBudget <= 0) {
      return 100;
    }

    const progress = (remainingBudget / initialBudget) * 100;

    return Math.min(100, Math.max(0, progress));
  }

}
