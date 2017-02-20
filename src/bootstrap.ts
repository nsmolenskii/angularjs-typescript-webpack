import * as angular from 'angular';
import 'angular-ui-router';
import {IModule, IComponentOptions} from 'angular';
import {IStateProvider} from 'angular-ui-router';

declare global {
    const angular: ng.IAngularStatic;
}

export function bootstrap(dependency: ModuleType) {
    angular.bootstrap(document, modules([dependency]));
}

export function Component(options: ComponentOptions) {
    return function (target: any) {
        options.controller = target.name;
        options.name = options.name || target.name;
        options.dependencies = options.dependencies || [];

        target.$module = angular
            .module(options.name, modules(options.dependencies))
            .controller(target.name, target)
            .component(options.name, options);
    };
}

export function Directive(options?: DirectiveOptions) {
    return function (target: any) {
        options = options || {};
        options.name = options.name || target.name;
        options.dependencies = options.dependencies || [];

        target.$module = angular
            .module(options.name, modules(options.dependencies))
            .directive(options.name, target);
    };
}

export function Service(options?: ServiceOptions) {
    return function (target: any) {
        options = options || {};
        options.name = options.name || target.name;
        options.dependencies = options.dependencies || [];

        target.$module = angular
            .module(options.name, modules(options.dependencies))
            .service(options.name, target);
    };
}

export function Config(options?: ConfigOptions) {
    return function (target: any) {
        options = options || {};
        options.name = options.name || target.name;
        options.dependencies = options.dependencies || [];

        target.$module = angular
            .module(options.name, modules(options.dependencies))
            .config(target);
    };
}

export function Inject(...injectable: ModuleType[]) {
    return function (target: any) {
        target.$inject = modules(injectable);
    };
}

export function Module(options: ModuleOptions) {
    return function (target: any) {
        options.name = options.name || target.name;
        options.dependencies = options.dependencies || [];

        target.$module = angular.module(options.name, modules(options.dependencies));
    };
}

export function Routing(options: RoutingOptions) {
    @Inject('$stateParams')
    class RoutingController {
        constructor(params) {
            angular.copy(params, this);
        }
    }

    return function (target: any) {
        options.name = options.name || target.name;
        options.controller = options.controller || RoutingController;
        options.controllerAs = options.controllerAs || '$ctrl';

        target.$module.config(function ($stateProvider: IStateProvider) {
            $stateProvider.state(options.name, options);
        });
    };
}

function modules(modules: ModuleType[]): string[] {
    return modules.map(module => {
        if (angular.isString(module)) {
            return <string>module;
        } else if (angular.isFunction(module)) {
            let moduleWrapper = <ModuleWrapper>module;
            return moduleWrapper.$module.name;
        } else {
            throw new Error('Unknown module dependency ' + module);
        }
    });
}

export interface Initializing {
    $onInit();
}

export interface Destroing {
    $onDestroy();
}

export declare type ModuleType = Function | string;

export interface ComponentOptions extends IComponentOptions, ModuleOptions {
}

export interface ServiceOptions extends ModuleOptions {
}

export interface ConfigOptions extends ModuleOptions {
}

export interface DirectiveOptions extends ModuleOptions {
}

export interface ModuleOptions {
    name?: string;
    dependencies?: ModuleType[];
}

export interface ModuleWrapper extends Function {
    $module: IModule;
}

export interface RoutingOptions {
    url: string;
    name: string;
    template: string;
    controller?: ModuleType;
    controllerAs?: string;
}