import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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

export class AdminService {

  constructor(private http: HttpClient) {
  }

  getOrderDetails(orderId: number): Observable<any> {
    return this.http.get(`https://shipping-backend-git-yehiashaikhoun-dev.apps.rm2.thpm.p1.openshiftapps.com/get-order-details?order_id=${orderId}`);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>('https://shipping-backend-git-yehiashaikhoun-dev.apps.rm2.thpm.p1.openshiftapps.com/get-orders');
  }

  updateOrderStatus(orderId: number, status: string): Observable<any> {
    return this.http.put('https://shipping-backend-git-yehiashaikhoun-dev.apps.rm2.thpm.p1.openshiftapps.com/update-order-status-admin', {id: orderId, status: status});
  }

  deleteOrder(orderId: number): Observable<any> {
    return this.http.delete(`https://shipping-backend-git-yehiashaikhoun-dev.apps.rm2.thpm.p1.openshiftapps.com/delete-order-admin?order_id=${orderId}`);
  }

  assignOrder(orderId: number, courierId: number): Observable<any> {
    return this.http.put(`https://shipping-backend-git-yehiashaikhoun-dev.apps.rm2.thpm.p1.openshiftapps.com/assign-order`, {id: orderId, courier_id: courierId});
  }

  getCouriers(): Observable<Array<{ id: number, username: string }>> {
    return this.http.get<Array<{ id: number, username: string }>>('https://shipping-backend-git-yehiashaikhoun-dev.apps.rm2.thpm.p1.openshiftapps.com/get-couriers');
  }


}
