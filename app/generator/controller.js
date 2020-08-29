import Controller from '@ember/controller';
import { readOnly } from '@ember/object/computed';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { isPresent } from '@ember/utils'

export default class GeneratorController extends Controller {
  @tracked selectedParagraph;

  @readOnly('model.title') title;
  @readOnly('model.data') paragraphs;

  get showQuestionnaire() {
    return isPresent(this.selectedParagraph) &&
      this.selectedParagraph >= 0;
  }

  @action
  selectParagraph(index) {
    this.selectedParagraph = index;
    this.transitionToRoute('generator.questionnaire',
      { queryParams: { selectedParagraph: index } }
    );
  }
}
