# Ember-history-back

This is an Ember-CLI addon. It provides a service which keeps an history of the visited routes. You will be able to know what is the current route, what was the previously visited routes and transition to previous route. This addon also working with dynamic routes.

## Installation

Using ember-cli:

`ember install ember-history-back`

## Usage

By default, addon saving all visited routes. The service `routeHistoryBack` is injected into all routes of your application.

By default, only 10 items are saved in the history. You can increase the size of the stack by setting maxHistoryLength.

```
this.set('routeHistoryBack.maxHistoryLength', 50);
```

You need to use route option `skipRouteHistory` for skip adding this route to history.

You need to use route option `clearHistory` for clear all history when user open this route.

```
import Ember from 'ember';

export default Ember.Route.extend({
    
    /* This route will not be added to history */
    skipRouteHistory: true,
    
    /* Visited routes history will be cleared when user opn this route */
    clearHistory: true 
});
```

You can create history back button in 2 ways:

* Inject service `routeHistoryBack` into your controller or component, and use action `transitionToPrevious`

```
<a {{action routeHistoryBack.transitionToPrevious}}>Back</a>
```

* Inject service `routeHistoryBack` into your controller or component, and use `dynamic-link` addon

```
{{#dynamic-link params=routeHistory.previous class="btn btn-primary"}}Back{{/dynamic-link}}
```
