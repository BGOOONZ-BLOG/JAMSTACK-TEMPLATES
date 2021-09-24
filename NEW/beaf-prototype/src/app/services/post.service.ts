import { Injectable } from '@angular/core';

@Injectable()
export class PostService {

  private posts = [
    { name: 'Lucy',
    beforeImg: 'meh3.jpg',
    afterImg: 'meh4.jpg',
    description: 'Hey, I got a new haircut! :)',
    time: 'just now',
    voteA: 0,
    voteB: 0 },

    { name: 'Elon Musk',
    beforeImg: 'elonbefore.jpg',
    afterImg: 'elonafter.jpg',
    description: 'Me some time ago versus me now.',
    time: '4 min ago',
    voteA: 0,
    voteB: 0 },

    { name: 'Ismail',
      beforeImg: 'meh.jpg',
      afterImg: 'meh2.jpg',
      description: 'Working out is worth, don\'t you think?',
      time: '1 hour ago',
      voteA: 0,
      voteB: 0 }
  ];

  constructor() { }

  voteAfter(After)  {

    const pos = this.posts.findIndex((char) => {
      return char.name === After.name;
    });
    if  (this.posts[pos].voteA > 0) {
      return false;
    } else if (this.posts[pos].voteB > 0) {
      return false;
    } else {
      this.posts[pos].voteA += 1;
    }
  }

  voteBefore(Before)  {

    const pos = this.posts.findIndex((char) => {
      return char.name === Before.name;
    });
    if  (this.posts[pos].voteB > 0) {
      return false;
    } else if (this.posts[pos].voteA > 0) {
      return false;
    } else {
        this.posts[pos].voteB += 1;
      }
  }

  fetchPosts() {
    return this.posts;
  }

}
