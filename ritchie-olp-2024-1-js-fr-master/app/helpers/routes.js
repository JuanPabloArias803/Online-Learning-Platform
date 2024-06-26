import { LoginPage } from '../scenes/public/login';
import { SettingsScene } from '../scenes/private/settings';
import { UserScene } from '../scenes/private/users';
import { Showcases } from '../scenes/private/showcases';
import { RegisterPage } from '../scenes/public/register';
// import { ProfileScene } from '../scenes/public/profile/profile';
import { GameScene } from '../scenes/private/games/games';
import { ProfileScene } from '../scenes/private/profile/profile';
import { RoutesScene } from '../scenes/private/learn-routes/learn-routes';
import {LanguagesScene} from '../scenes/private/languages/languages';
import { ModulesScene } from "../scenes/private/modules/modules";
import { ModuleChallengesScene } from '../scenes/private/module-challenges/module-challenges';
import { CreateChallengeScene } from '../scenes/private/challenges/create-challenge';
import { ChallengeScene } from '../scenes/private/challenges/challenge';
import { CreateContentScene } from '../scenes/private/challenges/creat-content';

export const routes = {
    private: [
        { path: '/dashboard/settings', component: SettingsScene },
        { path: '/dashboard/users', component: UserScene },
        { path: '/dashboard/show-cases', component: Showcases },
        { path: '/dashboard/games', component: GameScene },
        { path: '/dashboard/profile', component: ProfileScene },
        { path: '/dashboard/routes', component: RoutesScene },
        { path: '/dashboard/routes/languages', component: LanguagesScene},
        { path: '/dashboard/routes/languages/modules', component: ModulesScene},
        { path: '/dashboard/routes/languages/modules/module-challenges', component: ModuleChallengesScene},
        { path: '/dashboard/create-challenges', component: CreateChallengeScene},
        { path: '/dashboard/challenge', component: ChallengeScene},
        { path: '/dashboard/create-content', component: CreateContentScene}
    ],
    public: [
        { path: '/login', component: LoginPage },
        { path: '/register', component: RegisterPage },
        { path: '/profile', component: ProfileScene }
    ]
};