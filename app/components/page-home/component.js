import Component from '@glimmer/component';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class PageHomeComponent extends Component {
  articles = A([
    { title: "Artificial Intelligence" },
    { title: "Deep Learning" }
  ]);

  @tracked selected;

  @action
  selectArticle(article) {
    this.selected = article;
  }

  @action
  processURL(url) {
    console.log(url)
  }
}
