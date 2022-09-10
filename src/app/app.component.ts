import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { TokenService } from './authentication/services/token.service';
import { IdleService } from './components/services/idle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'developer-portal';

  constructor(
    private idleService: IdleService,
    private tokenService: TokenService
  ) {
    this.loadScripts()
  }

  ngOnInit(): void {
    this.initialIdleSettings();
  }

  loadScripts() {

    // This array contains all the files/CDNs
    const dynamicScripts = [
        'assets/js/jquery-3.6.0.min.js',
        'assets/js/jquery-migrate-3.4.0.min.js',
        'assets/js/plugins.js',
        'assets/js/scripts.js'
    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      document.getElementsByTagName('head')[0].appendChild(node);
    }
 }

  private initialIdleSettings() {
    const idleTimeoutInSeconds: number = environment.idleTimeInMinutes * 60;
    this.idleService.startWatching(idleTimeoutInSeconds).subscribe((isTimeOut: boolean) => {
      if (isTimeOut) {
          this.tokenService.logout()
      }
    });
  }
}
