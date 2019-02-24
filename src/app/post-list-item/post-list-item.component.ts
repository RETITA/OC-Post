import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../services/post.service'

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {

  @Input() postTitle;
  @Input() postContent;
  @Input() postLoveIts;
  @Input() postCreated_at;
  @Input() index: number;

  constructor(private postService: PostService) { 
    
  }

  ngOnInit() {
  }

  onLove(){
    this.postService.loveIt(this.index)
  }

  onDontLove(){
    this.postService.dontLove(this.index)
  }

  onRemove(){
    this.postService.removeOne(this.index)
  }

}
