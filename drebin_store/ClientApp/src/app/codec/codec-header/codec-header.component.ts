import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CodecContact } from '../models/codec-contact';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-codec-header',
  templateUrl: './codec-header.component.html',
  styleUrls: ['./codec-header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodecHeaderComponent {

  @Input()
  contact: CodecContact;

  userAvatarPath: string;

  constructor(private userService: UserService) {
    const currentUser = userService.currentUser;
    this.userAvatarPath = currentUser.vkData ?
      currentUser.vkData.photo_200 :
      userService.getAvatarPath(currentUser.id);
  }

}
