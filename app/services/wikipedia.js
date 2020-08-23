import Service  from '@ember/service';
import { isPresent } from '@ember/utils';
import { inject as service } from '@ember/service';
import { assign } from '@ember/polyfills';

const URL_REGEX = /https:\/\/en\.wikipedia\.org\/wiki\/([\w%]+)/;

export default class WikipediaService extends Service {
  @service fetch;

  async parse(title) {
    const response = await this.fetch.post('/articles/parse_paragraphs', { title });
    const json = await response.json();
    const humanizedTitle = decodeURIComponent(title).replace('_', ' ');

    return assign({}, { title: humanizedTitle }, json);
  }

  isValidUrl(articleUrl) {
    return isPresent(this.extractTitle(articleUrl));
  }

  extractTitle(articleUrl) {
    const matches = articleUrl.match(URL_REGEX);
    if (isPresent(matches)) { return matches[1]; }

    return null;
  }
}
