import Service  from '@ember/service';
import { isPresent } from '@ember/utils';
import { inject as service } from '@ember/service';

const URL_REGEX = /https:\/\/en\.wikipedia\.org\/wiki\/([\w%]+)/;

export default class WikipediaService extends Service {
  @service fetch;

  parse(title) {
    return this.fetch.post('/articles/parse_paragraphs', { title });
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
