import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class PageHomeUrlFormComponent extends Component {
  @service wikipedia;

  @tracked url;
  @tracked invalidUrl = false;

  @action
  submit(e) {
    e.preventDefault();

    if (this.wikipedia.isValidUrl(this.url)) {
      this.args.onSubmit(this.url);
    } else {
      this.invalidUrl = true
    }
  }
}
