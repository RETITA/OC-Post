import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../services/post.service'
import {  Router } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  constructor(private postService: PostService,

    private router: Router) { }

  ngOnInit() {
    this.postService.getPostsFromServer();
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    const title = form.value['title'];
    const content = form.value['content'];

    this.postService.addPost(title, content);
    this.postService.savePostsToServer();
    this.router.navigate(['/posts']);

  }
}
