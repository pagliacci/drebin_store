export enum MainQuestStage {
    Act1,
    Act2,
    Act3,
    Act4,
    Act5
}

export const MainQuestStageMap: Map<MainQuestStage, string> = new Map(
    [
        [MainQuestStage.Act1, 'Act 1'],
        [MainQuestStage.Act2, 'Act 2'],
        [MainQuestStage.Act3, 'Act 3'],
        [MainQuestStage.Act4, 'Act 4'],
        [MainQuestStage.Act5, 'Act 5']
    ]
);
