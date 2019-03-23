import { MainQuestStage } from './main-quest-stage';

export class User {
    id: number;
    username: string;
    password?: string;
    mainQuestStage: MainQuestStage;
    drebinPoints: number;
    token: string;
    canManageUsers: boolean;
    canManageOrders: boolean;
    canManageProducts: boolean;
    get isAdmin() {
        return this.canManageUsers || this.canManageOrders || this.canManageProducts;
    }
}
