import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FoodService } from '../../../services/food.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-food',
  templateUrl: './create-food.component.html',
  styleUrls: ['./create-food.component.css'],
})
export class CreateFoodComponent implements OnInit {
  createFoodForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private foodService: FoodService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createFoodForm = this.formBuilder.group({
      name: ['', Validators.required],
      imageUrl: ['', Validators.required],
      stars: [0, Validators.required],
      origins: [[]],
      cookTime: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.createFoodForm.controls;
  }

  onSubmit() {
    if (this.createFoodForm.invalid) {
      this.toastrService.warning('Please fill all the fields', 'Invalid Form');
      return;
    }

    this.foodService.createFood(this.createFoodForm.value).subscribe(
      () => {
        this.toastrService.success('Food created successfully', 'Success');
        this.router.navigate(['/']);
      },
      (error) => {
        this.toastrService.error('Error occurred while creating food', 'Error');
      }
    );
  }
}
