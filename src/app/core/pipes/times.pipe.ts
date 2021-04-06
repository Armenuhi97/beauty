import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'myTime'
})
export class MyTimePipe implements PipeTransform {
    transform(value: number): string {
        if (value > 0 && value / 60 < 1) {
            return value + ' Minutes';

        } else {
            let hours = Math.floor(value / 60);
            let minutes = Math.floor(value % 60);
            return hours + ' hrs ' + minutes + ' mins';
        }
    }
}