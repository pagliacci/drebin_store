import { MainQuestStage } from './main-quest-stage';
import { VkUser } from './vk-user';

export class User {
    id: number;
    username: string;
    password?: string;
    mainQuestStage: MainQuestStage;
    numberOfQuestInCurrentAct: number;
    vkId: string;
    drebinPoints: number;
    token: string;
    canManageUsers: boolean;
    canManageOrders: boolean;
    canManageProducts: boolean;
    canManagePermissions: boolean;
    hasNotificationSubscription: boolean;
    briefingPassed: boolean;
    vkData: VkUser;

    get isAdmin() {
        return this.canManageUsers || this.canManageOrders || this.canManageProducts;
    }

    constructor(user?: User) {
        if (user != null) {
            this.id = user.id;
            this.username = user.username;
            this.password = user.password;
            this.mainQuestStage = user.mainQuestStage;
            this.numberOfQuestInCurrentAct = user.numberOfQuestInCurrentAct;
            this.vkId = user.vkId;
            this.drebinPoints = user.drebinPoints;
            this.token = user.token;
            this.canManageUsers = user.canManageUsers;
            this.canManageOrders = user.canManageOrders;
            this.canManageProducts = user.canManageProducts;
            this.hasNotificationSubscription = user.hasNotificationSubscription;
            this.briefingPassed = user.briefingPassed;
            this.vkData = user.vkData;
        }
    }
}
