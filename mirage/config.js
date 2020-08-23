import config from 'questionnaire-generator-demo/config/environment';

export default function() {
  this.urlPrefix = config.questionnaireAPI.host;
  this.namespace = config.questionnaireAPI.namespace;

  this.post('/articles/parse_paragraphs', function(schema) {
    return { data: schema.db.paragraphs };
  });
}
