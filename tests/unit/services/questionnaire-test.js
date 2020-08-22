import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | questionnaire', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.service = this.owner.lookup('service:questionnaire');
  });

  test('default model key', function(assert) {
    assert.equal(this.service.modelKey, 'T5T5D');
  });

  test('selected model', function(assert) {
    const expected = {
      name: 'QAG: T5 / DG: T5-D',
      description: 'T5 fine-tuned for Q&A Generation, T5 fine-tuned for distractors generation'
    };

    assert.deepEqual(this.service.selectedModel, expected);
  });

  test('toggle model', function(assert) {
    const expected = {
      name: 'QAG: T5 / DG: GPT2',
      description: 'T5 fine-tuned for Q&A Generation, GPT-2 Small using a Q/A prompt'
    };

    this.service.toggleModel();
    assert.deepEqual(this.service.selectedModel, expected);
  });
});
