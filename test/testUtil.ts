import * as request from 'supertest';
import { getConnection } from 'typeorm';

export async function generateDummyData(app): Promise<string> {
  let token: string;
  let retries = 0;
  const {
    body: { access_token },
  } = await request(app.getHttpServer())
    .post('/auth/signup')
    .set('Accept', 'application/json')
    .send({ username: 'emmanuel', password: 'password' });

  token = access_token;

  await request(app.getHttpServer())
    .post('/state')
    .set('Authorization', `Bearer ${token}`)
    .send({ name: 'Lagos', shortCode: 'LA' });

  await request(app.getHttpServer())
    .post('/constituency')
    .set('Authorization', `Bearer ${token}`)
    .send({ name: 'some const', stateId: 1 });

  if (!token && retries < 4) {
    retries++;
    await getConnection().synchronize(true);
    return generateDummyData(app);
  }

  return token;
}
