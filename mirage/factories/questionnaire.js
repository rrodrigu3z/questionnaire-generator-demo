import { lorem } from 'faker';
import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  question() { return `${lorem.sentence()}?`; },
  answers() {
    return [
      { answer: lorem.sentence(), correct: false, similarity: 0.75234324535 },
      { answer: lorem.sentence(), correct: true },
      { answer: lorem.sentence(), correct: false, similarity: 0.75234324535 },
      { answer: lorem.sentence(), correct: false, similarity: 0.75234324535 },
    ]
  }
});
