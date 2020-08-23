import Controller from '@ember/controller';
import { readOnly } from '@ember/object/computed';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class GeneratorController extends Controller {
  queryParams = ['selectedParagraph'];

  @tracked selectedParagraph = 0;

  @readOnly('model.title') title;
  @readOnly('model.data') paragraphs;

  @action
  selectParagraph(index) {
    this.selectedParagraph = index;
  }
}
