import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


// angular material
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import { ListPersonsComponent } from "./components/list-persons/list-persons.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    MatSlideToggleModule,
    MatSliderModule, ListPersonsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
