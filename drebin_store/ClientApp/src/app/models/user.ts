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
    hasNotificationSubscription: boolean;
    get isAdmin() {
        return this.canManageUsers || this.canManageOrders || this.canManageProducts;
    }

    constructor(user?: User) {
        if (user != null) {
            this.id = user.id;
            this.username = user.username;
            this.password = user.password;
            this.mainQuestStage = user.mainQuestStage;
            this.drebinPoints = user.drebinPoints;
            this.token = user.token;
            this.canManageUsers = user.canManageUsers;
            this.canManageOrders = user.canManageOrders;
            this.canManageProducts = user.canManageProducts;
            this.hasNotificationSubscription = user.hasNotificationSubscription;
        }
    }
}
