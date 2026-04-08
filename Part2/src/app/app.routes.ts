import { Routes } from '@angular/router';

// 引入你的页面组件
import { HomeComponent } from './components/home/home.component';
import { ManageComponent } from './components/manage/manage.component';
import { SearchComponent } from './components/search/search.component';
import { SecurityAnalysisComponent } from './components/security-analysis/security-analysis.component';
import { HelpComponent } from './components/help/help.component'; 

export const routes: Routes = [
  { path: '', component: HomeComponent }, // 首页
  { path: 'manage', component: ManageComponent },
  { path: 'search', component: SearchComponent },
  { path: 'security', component: SecurityAnalysisComponent },
  { path: 'help', component: HelpComponent },
  { path: '**', redirectTo: '' } // 错误路由自动跳回首页
];