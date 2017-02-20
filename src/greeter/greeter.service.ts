import {Service} from '../bootstrap';

@Service()
export class GreeterService {
    greet(name: string): string {
        return `Hello ${name}`;
    }
}