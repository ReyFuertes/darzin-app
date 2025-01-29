import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatPaginatorModule } from '@angular/material/paginator';

import { TableComponent } from '../../../shared/components/table/table.component'
import { PageListComponent } from '../../../shared/components/page-list/page-list.component';
import { CustomerListComponent } from './customer-list.component';
import { CustomersService } from '../customer.service';

describe('CustomerListComponent', () => {
  let customersService: any;
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerListComponent, PageListComponent, TableComponent],
      imports: [HttpClientTestingModule, MatPaginatorModule],
      providers: [CustomersService]
    }).compileComponents();
    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
    customersService = TestBed.inject(CustomersService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ensure customersService gets called on the init cycle', fakeAsync(() => {
    spyOn(customersService, 'getAll').and.callThrough();
    component.ngOnInit();
    expect(customersService.getAll).toHaveBeenCalledWith();
  }));
});
