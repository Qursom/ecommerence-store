import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { EditPopupComponent } from './components/edit-popup/edit-popup.component';
import { ContactUsComponent } from './contact-us/contact-us.component';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, HomeComponent, HeaderComponent,ContactUsComponent, FooterComponent,EditPopupComponent]
})
export class AppComponent {
  title = 'ecommerence-store';
}
