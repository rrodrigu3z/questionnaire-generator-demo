import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Service from '@ember/service';

const T5T5D = {
  name: 'QAG: T5 / DG: T5-D',
  description: 'T5 fine-tuned for Q&A Generation, T5 fine-tuned for distractors generation'
}

const T5GPT2 = {
  name: 'QAG: T5 / DG: GPT2',
  description: 'T5 fine-tuned for Q&A Generation, GPT-2 Small using a Q/A prompt'
}

export default class QuestionnaireService extends Service {
  @tracked
  modelKey = 'T5T5D';

  models = { T5T5D, T5GPT2 }

  get selectedModel() {
    return this.models[this.modelKey];
  }

  @action
  toggleModel() {
    this.modelKey = this.modelKey === 'T5T5D' ? 'T5GPT2' : 'T5T5D';
  }
}
