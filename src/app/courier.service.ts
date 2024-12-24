import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';

interface Order {
  id: number;
  pickup_location: string;
  dropoff_location: string;
  package_details: string;
  delivery_time: string;
  user_id: number;
  status: string;
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root'
})


export class CourierService {

  constructor(private http: HttpClient) {
  }

  getAssignedOrders(courier_id: number): Observable<Order[]> {
    return this.http.get<Order[]>(`https://shipping-backend-git-yehiashaikhoun-dev.apps.rm2.thpm.p1.openshiftapps.com/get-courier-orders?courier_id=${courier_id}`);
  }

  getAcceptedOrders(courier_id: number): Observable<Order[]> {
    return this.http.get<Order[]>(`https://shipping-backend-git-yehiashaikhoun-dev.apps.rm2.thpm.p1.openshiftapps.com/get-accepted-orders?courier_id=${courier_id}`);
  }

  getOrderDetails(orderId: number): Observable<Order> {
    return this.http.get<Order>(`https://shipping-backend-git-yehiashaikhoun-dev.apps.rm2.thpm.p1.openshiftapps.com/get-order-details?order_id=${orderId}`);
  }

  acceptOrder(orderId: number): Observable<any> {
    return this.http.put(`https://shipping-backend-git-yehiashaikhoun-dev.apps.rm2.thpm.p1.openshiftapps.com/accept-order?order_id=${orderId}`, {});
  }

  declineOrder(orderId: number): Observable<any> {
    return this.http.put(`https://shipping-backend-git-yehiashaikhoun-dev.apps.rm2.thpm.p1.openshiftapps.com/decline-order?order_id=${orderId}`, {});
  }

  updateOrderStatus(orderId: number, status: string): Observable<any> {
    return this.http.put('https://shipping-backend-git-yehiashaikhoun-dev.apps.rm2.thpm.p1.openshiftapps.com/update-order-status-admin', {id: orderId, status: status});
  }

}
