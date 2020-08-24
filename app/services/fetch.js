import Service from '@ember/service';
import fetch from 'fetch';
import config from 'questionnaire-generator-demo/config/environment';

const JSON_CONTENT_TYPE = 'application/json; charset=utf-8';

export default class FetchService extends Service {
  host = config.questionnaireAPI.host;
  namespace = config.questionnaireAPI.namespace;
  contentType = JSON_CONTENT_TYPE;

  post(path, body) {
    const method = 'POST';
    const headers = { 'Content-Type': this.contentType };
    const url = this._buildUrl(path);

    return fetch(url, {
      method, body: JSON.stringify(body), headers
    });
  }

  _buildUrl(path) {
    return `${this.host}/${this.namespace}${path}`;
  }
}
