
import { Injectable,  } from '@angular/core';
import { Router } from '@angular/router';
import { CacheService } from 'src/app/core/services';
import { IUserModel, UserAuth } from 'src/app/core/models';

@Injectable()
export class SignInService {
    private userAuth: UserAuth;
	constructor( private cacheService: CacheService, private router: Router) {}
    
    login(user: IUserModel): void {
        if(this.cacheService.get('users')) {
            let users: IUserModel[] = this.cacheService.get('users');
            const userExists: IUserModel = users.find(item => {
                return item.email === user.email && item.password === user.password;
            })
            if(userExists) {
                this.userAuth = new UserAuth(user.email, true);
                this.cacheService.set('userAuth', this.userAuth);
                this.router.navigate(['']);
            } else { 
               alert('Usuario o contraseña incorrecto')
            }
        } else {
            alert('Usuario o contraseña incorrecto')
        }
    }
}