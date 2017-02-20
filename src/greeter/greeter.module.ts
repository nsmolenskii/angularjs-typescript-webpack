import {Module} from "../bootstrap";
import {GreeterComponent} from "./greeter.component";
import {GreeterService} from "./greeter.service";

@Module({
    dependencies: [
        GreeterService,
        GreeterComponent
    ]
})
export class GreeterModule {}