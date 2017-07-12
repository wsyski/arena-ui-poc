import { Injectable }     from '@angular/core';
import { CanActivate }    from '@angular/router';

@Injectable()
export class AlwaysDenyGuard implements CanActivate {
    canActivate() {
        console.log('AlwaysDenyGuard#canActivate called');
        return false;
    }
}