import { UsersModel } from 'src/users/entities/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PostsModel {
  @PrimaryGeneratedColumn()
  id: number;

  // 1) UsersModel 과 연동, FK
  // 2) not null
  // 해당 entity 의 관점에서 Many Post, One Author
  @ManyToOne(() => UsersModel, (user) => user.posts, {
    nullable: false,
  }) // user에서 매칭될 fk
  author: UsersModel;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  likeCount: number;

  @Column()
  commentCount: number;
}
