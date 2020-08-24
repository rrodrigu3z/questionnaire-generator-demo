import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | questionnaire', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    const answer = { "answer": "Machine intelligence", correct: true };
    this.set('questions', [
      { "question": "What is AI?", "answers": [answer, answer] },
      { "question": "What is ML?", "answers": [answer, answer] }
    ]);

    await render(hbs`
      <Questionnaire
        @questions={{this.questions}}
      />
    `);

    assert.dom('h1 img').exists();
    assert.dom('h1').hasText('Generated Questions');
    assert.dom('div[role="alert"]').exists();
    assert.dom('ul').exists({ count: 2 });
  });
});
