
import Home from "./features/home/Home"
import loadable from '@loadable/component';

const ManageHome = loadable(() => import('./features/task_manage/ManageHome'))
const TypeManage = loadable(() => import('./features/task_manage/type_manage/TypeManage'))
const SelfU = loadable(() => import('./features/self_share/SelfU'))
const Tech = loadable(() => import('./features/task_tech/Tech'))
const Login = loadable(() => import('./features/task_manage/login/Login'))
const ArticleDetail = loadable(() => import('./features/article_detail/ArticleDetail'))
const Page404 = loadable(() => import('./features/404/Page404'))

const routes=[
    {path:"/self_u",name:"SelfU",component:SelfU},
    {path:"/tech",name:"Tech",component:Tech},
    {path:"/login",name:"Login",component:Login},
    {path:"/manage",name:"manageHome", component:ManageHome ,auth:true},

    {path:"/article_detail",name:"ArticleDetail",component:ArticleDetail},
    {path:"/404",name:"404",component:Page404},
    {path:"/type_dir",name:"type_dir",component:TypeManage},

    {path:"/",name:"App",component:Home},
]

export default routes