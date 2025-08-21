import { Component, ChangeDetectionStrategy } from "@angular/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import { RouterOutlet } from "@angular/router";
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { HeaderComponent } from "../../shared/components/header/header.component";

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    SidenavComponent,
    HeaderComponent,
  ]
})
export class AppLayoutComponent  {
}
