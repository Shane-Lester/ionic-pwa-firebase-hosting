import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage({
  name: 'bookmark'
})
@Component({
  selector: 'page-bookmark',
  templateUrl: 'bookmark.html'
})
export class BookmarkPage {
  public articleList: {};
  constructor(
    public navCtrl: NavController,
    public firebaseProvider: FirebaseProvider
  ) {}
  ionViewDidLoad() {
    this.firebaseProvider
      .getBookmarkedArticles()
      .valueChanges()
      .subscribe(bookmarkedArticleList => {
        this.articleList = bookmarkedArticleList;
      });
  }

  articleDetail(articleId: string): void {
    this.navCtrl.push('article-detail', {
      id: articleId
    });
  }

  removeBookmark(articleId: string): void {
    this.firebaseProvider.removeBookmark(articleId);
  }
}
