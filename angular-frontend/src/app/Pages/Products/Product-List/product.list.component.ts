import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

import { FeedBack } from 'src/app/Models/feedback';
import { ProductApiService } from 'src/app/Services/product.service';
import { Product } from 'src/app/Models/product.moddel';

@Component({
    selector: 'app-root-product-list',
    templateUrl: './product.list.component.html',
})
export class ProductListComponent implements OnInit {

    products: Product[] = [];
    feedback = new FeedBack("", "");
    isLoadingProduct: boolean = true;
    data: string;

    constructor(
        private productService: ProductApiService,
        private router: Router
    ) { }

    ngOnInit(): void {

        localStorage.removeItem('productId');

        this.feedback = { feedbackType: '', feedbackmsg: '' };

        this.data=localStorage.getItem('personId');
        if (!this.data) {
            alert("Something wrong!");
            this.router.navigate(['']);
            return;
        }

        this.getProducts(this.data);
    }

    getProducts(id: string): void {
        this.products = [];
        this.productService.getProducts(id).subscribe({
            next: (data: Product[]) => {
                if (data.length !== 0) {
                    this.products = data;
                }
            },
            error: (err: any) => {
                this.isLoadingProduct = false;
                console.log(err);
                this.feedback = {
                    feedbackType: err.type,
                    feedbackmsg: err.msg,
                };
            },
            complete: () => {
                this.isLoadingProduct = true;
                this.feedback = { feedbackType: 'success', feedbackmsg: 'loaded' };
            },
        });
    }

    deleteProduct(id: string, index) {

        if (window.confirm("Are you sure you want to delete this product?")) {
            this.productService.deleteProduct(id).subscribe({
                next: (data) => {
                    this.products.splice(index, 1);
                },
                error: (err: any) => {
                    this.isLoadingProduct = false;
                    console.log(err);
                    this.feedback = {
                        feedbackType: err.type,
                        feedbackmsg: err.msg,
                    };
                }
            });
        }
    }

    saveDataAndNavigate(id: string) {
        localStorage.setItem('productId', id);
        this.router.navigate(['/productedit/']);
    }
}