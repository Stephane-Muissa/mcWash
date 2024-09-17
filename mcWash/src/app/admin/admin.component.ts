import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminService } from '../servicesFolder/admin.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule, FormsModule, NgxPaginationModule
  ],
  template: `
<div class="admin-container">
  <h2>Admin Console</h2>

  <section class="order-history">
  <h3>Order History</h3>
  <input class="search-box" type="text"  [(ngModel)]="orderSearch" placeholder="Search by name" (input)="filterOrders()" />
  <select [(ngModel)]="orderSort" (change)="sortOrders()">
    <option value="asc">Sort by Date (Ascending)</option>
    <option value="desc">Sort by Date (Descending)</option>
  </select>
  <div class="card-container">
    <div class="card" *ngFor="let order of filteredOrders | paginate: { itemsPerPage: 3, currentPage: p }">
      <div class="card-header">
        <span class="label">Order ID:</span> {{ order.id }}
      </div>
      <div class="card-body">
        <div><span class="label">Name:</span> {{ order.name }}</div>
        <div><span class="label">Email:</span> {{ order.email }}</div>
        <div><span class="label">Service:</span> {{ order.service }}</div>
        <div><span class="label">Package:</span> {{ order.package | currency}}</div>
        <div><span class="label">Date:</span> {{ order.date }}</div>
        <div><span class="label">Time:</span> {{ order.time }}</div>
        <div><span class="label">Status:</span> {{ order.status }}</div>
      </div>
    </div>
    <div *ngIf="!filteredOrders.length" class="card empty-card">
      No orders found.
    </div>
  </div>
  <pagination-controls (pageChange)="p = $event"></pagination-controls>
  <p>Page: {{ p }}</p>
</section>

<section class="current-payments">
  <h3>Current Payments</h3>
  <input class="search-box" type="text" [(ngModel)]="paymentSearch" placeholder="Search by name" (input)="filterPayments()" />
  <div class="card-container">
    <div class="card" *ngFor="let payment of filteredPayments | paginate: { itemsPerPage: 3, currentPage: p2 }">
      <div class="card-header">
        <span class="label">Payment ID:</span> {{ payment.id }}
      </div>
      <div class="card-body">
        <div><span class="label">Name:</span> {{ payment.name }}</div>
        <div><span class="label">Amount:</span> {{ payment.amount | currency }}</div>
        <div><span class="label">Date:</span> {{ payment.date | date }}</div>
        <div><span class="label">Order ID:</span> {{ payment.orderId }}</div>
        <div><span class="label">Status:</span> {{ payment.status }}</div>
      </div>
    </div>
    <div *ngIf="!filteredPayments.length" class="card empty-card">
      No payments found.
    </div>
  </div>
  <pagination-controls (pageChange)="p2 = $event"></pagination-controls>
  <p>Page: {{ p2 }}</p>
</section>

  <section class="user-details">
  <h3>User Details</h3>
  <input class="search-box" type="text"  [(ngModel)]="userSearch" placeholder="Search by name" (input)="filterUsers()" />
  <div class="card-container">
    <div class="card" *ngFor="let user of filteredUsers | paginate: { itemsPerPage: 3, currentPage: p3 }">
      <div class="card-header">
        <span class="label">User ID:</span> {{ user.id }}
      </div>
      <div class="card-body">
        <div><span class="label">Name:</span> {{ user.name }}</div>
        <div><span class="label">Email:</span> {{ user.email }}</div>
        <div><span class="label">Joined:</span> {{ user.joined | date }}</div>
      </div>
    </div>
    <div *ngIf="!filteredUsers.length" class="card empty-card">
      No users found.
    </div>
  </div>
  <pagination-controls (pageChange)="p3 = $event"></pagination-controls>
  <p>Page: {{ p3 }}</p>
</section>
</div>`,
  styleUrl: './admin.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent { 
  p:number = 1;
  p2:number = 1;
  p3:number = 1;

  adminService = inject(AdminService)
  orderSearch: string = '';
  paymentSearch: string = '';
  userSearch: string = '';
  
  filteredOrders: any[] = [];
  filteredPayments: any[] = [];
  filteredUsers: any[] = [];
  
  orderSort: string = 'asc'; // Default sort order for orders
  ngOnInit() {
    this.getOrders();
    this.getPayments();
    this.getUsers();
  }

  getOrders() {
    this.adminService.getOrders().pipe(
      tap(data => {
        this.filteredOrders = data; // Set to all orders initially
      })
    ).subscribe();
  }

  getPayments() {
    this.adminService.getPayments().pipe(
      tap(data => {
        this.filteredPayments = data; // Set to all payments initially
      })
    ).subscribe();
  }

  getUsers() {
    this.adminService.getUsers().pipe(
      tap(data => {
        this.filteredUsers = data; // Set to all users initially
      })
    ).subscribe();
  }

  filterOrders() {
    this.getOrders(); // Re-fetch to reset
    this.filteredOrders = this.filteredOrders.filter(order => 
      order.name.toLowerCase().includes(this.orderSearch.toLowerCase())
    );
  }

  sortOrders() {
    this.filteredOrders.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return this.orderSort === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    });
  }

  filterPayments() {
    this.getPayments(); // Re-fetch to reset
    this.filteredPayments = this.filteredPayments.filter(payment => 
      payment.name.toLowerCase().includes(this.paymentSearch.toLowerCase())
    );
  }

  filterUsers() {
    this.getUsers(); // Re-fetch to reset
    this.filteredUsers = this.filteredUsers.filter(user => 
      user.name.toLowerCase().includes(this.userSearch.toLowerCase())
    );
  }
}
