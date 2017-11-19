/**
 * Route History Service
 * This service keeps track of the current route and the previous route state.
 *
 * @module ember-route-history/services/route-history
 * @extends Ember.Service
 */

import Ember from 'ember';

const { computed } = Ember;

export default Ember.Service.extend({
  router: Ember.inject.service(),

  /**
   * Current route
   *
   * @property current
   * @type {Object}
   */
  current: null,

  /**
   * Previous route. If there is no previous route, returns null
   *
   * @property previous
   * @type {Object}
   */
  previous: computed('history.[]', function() {
    const history = this.get('history');
    const historyLength = history.get('length');

    if (!Ember.isEmpty(history) && historyLength > 1) {
      return history.objectAt(historyLength - 2);
    }

    return null;
  }),

  /**
   * Array contening the history of routes that have been visited.
   *
   * @property history
   * @type {Array}
   */
  history: Ember.A(),

  /**
   * Maximum number of entries to keep in the history.
   *
   * @property maxHistoryLength
   * @type number
   */
  maxHistoryLength: 10,

  /**
   * Pushes a route name onto the history stack.
   *
   * @method pushHistoryState
   * @param route
   * @return The current history stack.
   */
  addRouteToHistory(route) {
    const maxHistoryLength = this.get('maxHistoryLength');
    let history = this.get('history');

    history.pushObject(route);

    if (history.get('length') > maxHistoryLength) {
      history.shiftObject();
    }

    return history;
  },

  _route: Ember.computed(function() {
    return Ember.getOwner(this).lookup('route:application');
  }),

  _router: Ember.computed.readOnly('_route.router'),

  _routing: Ember.inject.service(),

  // have the application route transition to the location
  // specified by the parameters
  transitionToPrevious() {
    const previous = this.get('previous');

    let history = this.get('history');
    history.popObject();
    let routing = this.get('_routing');
    if (routing) {
      routing.transitionTo(previous.route, previous.model);
    } else {
      this.get('_router').transitionTo(previous.route, previous.model);
    }
  },

  /**
   * @method setCurrentRoute
   * @param route
   */
  setCurrentRoute(route) {
    const routeName = route.get('routeName');
    if (routeName !== 'loading') {
      let currentRoute = {
        route: routeName,
        model: Object.values(route.paramsFor(routeName))
      };
      this.set('current', currentRoute);
      this.addRouteToHistory(currentRoute);
    }
  },

  /**
   * Clear route history
   */
  clearHistory() {
    this.set('history', Ember.A());
  }
});
