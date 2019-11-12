import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Users } from '../src/user/user.entity';

export default class CreateUsers implements Seeder {
  async getUserValue() {
    const password = await bcrypt.hash('password', 10);
    return { username: 'emasys', password };
  }

  public async run(factory: Factory, connection: Connection): Promise<any> {
    const values = await this.getUserValue();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Users)
      .values(values)
      .execute();
  }
}
