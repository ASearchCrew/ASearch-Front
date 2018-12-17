import Dashboard from './spa/Dashboard/Dashboard.vue';
import LogViewer from './spa/LogViewer/LogViewer.vue';
import Keyword from './spa/Keyword/Keyword.vue';
import Firebase from './spa/Dashboard/FirebaseServer.vue';

export default[
  {path:'/', component:Dashboard},
  {path:'/logViewer', component:LogViewer},
  {path:'/keyword', component:Keyword},
  {path:'/firebase', component:Firebase}
]
