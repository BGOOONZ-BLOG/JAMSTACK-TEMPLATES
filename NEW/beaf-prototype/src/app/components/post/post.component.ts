import { Component, OnInit, Input } from '@angular/core';

import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post;
  postservice: PostService;

  constructor(postservice: PostService) {
    this.postservice = postservice;
  }

  ngOnInit() {
  }

  voteA(After) {
    this.postservice.voteAfter({ name: this.post.name, voteA: After});
  }

  voteB(Before) {
    this.postservice.voteBefore({ name: this.post.name, voteB: Before});
  }

}
