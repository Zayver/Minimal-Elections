import { Module, OnModuleInit } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { VoteController } from './controller/vote/vote.controller';
import { VoteService } from './service/vote/vote.service';
import { DataSource, EntityManager } from 'typeorm';
import { Personero } from './entity/personero.entity';
import { Representative } from './entity/representative.entity';
import { VotePersonero, VoteRepresentative } from './entity/vote.entity';
import { AdminController } from './controller/admin/admin.controller';
import { AdminService } from './service/admin/admin.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'votes.db',
      entities: [Personero, Representative, VotePersonero, VoteRepresentative],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client/browser'),
      exclude: ['/api/(.*)'],
    }),
  ],
  controllers: [VoteController, AdminController],
  providers: [VoteService, AdminService],
})
export class AppModule implements OnModuleInit {
  constructor(private ds: DataSource, private em: EntityManager) {}

  private readonly placeHolder =
    'https://thumbs.dreamstime.com/b/hombre-gris-del-placeholder-de-la-foto-persona-gen%C3%A9rica-silueta-en-un-fondo-blanco-144511705.jpg';

  private readonly personeros = [
    { imgUrl: this.placeHolder, name: 'Persona 1' },
    { imgUrl: this.placeHolder, name: 'Persona 1' },
    { imgUrl: this.placeHolder, name: 'Persona 1' },
    { imgUrl: this.placeHolder, name: 'Persona 1' },
    { imgUrl: this.placeHolder, name: 'Persona 1' },
    { imgUrl: this.placeHolder, name: 'Persona 1' },
  ];
  private readonly Representatives = [
    { imgUrl: this.placeHolder, name: 'Persona 4' },
    { imgUrl: this.placeHolder, name: 'Persona 4' },
    { imgUrl: this.placeHolder, name: 'Persona 4' },
    { imgUrl: this.placeHolder, name: 'Persona 4' },
    { imgUrl: this.placeHolder, name: 'Persona 4' },
    { imgUrl: this.placeHolder, name: 'Persona 4' },
  ];
  
  async onModuleInit() {
    const count = await this.em.count(Personero);
    if (count !== 0) return;

    await this.ds
      .createQueryBuilder()
      .insert()
      .into(Personero)
      .values(this.personeros)
      .execute();

    await this.ds
      .createQueryBuilder()
      .insert()
      .into(Representative)
      .values(this.Representatives)
      .execute();

    const personeros = await this.em.find(Personero);
    personeros.forEach((p) => {
      this.em.insert(VotePersonero, { voteCount: 0, idCandidate: p });
    });

    const representatives = await this.em.find(Representative);
    representatives.forEach((p) => {
      this.em.insert(VoteRepresentative, { voteCount: 0, idCandidate: p });
    });
  }
}
