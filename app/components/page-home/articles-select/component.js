import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';

export default class PageHomeArticlesSelectComponent extends Component {
  @tracked isOpen = false;

  get selectedTitle() {
    if (isEmpty(this.args.selected)) { return this.args.placeholder; }
    return this.args.selected.title;
  }

  @action
  toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  @action
  close() {
    this.isOpen = false;
  }
}
