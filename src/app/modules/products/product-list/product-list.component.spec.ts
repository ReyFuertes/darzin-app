import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { TableComponent } from '../../../shared/components/table/table.component';
import { ProductsListComponent } from './product-list.component';
import { ProductsService } from '../products.service';
import { PageListComponent } from '../../../shared/components/page-list/page-list.component';

describe('ProductsListComponent', () => {
  let productsService: any;
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsListComponent, PageListComponent, TableComponent],
      imports: [HttpClientTestingModule, MatPaginatorModule, MatTableModule],
      providers: [ProductsService]
    }).compileComponents();
    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    productsService = TestBed.inject(ProductsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ensure productsService gets called on the init cycle', fakeAsync(() => {
    spyOn(productsService, 'getAll').and.callThrough();
    component.ngOnInit();
    expect(productsService.getAll).toHaveBeenCalledWith();
  }));
});
