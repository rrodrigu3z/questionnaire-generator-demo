export default function(server) {
  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */

  server.createList('paragraph', 5);
  server.createList('questionnaire', 4);
}
