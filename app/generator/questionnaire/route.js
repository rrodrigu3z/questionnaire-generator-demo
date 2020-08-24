import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';

export default class GeneratorQuestionnaireRoute extends Route {
  @service questionnaire;

  queryParams = {
    selectedParagraph: {
      refreshModel: true
    }
  };

  beforeModel(/* transition */) {
    let generatorModel = this.modelFor('generator');

    if (isEmpty(generatorModel.data)) {
      this.transitionTo('generator');
    }
  }
  model({ selectedParagraph }) {
    let generatorModel = this.modelFor('generator');
    let paragraphs = generatorModel.data;
    let paragraph = paragraphs[selectedParagraph];

    return this.questionnaire.generate(paragraph.paragraph);
  }
}
