import RouteHistoryService from '../services/route-history-back';
import extension from '../extension/route';

export function initialize(application) {
  application.register('service:route-history-back', RouteHistoryService);
  application.inject('route', 'routeHistoryBack', 'service:route-history-back');
}

export default {
  name: 'injectRouteHistoryBack',
  after: 'ember-data',
  initialize: initialize
};
