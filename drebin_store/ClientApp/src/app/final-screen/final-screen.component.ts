import { Component } from '@angular/core';
import { FinalScreenModel } from './models/final-screen.model';

@Component({
    selector: 'app-final-screen',
    templateUrl: './final-screen.component.html',
    styleUrls: ['./final-screen.component.less']
})
export class FinalScreenComponent {
    results: FinalScreenModel;
}
