import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class GeneratorRoute extends Route {
  @service wikipedia;
  @service fetch;

  model({ title }) {
    return this.wikipedia.parse(title);
  }

  resetController(controller, isExiting, transition) {
    if (isExiting && transition.targetName !== 'error') {
      controller.set('selectedParagraph', null);
    }
  }
}
