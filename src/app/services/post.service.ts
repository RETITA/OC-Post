import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';


@Injectable()
export class PostService {

    postsSubject = new Subject<any[]>();

    private posts: any[];

    constructor(private httpClient: HttpClient) { }

    savePostsToServer() {
      this.httpClient
        .put('https://oc-post.firebaseio.com/posts.json', this.posts)
        .subscribe(
          () => {
            console.log('Enregistrement terminé !');
          },
          (error) => {
            console.log('Erreur ! : ' + error);
          }
        );
    }

    getPostsFromServer() {
      this.httpClient
        .get<any[]>('https://oc-post.firebaseio.com/posts.json')
        .subscribe(
          (response) => {
            this.posts = response;
            this.emitPostSubject();
          },
          (error) => {
            console.log('Erreur ! : ' + error);
          }
        );
  }

  
  removeOne(i: number) {
    this.posts.splice(i, 1);
    this.savePostsToServer();
    this.emitPostSubject();
  }

  loveIt(i: number){
    this.posts[i].loveIts +=1;
    this.savePostsToServer();
    this.emitPostSubject();
  }

  dontLove(i: number){
    this.posts[i].loveIts -=1;
    this.savePostsToServer();
    this.emitPostSubject();
  }

    emitPostSubject() {
      this.postsSubject.next(this.posts.slice());
    }

    addPost(title: string, content: string) {
      const postObject = {
        id: 0,
        title: '',
        content: '',
        loveIts: 0,
        created_at: new Date()
      };
      postObject.title = title;
      postObject.content = content;
      postObject.id = this.posts[(this.posts.length - 1)].id + 1;
      postObject.created_at = new Date();
      this.posts.push(postObject);
      this.emitPostSubject();
  }
}