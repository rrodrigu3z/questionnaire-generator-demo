import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class PageHomeUrlFormComponent extends Component {
  @tracked url;

  @action
  submit(e) {
    e.preventDefault();
    this.args.onSubmit(this.url);
  }
}
