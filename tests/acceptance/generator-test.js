import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | Generator', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /generator/AI', async function(assert) {
    assert.expect(3);
    server.createList('paragraph', 2);

    await visit('/generator/AI');

    assert.dom('h1').hasText('AI');
    assert.dom('.paragraph').exists({ count: 2 });
    assert.dom('.note').exists();
  });

  test('returning to home', async function(assert) {
    assert.expect(2);

    await visit('/generator/AI');
    assert.equal(currentURL(), '/generator/AI');

    await click('[data-test-home-button]');
    assert.equal(currentURL(), '/');
  });

  test('generating a questionnaire', async function(assert) {
    assert.expect(5);
    server.createList('paragraph', 2);
    server.createList('questionnaire', 2);

    server.post('/paragraphs/questionnaire', (schema, request) => {
      let params = JSON.parse(request.requestBody);

      assert.equal(params.paragraph, schema.db.paragraphs[1].paragraph);
      assert.equal(
        params.dg_model.model_name,
        't5-distractor',
        'sends selected model for distractors generation'
      );

      return { data: schema.db.questionnaires };
    });

    await visit('/generator/AI');
    await click('.article-paragraphs .paragraph:last-child');

    assert.equal(
      currentURL(),
      '/generator/AI/questionnaire?selectedParagraph=1',
      'sets query params'
    );

    assert.dom('h2').exists({ count: 2 }, 'shows 2 questions');
    assert.dom('li').exists({ count: 8 }, 'shows answers');
  });

  test('changing the model', async function(assert) {
    assert.expect(1);
    server.createList('paragraph', 2);

    server.post('/paragraphs/questionnaire', (schema, request) => {
      let params = JSON.parse(request.requestBody);
      assert.equal(
        params.dg_model.model_name,
        'gpt2',
        'sends GPT2 as model for distractor generation'
      );
    });

    await visit('/generator/AI');
    await click('[data-test-model-button]')
    await click('.article-paragraphs .paragraph');
  });
});
