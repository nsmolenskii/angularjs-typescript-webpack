import {GreeterModule} from "./greeter";
import {RouterConfig} from "./app.routing";
import {Module} from "./bootstrap";

@Module({
    dependencies: [
        RouterConfig,
        GreeterModule
    ]
})
export class AppModule {
}