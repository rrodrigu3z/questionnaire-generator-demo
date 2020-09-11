import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | questionnaire/answer', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders as incorrect answer', async function(assert) {
    await render(hbs`
      <Questionnaire::Answer
        @text="Human intelligence"
        @similarity=0.1234567
      />
    `);

    assert.dom('li img').doesNotExist();
    assert.dom('li').hasText('0.123 Human intelligence');
  });

  test('it renders correct answer', async function(assert) {
    await render(hbs`
      <Questionnaire::Answer
        @text="Machine intelligence"
        @correct=true
      />
    `);

    assert.dom('li img').exists();
    assert.dom('li').hasText('Machine intelligence');
  });
});
