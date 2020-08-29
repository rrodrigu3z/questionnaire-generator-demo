import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class GeneratorRoute extends Route {
  @service wikipedia;
  @service fetch;
  @service fastboot;

  model({ title }) {
    if (!this.fastboot.isFastBoot) {
      return this.wikipedia.parse(title);
    }
  }

  setupController(controller, model) {
    super.setupController(controller, model);

    let { selectedParagraph } = this.paramsFor('generator.questionnaire');
    controller.set('selectedParagraph', selectedParagraph);
  }
}
