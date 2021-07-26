
import Home from "./features/home/Home"
 
import loadable from '@loadable/component';
import Home0 from "./features/home/Home0";

const ManageHome = loadable(() => import('./features/task_manage/ManageHome'))
const SelfU = loadable(() => import('./features/self_share/SelfU'))
const Tech = loadable(() => import('./features/task_tech/Tech'))
const Login = loadable(() => import('./features/task_manage/login/Login'))
const Page404 = loadable(() => import('./features/404/Page404'))


const routes=[
    {path:"/self_u",name:"SelfU",component:SelfU},
    {path:"/tech",name:"Tech",component:Tech},
    {path:"/login",name:"Login",component:Login},
    {path:"/manage",name:"manageHome", component:ManageHome ,auth:true},
    {path:"/home0",name:"Home0",component:Home0},
    {path:"/",name:"App",component:Home},
    {path:"/404",name:"404",component:Page404},
]

export default routes