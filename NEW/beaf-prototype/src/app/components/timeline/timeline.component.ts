import { Component, OnInit } from '@angular/core';

import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  posts = [];
  postservice: PostService;
  constructor(postservice: PostService) {
    this.postservice = postservice;
  }

  ngOnInit() {
  }

  getPosts() {
    this.posts = this.postservice.fetchPosts();
    return this.posts;
  }

}
