import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class GeneratorRoute extends Route {
  @service wikipedia;

  model({ title }) {
    return this.wikipedia.parse(title);
  }
}
