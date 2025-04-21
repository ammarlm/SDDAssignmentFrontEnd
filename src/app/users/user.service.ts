import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { User } from "./user.moldel";

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) {
    }

    getUsers(page: number, pageSize: number, sortBy: string = 'username', sortType: string = 'asc', search?: string) {
        return this.http.get<any>(environment.baseUrl + 'api/user?page=' + page + '&pageSize=' + pageSize + '&orderby=' + sortBy + '&orderType=' + sortType + (search ? '&search=' + search : ''));
    }

    getUserById(id: number) {
        return this.http.get<User>(environment.baseUrl + 'api/user/' + id);
    }

    addUser(user: User) {
        return this.http.post(environment.baseUrl + 'api/user', user);
    }

    updateUser(id: string, user: User) {
        return this.http.put(environment.baseUrl + 'api/user/' + user.id, user);
    }

    deleteUser(id: string) {
        return this.http.delete(environment.baseUrl + 'api/user/' + id);
    }
}