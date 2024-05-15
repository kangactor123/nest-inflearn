import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostsModel } from './entities/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';

// Provider 로 사용하고 싶은 클래스는
// 1. module 의 provider 에 클래스를 등록
// 2. 클래스에 Injectable 데코레이터를 달아줌
@Injectable()
export class PostsService {
  constructor(
    // repository 를 주입 받을 경우 InjectRepository 데코레이터를 달아야함
    @InjectRepository(PostsModel)
    private readonly postsRepository: Repository<PostsModel>,
  ) {}
  async getAllPost() {
    return this.postsRepository.find();
  }

  async getPostById(postId: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id: postId,
      },
    });

    if (!post)
      throw new NotFoundException('해당하는 게시물이 존재하지 않습니다.');

    return post;
  }

  async createPost(author: string, title: string, content: string) {
    // 1) create -> 저장할 객체를 생성
    // 2) save -> 객체를 저장한다.
    const post = this.postsRepository.create({
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    });

    const newPost = await this.postsRepository.save(post);

    return newPost;
  }

  async updatePost(
    postId: number,
    author: string,
    title: string,
    content: string,
  ) {
    // save 의 기능
    // 1) 만약에 데이터가 존재하지 않는다면 (id 기준으로) 새로 생성한다.
    // 2) 만약에 데이터가 존재한다면 (같은 id) 존재하던 값을 업데이트 한다.
    const post = await this.postsRepository.findOne({
      where: {
        id: postId,
      },
    });

    if (!post) throw new NotFoundException();

    if (author) post.author = author;
    if (title) post.title = title;
    if (content) post.content = content;

    const newPost = await this.postsRepository.save(post);

    return newPost;
  }

  async deletePost(postId: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id: postId,
      },
    });

    if (!post) throw new NotFoundException();

    await this.postsRepository.delete(postId);

    return postId;
  }
}
