import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { readOnly } from '@ember/object/computed';

export default class GeneratorQuestionnaireController extends Controller {
  queryParams = ['selectedParagraph'];

  @tracked selectedParagraph = 0;

  @readOnly('model.data') questions;
}
