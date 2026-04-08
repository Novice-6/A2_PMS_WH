import { Routes } from '@angular/router';

// Application Routes: The routes for the application.
import { HomeComponent } from './components/home/home.component';
import { ManageComponent } from './components/manage/manage.component';
import { SearchComponent } from './components/search/search.component';
import { SecurityAnalysisComponent } from './components/security-analysis/security-analysis.component';
import { HelpComponent } from './components/help/help.component'; 

export const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'manage', component: ManageComponent },
  { path: 'search', component: SearchComponent },
  { path: 'security', component: SecurityAnalysisComponent },
  { path: 'help', component: HelpComponent },
  { path: '**', redirectTo: '' } // Incorrect routing automatically redirects to the home page.
];