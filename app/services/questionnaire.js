import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Service from '@ember/service';
import { inject as service } from '@ember/service';

const T5T5D = {
  name: 'QAG: T5 / DG: T5-D',
  description: 'T5 fine-tuned for Q&A Generation, T5 fine-tuned for distractors generation'
}

const T5GPT2 = {
  name: 'QAG: T5 / DG: GPT2',
  description: 'T5 fine-tuned for Q&A Generation, GPT-2 Small using a Q/A prompt'
}

export default class QuestionnaireService extends Service {
  @service fetch;

  @tracked
  modelKey = 'T5T5D';

  models = { T5T5D, T5GPT2 }

  get selectedModel() {
    return this.models[this.modelKey];
  }

  get dgModelConfig() {
    if ( this.modelKey === 'T5T5D') {
      return { model_name: 't5-distractor' };
    } else {
      return { model_name: 'gpt2' };
    }
  }

  async generate(paragraph) {
    const data = { paragraph, dg_model: this.dgModelConfig };
    const response = await this.fetch.post('/paragraphs/questionnaire', data);
    return await response.json();
  }

  @action
  toggleModel() {
    this.modelKey = this.modelKey === 'T5T5D' ? 'T5GPT2' : 'T5T5D';
  }
}
