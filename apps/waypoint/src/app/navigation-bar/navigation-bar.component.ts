
    import { Component, Input } from '@angular/core';    
        
    export interface NavProps {
        path: string;
        icon: string;
        name: string;
      }
    @Component({    
        selector:'odst-navigation-bar',    
        templateUrl:'./navigation-bar.component.html',    
        styleUrls:['./navigation-bar.component.css']    
        })    

export class NavigationBarComponent    
{
    navLinks: NavProps[] = [
        {path:'/login', icon:'home', name:'Home'},
        {path: '/create-person', icon: 'build', name: 'Create'},
        {path: '/create-org', icon: 'update', name: 'Update'},
        {path: '/table-view', icon: 'visibility', name: 'View'}
    ];
}