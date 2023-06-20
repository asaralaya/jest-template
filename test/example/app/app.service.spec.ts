
/**
* Description.
* This spec file was created using jest-template plugin!
*
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

describe('ExampleService', () => {
    let component: ExampleService;

    const http :Partial<HttpClient> ={};

    beforeAll(() => {
        component = new ExampleService(
            http as HttpClient
        )
    });

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });
            
    it('should create a instance of component', () => {
        expect(component).toBeTruthy();
    });
});