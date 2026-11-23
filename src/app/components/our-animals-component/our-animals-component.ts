import { Component } from '@angular/core';
import { Animals } from '../../classes/Animals';
import { AnimalService } from '../../services/animal-service'

@Component({
  selector: 'app-our-animals-component',
  standalone: false,
  templateUrl: './our-animals-component.html',
  styleUrl: './our-animals-component.css',
})
export class OurAnimalsComponent {
  constructor(public a: AnimalService) { }

  animals: Array<Animals> = new Array<Animals>();
  selectedAnimal: Animals = new Animals();
  flag: boolean = false;

  ngOnInit(): void {
    this.a.GetAllAnimals().subscribe(data => {
      this.animals = data;
    });
  }

  showImage(selectedAnimal: Animals) {
    this.selectedAnimal = { ...selectedAnimal };
    this.flag = true;
  }

  closeImage() {
    this.flag = false;
    this.selectedAnimal = new Animals();
  }
}