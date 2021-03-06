import { Component, OnInit } from '@angular/core';
import { Brands } from 'src/app/homepage/non-authenticated/vehicle-brand-details/brands';
import { Category } from 'src/app/homepage/non-authenticated/vehicle-category-details/category';
import { User } from '../user';
import { UserService } from '../user.service';
import { AdminService } from './admin.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {Products} from 'src/app/homepage/authenticated/vehicle-add/products';
import {VehicleAddService} from 'src/app/homepage/authenticated/vehicle-add/vehicle-add.service';
import {VehicleCategoryDetailsService} from 'src/app/homepage/non-authenticated/vehicle-category-details/vehicle-category-details.service';
import {VehicleBrandDetailsService} from 'src/app/homepage/non-authenticated/vehicle-brand-details/vehicle-brand-details.service'
import { OrderdetailsResult } from 'src/app/homepage/authenticated/vehicle-order/orderdetailsResult';
import { VehicleOrderService } from 'src/app/homepage/authenticated/vehicle-order/vehicle-order.service';
import { RazorpayService } from 'src/app/homepage/authenticated/razorpay.service';
import { Payment } from 'src/app/homepage/authenticated/vehicle-receipt/payment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: User;
  products : Products;
  category : Category;
  brand : Brands;
  brandType: any;
  changeBrand: Brands;
  categoryType: Category;
  orderdetails: OrderdetailsResult;
  paymentDetails: Payment;
  routeName: string;


  modifyStatus: any;
  txt: string;
  constructor(private userService: UserService,private vehicleCategoryService:VehicleCategoryDetailsService,private vehicleBrandService:VehicleBrandDetailsService,private vehicleAddService:VehicleAddService, private adminService: AdminService,private route: ActivatedRoute, private vehicleOrderService: VehicleOrderService, private razor: RazorpayService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( (params: ParamMap) => {
      this.routeName = params.get('routeName');
      console.log(this.routeName);

      if(this.routeName === 'user'){
        this.callAllUsers();
      }
      else if(this.routeName === 'category') {
           this.invokeCategory();
      }
      else if(this.routeName === 'brand') {
           this.invokeBrand();
      }
      else if(this.routeName === 'product') {
           this.invokeAllProduct();

      }
      else if(this.routeName === 'order') {
           this.invokeOrder();
      }
      else if(this.routeName === 'payment') {
          this.invokePayment();
      }
    });
  }

  callAllUsers(){
    this.userService.invokeAllUsers().subscribe((data: User) => {
      console.log(data);
      this.users = data;
    },
    (err)=>{
      console.log("Error" + err);
    });
  }


  invokeAllProduct()
  {
    console.log("Invoke Product Call");
    this.vehicleAddService.invokeProductDetails().subscribe((data: Products) => {
      console.log(data);
      this.products = data;
    },
    (err)=>{
      console.log("Error" + err);
    });
  }

  invokeCategory()
  {
     this.vehicleCategoryService.invokeCategoryDetails().subscribe((data: Category) => {
      console.log(data);
      this.category = data;
    },
    (err)=>{
      console.log("Error" + err);
    });
  }

    invokeBrand()
  {
     this.vehicleBrandService.invokeBrandDetails().subscribe((data: Brands) => {
      console.log(data);
      this.brand = data;
    },
    (err)=>{
      console.log("Error" + err);
    });
  }

  invokeOrder(){
    this.vehicleOrderService.invokeOrderDetails().subscribe ((data: any) => {
        this.orderdetails = data;
        console.log(this.orderdetails);
    },
    (err)=>{
      console.log("Error" + err);
    });
  }

  invokePayment(){
    this.razor.invokePaymentDetails().subscribe ((data: any) => {
        this.paymentDetails = data;
        console.log(this.paymentDetails);
    },
    (err)=>{
      console.log("Error" + err);
    });
  }

  modify(obj: any) {
    if(this.routeName === 'user'){
      this.modifyStatus = 'Do you want to modify User with UserId ' + obj.userid;
      const mod = confirm(this.modifyStatus);

      if (mod === true) {
        this.adminService.invokeModifyUser(obj).subscribe((data: any) => {
          console.log(data);
        },
        (err)=>{
          console.log("Error" + err);
        });
        alert('Userid ' + obj.userid + ' has been modified ');
      }
      else {
        this.callAllUsers();
      }
    }
    else if(this.routeName === 'category'){

    this.modifyStatus = 'Do you want to modify User with UserId ' + obj.categoryid;
    const mod = confirm(this.modifyStatus);

    if (mod === true) {
      this.adminService.invokeModifyCategory(obj).subscribe((data: any) => {
        console.log(data);
      },
      (err)=>{
        console.log("Error" + err);
      });
      alert('CategoryId ' + obj.categoryid + ' has been modified ');
    }
    else {
      this.invokeCategory();
    }
  }
    else if(this.routeName === 'brand'){

      this.modifyStatus = 'Do you want to modify Brand with BrandId ' + obj.brandid;
      const mod = confirm(this.modifyStatus);

      if (mod === true) {
        this.adminService.invokeModifyBrand(obj).subscribe((data: any) => {
          console.log(data);
        },
        (err)=>{
          console.log("Error" + err);
        });
        alert('BrandId ' + obj.brandid + ' has been modified ');
      }
      else {
        this.invokeBrand();
      }
    }

    else if(this.routeName === 'order')
    {
      this.modifyStatus = 'Do you want to modify Order with OrderId ' + obj.orderid;
      const mod = confirm(this.modifyStatus);

      if (mod === true) {
        this.adminService.invokeModifyProduct(obj).subscribe((data: any) => {
          console.log(data);
        },
        (err)=>{
          console.log("Error" + err);
        });
        alert('Orderid ' + obj.orderid + ' has been modified ');
      }
      else {
        this.invokeAllProduct();
      }
    }
    else if(this.routeName === 'product'){

      this.modifyStatus = 'Do you want to modify User with UserId ' + obj.productid;
    const mod = confirm(this.modifyStatus);

    if (mod === true) {
      this.adminService.invokeModifyProduct(obj).subscribe((data: any) => {
        console.log(data);
      },
      (err)=>{
        console.log("Error" + err);
      });
      alert('Productid ' + obj.productid + ' has been modified ');
    }
    else {
      this.invokeAllProduct();
    }
    }
    else if(this.routeName === 'payment'){

    }
  }

  delete(id: number) {
    this.modifyStatus = 'Do you want to delete User with UserId ' + id;
    const del = confirm(this.modifyStatus);

    if (del === true) {
      alert('Userid ' + id + ' has been deleted');
    } else {
      this.callAllUsers();
    }
  }
}
