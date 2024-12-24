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
export class UserService {

  constructor(private http: HttpClient) {
  }

  createOrder(orderData: any): Observable<any> {
    return this.http.post('https://shipping-backend-git-yehiashaikhoun-dev.apps.rm2.thpm.p1.openshiftapps.com/create-order', orderData);

  }

  getOrderDetails(orderId: number): Observable<any> {
    return this.http.get(`https://shipping-backend-git-yehiashaikhoun-dev.apps.rm2.thpm.p1.openshiftapps.com/get-order-details?order_id=${orderId}`);
  }

  getUserOrders(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`https://shipping-backend-git-yehiashaikhoun-dev.apps.rm2.thpm.p1.openshiftapps.com/get-user-orders?user_id=${userId}`);
  }

  deleteOrder(orderId: number): Observable<any> {
    return this.http.delete(`https://shipping-backend-git-yehiashaikhoun-dev.apps.rm2.thpm.p1.openshiftapps.com/delete-order?order_id=${orderId}`);
  }
}

