import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'create-complaint', loadChildren: './pages/create-complaint/create-complaint.module#CreateComplaintPageModule' },
  { path: 'add-comment', loadChildren: './pages/add-comment/add-comment.module#AddCommentPageModule' },
  { path: 'signup',
   loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule) },
  { path: 'login',
  loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)},
  { path: 'forgotpassword', loadChildren: './pages/forgotpassword/forgotpassword.module#ForgotpasswordPageModule' },
  { path: 'missing', loadChildren: './pages/missing/missing.module#MissingPageModule' },
  { path: 'tabs/friends', loadChildren: './pages/friends/friends.module#FriendsPageModule' },
  { path: 'signup-login', loadChildren: './pages/signup-login/signup-login.module#SignupLoginPageModule' }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
