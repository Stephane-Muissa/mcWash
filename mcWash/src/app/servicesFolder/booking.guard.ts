import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { OrderService } from './order.service';

export const bookingGuard: CanActivateFn = (route, state) => {
  const orderService = inject(OrderService);
  const router = inject(Router); // Inject Router

  const isSubmitted = orderService.isBookingSubmitted(); // Check booking submission status
  if (!isSubmitted) {
    router.navigate(['/booking']); // Redirect if not submitted
    return false;
  }

  return true;
};
