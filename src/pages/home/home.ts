import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Observable } from 'rxjs';

@IonicPage({
  name: 'home'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public articles: Observable<any>;
  public userId: string = null;
  public isUser: boolean = false;
  constructor(
    public navCtrl: NavController,
    public firebaseProvider: FirebaseProvider,
    public alertCtrl: AlertController
  ) { }

  ionViewDidLoad() {
    this.articles = this.firebaseProvider.getLatestNews().valueChanges();
    this.firebaseProvider.getUser().subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.isUser = true;
      }
    });
  }

  articleDetail(articleId: string): void {
    this.navCtrl.push('article-detail', {
      id: articleId
    });
  }

  bookmarkArticle(article: any): void {
    if (this.isUser) {
      this.firebaseProvider.bookmarkArticle(article);
    } else {
      const alert = this.alertCtrl.create({
        title: 'You need an account',
        message: 'In order to bookmark a story you need to login with Facebook',
        buttons: [
          {
            text: 'No way!',
            handler: () => {
              console.log("Didn't want to login");
            }
          },
          {
            text: 'Ok',
            handler: () => {
              this.firebaseProvider.signInUser().then(() => {
                this.bookmarkArticle(article);
                alert.dismiss();
              });
            }
          }
        ]
      });
      alert.present();
    }
  }

}
