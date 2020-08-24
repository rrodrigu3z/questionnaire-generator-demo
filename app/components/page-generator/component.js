import Component from '@glimmer/component';
import { isPresent } from '@ember/utils';

export default class PageGeneratorComponent extends Component {
  get showQuestionnaire() {
    let { selectedParagraph } = this.args;
    return isPresent(selectedParagraph) && selectedParagraph >= 0;
  }
}
