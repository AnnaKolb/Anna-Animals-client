import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

interface Animal {
  id: number;
  name: string;
}

@Component({
  standalone: true,
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'], // Correct property name
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class SelectComponent implements OnInit {
  readAnimal: Animal[] = [];
  selectedAnimalDescription: any;

  animalControl = new FormControl<number | null>(null, Validators.required);

  constructor(private router: Router, private api: ApiServiceService) {}

  ngOnInit(): void {
    this.getAlldata();
  }

  getAlldata(): void {
    console.log('inside getAll data');
    this.api.getAllAnimals()
      .then((res: any) => {
        console.log('this is res data', res);
        this.readAnimal = res.data || []; // Initialize with empty array if res is falsy
        console.log('Received data:', this.readAnimal);
      })
      .catch((error: any) => {
        console.error('Error fetching all animals:', error);
      });
  }

  async onAnimalSelected(selectedId: number): Promise<void> {
    console.log('Selected animal ID:', selectedId);

    if (selectedId < 0) {
      this.selectedAnimalDescription = ''; // Handle default case where 'Select your Animal' is selected
      return;
    }

    try {
      const description = await this.api.getDescription(selectedId);
      console.log('Selected animal description:', description);
      this.selectedAnimalDescription = description || 'Animal description not found';
    } catch (error) {
      console.error('Error fetching animal description:', error);
      this.selectedAnimalDescription = 'Error fetching description';
    }
  }
}
