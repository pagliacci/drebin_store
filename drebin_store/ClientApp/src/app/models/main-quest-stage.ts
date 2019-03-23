export enum MainQuestStage {
    Stage1,
    Stage2,
    Stage3
}

export const MainQuestStageMap: Map<MainQuestStage, string> = new Map(
    [
        [MainQuestStage.Stage1, 'Chapter 1'],
        [MainQuestStage.Stage2, 'Chapter 2'],
        [MainQuestStage.Stage3, 'Chapter 3']
    ]
);
