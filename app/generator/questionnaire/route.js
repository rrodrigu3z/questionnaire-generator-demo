import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class GeneratorQuestionnaireRoute extends Route {
  @service questionnaire;
  @service fastboot;

  queryParams = {
    selectedParagraph: {
      refreshModel: true
    }
  };

  model({ selectedParagraph }) {
    if (!this.fastboot.isFastBoot) {
      let { paragraph } = this.modelFor('generator').data[selectedParagraph];
      return this.questionnaire.generate(paragraph);
    }
  }
}
