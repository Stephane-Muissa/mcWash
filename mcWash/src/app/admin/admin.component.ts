import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule, FormsModule, NgxPaginationModule
  ],
  template: `<div class="admin-container">
  <h2>Admin Console</h2>

  <section class="manage-services">
    <h3>Manage Services</h3>
    <form  #serviceForm="ngForm" class="service-form">
      <div class="form-group">
        <label for="serviceName">Service Name:</label>
        <input type="text" id="serviceName" required ngModel name="serviceName">
      </div>

      <div class="form-group">
        <label for="serviceDescription">Description:</label>
        <textarea id="serviceDescription" required ngModel name="serviceDescription" rows="3"></textarea>
      </div>

      <div class="form-group">
        <label for="serviceImage">Image URL:</label>
        <input type="text" id="serviceImage" required ngModel name="serviceImage">
      </div>

      <button type="submit" class="submit-button">Add Service</button>
    </form>
  </section>

  <section class="user-feedback">
    <h3>User Feedback</h3>
    <ul>
      <li *ngFor="let feedback of userFeedback">
        <p><strong>{{ feedback.user }}:</strong> {{ feedback.message }}</p>
      </li>
    </ul>
  </section>

  <section class="manage-team">
    <h3>Manage Team Members</h3>
    <form  #teamForm="ngForm" class="team-form">
      <div class="form-group">
        <label for="memberName">Team Member Name:</label>
        <input type="text" id="memberName" required ngModel name="memberName">
      </div>

      <div class="form-group">
        <label for="memberPosition">Position:</label>
        <input type="text" id="memberPosition" required ngModel name="memberPosition">
      </div>

      <div class="form-group">
        <label for="memberImage">Image URL:</label>
        <input type="text" id="memberImage" required ngModel name="memberImage">
      </div>

      <button type="submit" class="submit-button">Add Team Member</button>
    </form>
  </section>

  <section class="order-history">
    <h3>Order History</h3>
    <table>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>User</th>
          <th>Service</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let order of orderHistory | paginate: { itemsPerPage: 5, currentPage: p }">
          <td>{{ order.id }}</td>
          <td>{{ order.user }}</td>
          <td>{{ order.service }}</td>
          <td>{{ order.date | date }}</td>
          <td>{{ order.status }}</td>
        </tr>
      </tbody>
    </table>
    <pagination-controls (pageChange)="p = $event"></pagination-controls>
    <p>Page: {{ p }}</p>
  </section>

  <section class="current-payments">
    <h3>Current Payments</h3>
    <table>
      <thead>
        <tr>
          <th>Payment ID</th>
          <th>User</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let payment of currentPayments | paginate: { itemsPerPage: 5, currentPage: p2 }">
          <td>{{ payment.id }}</td>
          <td>{{ payment.user }}</td>
          <td>{{ payment.amount | currency }}</td>
          <td>{{ payment.date | date }}</td>
          <td>{{ payment.status }}</td>
        </tr>
      </tbody>
    </table>
    <pagination-controls (pageChange)="p2 = $event"></pagination-controls>
    <p>Page: {{ p2 }}</p>
  </section>

  <section class="user-details">
    <h3>User Details</h3>
    <table>
      <thead>
        <tr>
          <th>User ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Joined</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let user of users | paginate: { itemsPerPage: 5, currentPage: p3 }">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.joined | date }}</td>
        </tr>
      </tbody>
    </table>
    <pagination-controls (pageChange)="p3 = $event"></pagination-controls>
    <p>Page: {{ p3 }}</p>
  </section>
</div>`,
  styleUrl: './admin.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent { 
  p: number = 1;  // For order history pagination
  p2: number = 1; // For current payments pagination
  p3: number = 1; // For user details pagination

  userFeedback = [
    { user: 'John Doe', message: 'Great service!' },
    { user: 'Jane Smith', message: 'Very satisfied with my experience.' },
    { user: 'Emily Johnson', message: 'Friendly staff and quick service.' }
  ];

  services:any = [];

  addService(serviceForm: any) {
    const newService = {
      name: serviceForm.serviceName,
      description: serviceForm.serviceDescription,
      image: serviceForm.serviceImage
    };
    this.services.push(newService);
    serviceForm.reset();
  }

  teamMembers:any = [];

  addTeamMember(teamForm: any) {
    const newMember = {
      name: teamForm.memberName,
      position: teamForm.memberPosition,
      image: teamForm.memberImage
    };
    this.teamMembers.push(newMember);
    teamForm.reset();
  }

  orderHistory = [
    { id: 1, user: 'John Doe', service: 'Full Service Wash', date: new Date(), status: 'Completed' },
    { id: 2, user: 'Jane Smith', service: 'Express Wash', date: new Date(), status: 'Pending' },
    { id: 3, user: 'Emily Johnson', service: 'Detailing Package', date: new Date(), status: 'Completed' },
    // Add more orders for testing pagination
  ];

  currentPayments = [
    { id: 'P001', user: 'John Doe', amount: 29.99, date: new Date(), status: 'Paid' },
    { id: 'P002', user: 'Jane Smith', amount: 15.99, date: new Date(), status: 'Pending' },
    { id: 'P003', user: 'Emily Johnson', amount: 79.99, date: new Date(), status: 'Paid' }
  ];

  users = [
    { id: 'U001', name: 'John Doe', email: 'john@example.com', joined: new Date('2022-01-01') },
    { id: 'U002', name: 'Jane Smith', email: 'jane@example.com', joined: new Date('2022-01-15') },
    { id: 'U003', name: 'Emily Johnson', email: 'emily@example.com', joined: new Date('2022-02-20') }
  ];
}
