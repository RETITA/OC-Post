import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service'
import { from } from 'rxjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts: any[];
  postSubscription: Subscription;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPostsFromServer();
    this.postSubscription = this.postService.postsSubject.subscribe(

      (posts: any[]) => {
        this.posts = posts;
      }
    );

    this.postService.emitPostSubject();
  }

}
