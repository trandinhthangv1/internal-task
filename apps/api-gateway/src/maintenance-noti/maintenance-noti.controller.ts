import { Controller, Get, Sse } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';

@Controller('maintenance-noti')
export class MaintenanceNotiController {
  private sseSubject = new Subject<any>();

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return this.sseSubject.asObservable();
  }

  @Get()
  notification() {
    console.log('123');
    return this.sseSubject.next(
      'Hệ thống sắp bảo trì, vui lòng hoãn lại các hành động',
    );
  }
}

// <script type="text/javascript">
// const eventSource = new EventSource(
//   'http://localhost:3000/maintenance-noti/sse',
// );
// eventSource.onmessage = ({ data }) => {
//   const message = document.createElement('li');
//   message.innerText = 'New message: ' + data;
//   document.body.appendChild(message);
// };
// </script>
