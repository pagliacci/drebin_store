import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'dp'
})
export class DrebinPointsPipe implements PipeTransform {
    transform(value: number) {
        return `${value}DP`;
    }
}
