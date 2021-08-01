import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { IndexProductComponent } from './Admin/product/index-product/index-product.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { HeaderComponent } from './header/header.component';
import { NavBarComponent } from './NavBar/nav-bar/nav-bar.component';
import { StoreComponent } from './Store/store/store.component';
import { ProductComponent } from './Store/product/product.component';
import { ProductListComponent } from './Store/product-list/product-list.component';
import { DetailsComponent } from './details/details.component';
import { BrandComponent } from './Admin/brand/Index/brand.component';
import { HeighSaledPRoductListComponent } from './heigh-saled-product-list/heigh-saled-product-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { WishlistDetailsComponent } from './wishlist-details/wishlist-details.component';
import { AddBrandComponent } from './Admin/brand/add-brand/add-brand.component';
import { EditBrandComponent } from './Admin/brand/edit-brand/edit-brand.component';
import { SubcategoryComponent } from './Admin/subcategory/index/subcategory.component';
import { AddSubcategoryComponent } from './Admin/subcategory/add-subcategory/add-subcategory.component';
import { EditSubcategoryComponent } from './Admin/subcategory/edit-subcategory/edit-subcategory.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { CartComponent } from './header/cart/cart.component';
import { CartProductComponent } from './header/cart/cart-product/cart-product.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderComponent } from './header/loader/loader.component';
import { LoaderInterceptor } from './loader/loader.interceptor';
import { IndexComponent } from './Admin/MainCategory/index/index.component';
import { AddMainCategoryComponent } from './Admin/MainCategory/add-main-category/add-main-category.component';
import { EditMainCategoryComponent } from './Admin/MainCategory/edit-main-category/edit-main-category.component';
import { AddProductComponent } from './Admin/product/add-product/add-product.component';
import { EditProdcutComponent } from './Admin/product/edit-prodcut/edit-prodcut.component';

import { AdminComponent } from './Admin/admin/admin.component';
import { AuthGurd } from './Shared/AuthGurdClass';
import { AuthAdminGurd } from './Shared/AuthAdminGurd';
import { UsersComponent } from './Admin/users/users.component';
import { AdminsComponent } from './Admin/users/admins/admins.component';
import { VendorsComponent } from './Admin/users/vendors/vendors.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthVendorGurd } from './Shared/AuthVendorGurd';
import { ModalComponent } from './modal/modal.component';
import { OrdersComponent } from './Admin/orders/orders.component';
import { EditOrderComponent } from './Admin/orders/edit-order/edit-order.component';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    UserHeaderComponent,
    HeaderComponent,
    NavBarComponent,
    StoreComponent,
    ProductComponent,
    ProductListComponent,
    DetailsComponent,
    HeighSaledPRoductListComponent,
    HomePageComponent,
    BrandComponent,
    CartDetailsComponent,
    WishlistDetailsComponent,
    AddBrandComponent,
    EditBrandComponent,
    SubcategoryComponent,
    AddSubcategoryComponent,
    EditSubcategoryComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    CartProductComponent,
    CheckOutComponent,
    LoaderComponent,
    IndexComponent,
    AddMainCategoryComponent,
    EditMainCategoryComponent,
    AdminComponent,
    UsersComponent,
    AdminsComponent,
    VendorsComponent,
    ProfileComponent,
    AddProductComponent,
    IndexProductComponent,
    EditProdcutComponent,
    AdminComponent,
    ModalComponent,
    OrdersComponent,
    EditOrderComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TooltipModule.forRoot(),
    MatProgressBarModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthGurd,AuthAdminGurd,AuthVendorGurd,
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
