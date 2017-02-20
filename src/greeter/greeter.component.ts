import {Component, Inject} from "../bootstrap";
import {GreeterService} from "./greeter.service";

@Component({
    name: 'greeter',
    templateUrl: './greeter.component.html',
    bindings: {
        name: '<'
    }
})
@Inject(GreeterService)
export class GreeterComponent {

    name: string;

    constructor(private service: GreeterService) {
    }

    get greet(): string {
        return this.service.greet(this.name);
    }
}