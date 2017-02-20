import {Inject, Config, Routing} from "./bootstrap";

@Routing({
    name: 'greeting',
    url: '/greeting/:name',
    template: '<greeter name="$ctrl.name"></greeter>'
})
@Config({dependencies: ['ui.router']})
@Inject('$urlRouterProvider')
export class RouterConfig {
    constructor(urlRouterProvider) {
        urlRouterProvider.otherwise("/greeting/Guest");
    }
}