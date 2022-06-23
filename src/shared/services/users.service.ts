import { HttpClient } from "@owui-commons/http";
import { injectable } from "inversify";
import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { AppConstants } from '../app-constants';

@injectable()
export class UsersApiService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get(`${AppConstants.DEFAULT_ROUTE}${AppConstants.API_PATHS.USERS}`);
  }
}