import { Injectable, NotFoundException } from '@nestjs/common';

export interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

let posts: PostModel[] = [
  {
    id: 1,
    author: 'newjeans',
    title: '뉴진스',
    content: '뉴진스 컴백',
    likeCount: 3300,
    commentCount: 30000,
  },
  {
    id: 2,
    author: 'newjeans',
    title: '뉴진스',
    content: '뉴진스 컴백',
    likeCount: 3300,
    commentCount: 30000,
  },
  {
    id: 3,
    author: 'blackpink',
    title: '블랙핑크',
    content: '블핑 컴백',
    likeCount: 3300,
    commentCount: 30000,
  },
];

// Provider 로 사용하고 싶은 클래스는
// 1. module 의 provider 에 클래스를 등록
// 2. 클래스에 Injectable 데코레이터를 달아줌
@Injectable()
export class PostsService {
  getAllPost() {
    return posts;
  }

  getPostById(postId: number) {
    const post = posts.find(({ id }) => id === +postId);
    if (!post)
      throw new NotFoundException('해당하는 post 가 존재하지 않습니다.');

    return post;
  }

  createPost(author: string, title: string, content: string) {
    const post: PostModel = {
      id: posts[posts.length - 1].id + 1,
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    };

    posts = [...posts, post];

    return post;
  }

  updatePost(postId: number, author: string, title: string, content: string) {
    const post = posts.find(({ id }) => +postId === id);

    if (!post) throw new NotFoundException();

    if (author) post.author = author;
    if (title) post.title = title;
    if (content) post.content = content;

    posts = posts.map((prevPost) =>
      prevPost.id === +postId ? post : prevPost,
    );

    return post;
  }

  deletePost(postId: number) {
    const post = posts.find(({ id }) => +postId === id);

    if (!post) throw new NotFoundException();

    posts = posts.filter(({ id }) => +postId !== id);

    return postId;
  }
}
