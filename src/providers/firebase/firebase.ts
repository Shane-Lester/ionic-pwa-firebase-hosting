import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable()
export class FirebaseProvider {
  public userId: string;

  constructor(
    public afAuth: AngularFireAuth,
    public afDatabase: AngularFireDatabase
  ) {
    afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  getLatestNews(): AngularFireList<any> {
    return this.afDatabase.list('articles');
  }

  getUser(): Observable<any> {
    return this.afAuth.authState;
  }

  signInUser(): Promise<any> {
    return this.afAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(user => {
        this.afDatabase.object(`userProfile/${user.user.uid}`).update({
          displayName: user.user.displayName,
          email: user.user.email,
          photoURL: user.user.photoURL
        });
      })
      .catch(error => console.log(error));
  }

  bookmarkArticle(article: any): Promise<any> {
    return this.afDatabase
      .object(`articles/${article.id}/bookmarked/${this.userId}`)
      .set(true)
      .then(() => {
        this.afDatabase
          .object(`userProfile/${this.userId}/articles/${article.id}`)
          .set({
            description: article.description,
            title: article.title,
            urlToImage: article.urlToImage,
            id: article.id
          });
      });
  }

  getBookmarkedArticles(): AngularFireList<any> {
    return this.afDatabase.list(`userProfile/${this.userId}/articles/`);
  }

  removeBookmark(articleId: string): Promise<any> {
    return this.afDatabase
      .object(`articles/${articleId}/bookmarked/${this.userId}`)
      .set(null)
      .then(() => {
        this.afDatabase
          .object(`userProfile/${this.userId}/articles/${articleId}`)
          .remove();
      });
  }

  getArticle(articleId: string): AngularFireObject<any> {
    return this.afDatabase.object(`articles/${articleId}`);
  }

}
