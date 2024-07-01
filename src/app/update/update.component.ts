import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ApiServiceService } from '../api-service.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

export interface PeriodicElement {
  name: string;
  description: string;
}

let readAnimal: any[] = [];

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatTableModule,
    MatIconModule,
  ],
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'], // Correct property name
})
export class UpdateComponent implements OnInit {
  constructor(private router: Router, private api: ApiServiceService) {}

  successMsg: string | null = null;
  errorMsg: string | null = null;

  displayedColumns: string[] = ['name', 'description', 'delete', 'edit'];
  dataSource = new MatTableDataSource<PeriodicElement>([]); // Initialize with an empty array
  clickedRows = new Set<PeriodicElement>();

  ngOnInit(): void {
    this.getAlldata();
  }

  deleteId(id: any): void {
    console.log('Deleting animal with ID:', id);
    this.api
      .deleteData(id)
      .then((res: any) => {
        console.log('Deleted animal successfully:', res);
        this.successMsg = 'Animal deleted successfully';
        this.getAlldata();
      })
      .catch((error: any) => {
        console.error('Error deleting animal:', error);
        this.errorMsg = 'Failed to delete animal.';
      });
  }

  getAlldata(): void {
    this.api
      .getAllAnimals()
      .then((res: any) => {
        readAnimal = res.data.map((element: any) => ({
          ...element,
          name: element.name,
          description: element.description,
        }));
        console.log('Data output:', readAnimal);
        this.dataSource.data = readAnimal; // Update dataSource after fetching data
      })
      .catch((error: any) => {
        console.error('Error fetching all animals:', error);
        this.errorMsg = 'Failed to fetch animals.';
      });
  }
}
