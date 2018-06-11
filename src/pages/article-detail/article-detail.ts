import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ArticleDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'article-detail',
  segment: 'article/:id',
  defaultHistory: ['home']
})
@Component({
  selector: 'page-article-detail',
  templateUrl: 'article-detail.html',
})
export class ArticleDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticleDetailPage');
  }

}
