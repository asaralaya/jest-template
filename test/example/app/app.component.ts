import { Component, OnInit } from '@angular/core';
import { ExampleService } from '../services/example.service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {
  public data: any;
  public processedValue: string;

  constructor(private exampleService: ExampleService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.exampleService.getData().subscribe(
      (response) => {
        this.data = response;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  submitData(): void {
    const data = {
      // Construct the data object as needed
    };

    this.exampleService.postData(data).subscribe(
      (response) => {
        console.log('Data submitted successfully:', response);
      },
      (error) => {
        console.error('Error submitting data:', error);
      }
    );
  }

  processValue(value: string): void {
    this.processedValue = this.exampleService.performCustomLogic(value);
  }
}
