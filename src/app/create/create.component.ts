import { Component, OnInit, ViewChild, signal } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule,Validators,} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

import { ApiServiceService } from '../api-service.service';
import { ActivatedRoute } from '@angular/router';

export interface PeriodicElement {
  id: number;
  name: string;
  description: string;
  created_At: Date;
  updated_At: Date;
}

let readAnimal: any[] = [];

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  constructor(private api: ApiServiceService, private router: ActivatedRoute) {}

  errMsg: any;
  successMsg: any;
  getparamid: any;

  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'created_At',
    'updated_At',
  ];

  dataSource = new MatTableDataSource<PeriodicElement>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAlldata() {
    this.api
      .getAllAnimals()
      .then((res: any) => {
        readAnimal = res.data.map((element: any) => ({
          ...element,
          created_At: new Date(element.created_At), // Assuming API returns date as a string
          updated_At: new Date(element.updated_At), // Assuming API returns date as a string
        }));
        console.log('Data output:', readAnimal);
        this.dataSource.data = readAnimal; // Update dataSource after fetching data
      })
      .catch((error: any) => {
        console.error('Error fetching all animals:', error);
      });
  }

  ngOnInit() {
    this.getAlldata(); // Fetch all animals when component initializes
    this.getparamid = this.router.snapshot.paramMap.get('id'); // Get the 'id' parameter from the route
    console.log('getparamid:', this.getparamid);

    if (this.getparamid) {
      this.api
        .getSingleData(this.getparamid)
        .then((res: any) => {
          console.log('Selected update data:', res);
          if (res.data && res.data.length > 0) {
            const selectedAnimal = res.data[0]; // Assuming API returns data as an array
            this.animalForm.patchValue({
              id: selectedAnimal.id,
              name: selectedAnimal.name,
              description: selectedAnimal.description,
            });
          } else {
            console.error('Animal not found with ID:', this.getparamid);
          }
        })
        .catch((error: any) => {
          console.error('Error fetching single data:', error);
        });
    }
  }

  animalForm = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    created_At: new FormControl(new Date().toISOString()),
    updated_At: new FormControl(new Date().toISOString()),
  });

  animalSubmit() {
    console.log('Submitting animal form');
    console.log(this.animalForm.value); // Check if form values are correctly populated

    if (this.animalForm.valid) {
      this.api
        .createAnimal(this.animalForm.value)
        .then((res: any) => {
          console.log('Data Added Successfully:', res);
          this.animalForm.reset();

          this.successMsg = res.message;
          this.getAlldata(); // Refresh data after successful submission
        })
        .catch((error: any) => {
          console.error('Error adding animal:', error);

          this.errMsg = 'Error adding animal';
        });
    } else {
      this.errMsg = 'All Fields Are Required';
    }
  }

  updateAnimal() {
    console.log('update animal function in component', this.animalForm.value);

    if (this.animalForm.valid) {
      const { id, name, description } = this.animalForm.value;
      const dataToUpdate = { name, description }; // Assuming your form structure matches the expected data structure

      this.api
        .updateData(id, dataToUpdate)
        .then((res: any) => {
          console.log('Data Updated Successfully', res);
          this.successMsg = res.message;
          this.getAlldata(); // Refresh data after update
        })
        .catch((error: any) => {
          console.error('Error updating animal:', error);
          // Handle error as needed
        });
    } else {
      this.errMsg = 'All Fields Are Required';
    }
  }
}
