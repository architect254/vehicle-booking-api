import { Module, OnApplicationBootstrap } from "@nestjs/common";

import { CoreModule } from './core/core.module';
import { FeatureModule } from "./feature/feature.module";

import { AppController } from "./app.controller";

import { AppService } from "./app.service";
import { UserService } from "./core/user.service";



@Module({
  imports: [
    CoreModule,
    FeatureModule,
  ],
  controllers: [AppController],
  providers:[
    AppService,
  ]
})
export class AppModule implements OnApplicationBootstrap {
  constructor(
    private userService: UserService,
  ) {}
  async onApplicationBootstrap() {
    const users = await this.userService.readAll(undefined, undefined);

    // if (!users || users.length == 0) {
    //   await this.userService.create(
    //     {
    //       name: `SYSTEM`,
    //       email: `official.jared.bada@gmail.com`,
    //       role: UserRole.SYSTEM
    //     },
    //     null,
    //   );
    // }
  }
}
