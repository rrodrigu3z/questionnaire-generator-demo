import { lorem } from 'faker';
import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  paragraph() { return lorem.paragraph(); }
});
