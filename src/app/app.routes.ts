import { Routes } from '@angular/router';
import { BookComponent } from './book/book.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { HeroComponent } from './hero/hero.component';
import { AboutComponent } from './about/about.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { SnakeGameComponent } from './snake-game/snake-game.component';

// export const routes: Routes = [
//     { path: '', component: BookComponent },
//     { path: 'home', component: BookComponent },
//     { path: 'book/:id', component: BookDetailsComponent }
// ];
export const routes: Routes = [
{ path: '', component: HeroComponent },
{ path: 'about', component: AboutComponent },
{ path: 'projects', component: ProjectsComponent },
{ path: 'contact', component: ContactComponent },
{ path: 'snake-game', component: SnakeGameComponent },
{ path: '**', redirectTo: '' }
];


