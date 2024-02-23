import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Result } from '../../domain/result.entity';
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'elections-admin',
  standalone: true,
  imports: [HeaderComponent, HttpClientModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  providers: [AdminService]
})
export class AdminComponent implements OnInit{

  resultP: Result [] = []
  resultR: Result [] = []

  seeResults = false

  constructor(private adminService: AdminService){}

  ngOnInit(): void {
    this.refresh()
  }

  showResults() {
    this.seeResults = !this.seeResults
  }

  refresh(){
    this.adminService.getPersoneroResults().subscribe({
      next: (r) => this.resultP = r,
      error: (e) => console.error(e)
    })

    this.adminService.getRepresentativeResults().subscribe({
      next: (r) => this.resultR = r,
      error: (e) => console.error(e)
    })
  }



}
