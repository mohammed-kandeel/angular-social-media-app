import { Component, HostBinding } from '@angular/core';
import { SettingChangePasswordComponent } from '../../components/setting-change-password/setting-change-password.component';

@Component({
  selector: 'app-setting-page',
  imports: [SettingChangePasswordComponent],
  templateUrl: './setting-page.component.html',
  styleUrl: './setting-page.component.css',
})
export class SettingPageComponent {}
