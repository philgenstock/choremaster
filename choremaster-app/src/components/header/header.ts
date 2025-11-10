import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatIcon, MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

}
