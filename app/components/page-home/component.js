import Component from '@glimmer/component';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { articles } from './articles';

export default class PageHomeComponent extends Component {
  @service wikipedia;
  @service router;

  @tracked selected;
  articles = A(articles);

  @action
  selectArticle(article) {
    this.selected = article;
    this.processURL(article.url);
  }

  @action
  processURL(url) {
    let title = this.wikipedia.extractTitle(url);
    this.router.transitionTo('generator', title,
      { queryParams: { selectedParagraph: null } }
    );
  }
}
