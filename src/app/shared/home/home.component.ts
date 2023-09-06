import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentIndex = 0;
  images: string[] = [
    '/assets/images/fashion.jpg',
    '/assets/images/fashion1.webp',
    '/assets/images/fashion2.jpg'
  ];
  currentSlide!: string;

  ngOnInit() {
    this.changeSlide();
    setInterval(() => this.nextSlide(), 2000);
  }

  changeSlide() {
    this.currentSlide = this.images[this.currentIndex];
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.changeSlide();
  }

  previousSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.changeSlide();
  }
}
