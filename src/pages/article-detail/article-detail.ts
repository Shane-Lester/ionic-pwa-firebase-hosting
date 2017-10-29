import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Observable } from 'rxjs';

@IonicPage({
  name: 'article-detail',
  segment: 'article/:id',
  defaultHistory: ['home']
})
@Component({
  selector: 'page-article-detail',
  templateUrl: 'article-detail.html'
})
export class ArticleDetailPage {
  public article: Observable<any>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseProvider: FirebaseProvider
  ) {}
  ionViewDidLoad() {
    this.article = this.firebaseProvider
      .getArticle(this.navParams.get('id'))
      .valueChanges();

    /*     this.firebaseProvider
      .getArticle(this.navParams.get('id'))
      .valueChanges()
      .subscribe(article => {
        this.article = article;
      }); */
  }
}
