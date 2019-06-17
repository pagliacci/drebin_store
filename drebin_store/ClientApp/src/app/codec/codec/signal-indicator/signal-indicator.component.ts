import { Component, OnDestroy, AfterViewInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, DoCheck } from '@angular/core';
import { IndicatorBar } from './indicator-bar';

@Component({
    selector: 'app-signal-indicator',
    templateUrl: './signal-indicator.component.html',
    styleUrls: ['./signal-indicator.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignalIndicatorComponent implements AfterViewInit, OnDestroy {

    @Input()
    frequency: string;

    interval: number;

    bars: IndicatorBar[] = [
        new IndicatorBar(100),
        new IndicatorBar(61),
        new IndicatorBar(38),
        new IndicatorBar(24),
        new IndicatorBar(20),
        new IndicatorBar(18),
        new IndicatorBar(15),
        new IndicatorBar(13),
        new IndicatorBar(12),
    ];

    constructor(private changeDetector: ChangeDetectorRef) {}

    async ngAfterViewInit() {
        await this.highlightBars(7);
        await this.highlightBars(6);
        this.interval = window.setInterval(async () => {
            const nextValue = this.getRandomInt(6, 9);
            const timeout = this.getRandomInt(10, 100);
            await this.highlightBars(nextValue, timeout);
        }, 500);
    }

    highlightBars(numberOfBars: number, timeout: number = 50) {
        return new Promise<void>((resolve, reject) => {
            const interval = window.setInterval(() => {
                const numberOfHighlighted = this.bars.filter(b => b.isHighlighted).length;
                if (numberOfBars < numberOfHighlighted && numberOfHighlighted > 0) {
                    this.bars[this.bars.length - numberOfHighlighted].isHighlighted = false;
                    return;
                }
                if (numberOfBars > numberOfHighlighted) {
                    this.bars[this.bars.length - numberOfHighlighted - 1].isHighlighted = true;
                    return;
                }
                if (numberOfBars === numberOfHighlighted) {
                    clearInterval(interval);
                    resolve();
                }
                this.changeDetector.markForCheck();
            }, timeout);
        });
    }

    ngOnDestroy() {
        clearInterval(this.interval);
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
