import Ember from 'ember';

Ember.Route.reopen({
  routeHistoryBack: Ember.inject.service(),
  setCurrentRoute: Ember.on('activate', function () {
    if (this.get('clearHistory')) {
      this.get('routeHistoryBack').clearHistory();
    }
    if (!this.get('skipRouteHistory')) {
      this.get('routeHistoryBack').setCurrentRoute(this);
    }
  })
});
