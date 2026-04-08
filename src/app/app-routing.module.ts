import { AuthGuard } from './guards/auth/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'start',
    loadChildren: () => import('./start/start.module').then(m => m.StartPageModule)
  },
  {
    path: 'ai-model',
    loadChildren: () => import('./pages/ai-model/ai-model.module').then(m => m.AiModelPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then(m => m.AccountPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./pages/notification/notification.module').then(m => m.NotificationPageModule)
  },
  {
    path: 'all-blogs',
    loadChildren: () => import('./pages/all-blogs/all-blogs.module').then(m => m.AllBlogsPageModule)
  },
  {
    path: 'add-blog',
    loadChildren: () => import('./pages/addblog/addblog.module').then(m => m.AddblogPageModule)
  },
  {
    path: 'personal-blog',
    loadChildren: () => import('./pages/personalblog/personalblog.module').then(m => m.PersonalblogPageModule)
  },
  {
    path: 'update-blog/:blogId',
    loadChildren: () => import('./pages/updateblog/updateblog.module').then(m => m.UpdateblogPageModule)
  },
  {
    path: 'specific-blog/:blogId',
    loadChildren: () => import('./pages/specificblog/specificblog.module').then(m => m.SpecificblogPageModule)
  },
  {
    path: 'create-project',
    loadChildren: () => import('./pages/create-project/create-project.module').then(m => m.CreateProjectPageModule)
  },
  {
    path: 'reward/:id',
    loadChildren: () => import('./pages/reward/reward.module').then(m => m.RewardPageModule)
  },
  {
    path: 'edit-projects/:id',
    loadChildren: () => import('./pages/edit-projects/edit-projects.module').then(m => m.EditProjectsPageModule)
  },
  {
    path: 'create-updates/:id',
    loadChildren: () => import('./pages/create-updates/create-updates.module').then(m => m.CreateUpdatesPageModule)
  },
  {
    path: 'project-listing',
    loadChildren: () => import('./pages/project-listing/project-listing.module').then(m => m.ProjectListingPageModule)
  },
  {
    path: 'project-details/:id',
    loadChildren: () => import('./pages/project-details/project-details.module').then(m => m.ProjectDetailsPageModule)
  },
  {
    path: 'updates-list/:id',
    loadChildren: () => import('./pages/updates-list/updates-list.module').then(m => m.UpdatesListPageModule)
  },
  {
    path: 'edit-updates/:id/:prjId',
    loadChildren: () => import('./pages/edit-updates/edit-updates.module').then(m => m.EditUpdatesPageModule)
  },
  {
    path: 'edit-rewards',
    loadChildren: () => import('./pages/edit-rewards/edit-rewards.module').then(m => m.EditRewardsPageModule)
  },
  {
    path: 'rewards-list/:id',
    loadChildren: () => import('./pages/rewards-list/rewards-list.module').then(m => m.RewardsListPageModule)
  },
  {
    path: 'create-rewards/:id',
    loadChildren: () => import('./pages/create-rewards/create-rewards.module').then(m => m.CreateRewardsPageModule)
  },
  {
    path: 'event',
    loadChildren: () => import('./pages/event/event.module').then(m => m.EventPageModule)
  },
  {
    path: 'event-detail/:id',
    loadChildren: () => import('./pages/event-detail/event-detail.module').then(m => m.EventDetailPageModule)
  },
  {
    path: 'event-favorite',
    loadChildren: () => import('./pages/event-favorite/event-favorite.module').then(m => m.EventFavoritePageModule)
  },
  {
    path: 'event-paypal',
    loadChildren: () => import('./pages/event-paypal/event-paypal.module').then(m => m.EventPaypalPageModule)
  },
  {
    path: 'campaign',
    loadChildren: () => import('./pages/campaign/campaign.module').then(m => m.CampaignPageModule)
  },
  {
    path: 'campaign-detail/:id',
    loadChildren: () => import('./pages/campaign-detail/campaign-detail.module').then(m => m.CampaignDetailPageModule)
  },
  {
    path: 'campaign-favorite',
    loadChildren: () => import('./pages/campaign-favorite/campaign-favorite.module').then(m => m.CampaignFavoritePageModule)
  },
  {
    path: 'transaction-history',
    loadChildren: () => import('./pages/transaction-history/transaction-history.module').then(m => m.TransactionHistoryPageModule)
  },
  {
    path: 'event-ticket/:id',
    loadChildren: () => import('./pages/event-ticket/event-ticket.module').then(m => m.EventTicketPageModule)
  },
  {
    path: 'user-rewards',
    loadChildren: () => import('./pages/user-rewards/user-rewards.module').then(m => m.UserRewardsPageModule)
  },
  {
    path: 'success-reward/:id',
    loadChildren: () => import('./pages/success-reward/success-reward.module').then(m => m.SuccessRewardPageModule)
  },
  {
    path: 'failed-reward/:id',
    loadChildren: () => import('./pages/failed-reward/failed-reward.module').then(m => m.FailedRewardPageModule)
  },
  {
    path: 'check-out/:id',
    loadChildren: () => import('./pages/check-out/check-out.module').then( m => m.CheckOutPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
