import 'reflect-metadata';
import {Container} from 'inversify';
import {HttpClient} from '@owui-commons/http';
import { UsersApiService } from './services/users.service';

const container = new Container();

container.bind<HttpClient>(HttpClient).toConstantValue(new HttpClient());
container.bind(HttpClient.name).toService(HttpClient);
container.bind<UsersApiService>(UsersApiService).toSelf()

export {container};
