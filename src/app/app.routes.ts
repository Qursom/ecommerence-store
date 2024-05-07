import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
    },

    {
        path:'about-us',
        loadChildren: () => import('./modules/about-us/about-us-routing.module').then(m => m.AboutUsRoutingModule)
    },

  {
        path:'contact-us',
        component:ContactUsComponent
    },


];
