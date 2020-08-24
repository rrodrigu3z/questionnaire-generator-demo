import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | questionnaire/question', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    const answer = { "answer": "Machine intelligence", correct: true };
    this.set('question', {
      "question": "What is AI?",
      "answers": [answer, answer]
    });

    await render(hbs`
      <Questionnaire::Question
        @question={{this.question}}
      />
    `);

    assert.dom('h2').hasText('What is AI?');
    assert.dom('ul li').exists({ count: 2 });
  });
});
