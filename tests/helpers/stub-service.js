import Service from '@ember/service';
import { getContext } from '@ember/test-helpers';

const stubService = (name, hash = {}) => {
  const stubbedService = Service.extend(hash);

  const { owner } = getContext();
  owner.register(`service:${name}`, stubbedService);
};

export default stubService;
