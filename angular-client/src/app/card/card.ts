import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  private id: string = '';
  Card(id: string) {
    this.id = id;
  }
  async view(id: string) {}
  async edit(id: string) {}
  async delete(id: string) {}
}
