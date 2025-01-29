import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from '../../../shared/components/table/table.component';
import { ProductsService } from '../products.service';
import { PageListComponent } from '../../../shared/components/page-list/page-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('ProductDetailComponent', () => {
  let productsService: any;
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDetailComponent, PageListComponent, TableComponent],
      imports: [HttpClientTestingModule, MatFormFieldModule],
      providers: [ProductsService]
    }).compileComponents();
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
