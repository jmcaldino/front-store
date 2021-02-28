import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Category } from '../../../core/models/category.model';

@Component({
  selector: 'app-sidenav-left',
  templateUrl: './sidenav-left.component.html',
  styleUrls: ['./sidenav-left.component.scss']
})
export class SidenavLeftComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  
  private categoryCollection: AngularFirestoreCollection<Category>;
  categories$: Observable<Category[]>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.categoryCollection = this.afs.collection<Category>('categories', ref => ref.orderBy('name'));
    this.categories$ = this.categoryCollection.valueChanges();
  }


}