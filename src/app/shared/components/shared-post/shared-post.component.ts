import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ViewImgPostComponent } from '../post/components/view-img-post/view-img-post.component';
import { DatePipe } from '@angular/common';
import { ISharedPost } from '../../../core/interfaces/ishared-post.interface';
import { IPost } from '../../../core/interfaces/i-post.interface';

@Component({
  selector: 'app-shared-post',
  imports: [RouterLink, ViewImgPostComponent, DatePipe],
  templateUrl: './shared-post.component.html',
  styleUrl: './shared-post.component.css',
})
export class SharedPostComponent {
  @Input() sharedPost!: ISharedPost;
  @Input() sharedPost2!: IPost;
  @Input() showFooter: boolean = false;

  post!: ISharedPost | IPost;

  ngAfterContentInit(): void {
    if (this.sharedPost) this.post = this.sharedPost;
    else this.post = this.sharedPost2;
  }

  isViewImg: boolean = false;

  onViewImg() {
    this.isViewImg = true;
  }
  onCloseImg(event: boolean) {
    if (event) this.isViewImg = false;
  }
}
