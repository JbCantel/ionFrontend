import { Component, inject, OnInit } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  authState$ = authState(this.auth);
  authStateSubscription = new Subscription;
  user!: User;

  constructor(private auth: Auth = inject(Auth)) { }

  ngOnInit() {
    this.authStateSubscription = this.authState$.subscribe(
      (userData: User | null) => {
        if (userData) {
          console.log(userData.metadata.creationTime)
          this.user = userData

        }
      }
    )
  }

  ngOnDestroy() {
    this.authStateSubscription.unsubscribe();
  }

  logout() {
    this.auth.signOut();
    alert('Você saiu do aplicativo.');
    location.href = "/home";
  }

  toProfile() {
    window.open('https://myaccount.google.com/', '_blank')
  }
}
