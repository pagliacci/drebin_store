import { MainQuestStage } from 'src/app/models/main-quest-stage';

export class QuestStage {
    constructor(
        readonly stage: MainQuestStage,
        readonly title: string,
        readonly isAvailable: boolean,
        readonly isCurrentStage: boolean) { }
}
