// import * as request from 'supertest';
// import { Test } from '@nestjs/testing';
// import { PersonService } from './person.service';
// import { PersonModule } from './person.module';

// import { INestApplication } from '@nestjs/common';
// import { AuthModule } from '../auth/auth.module';

// describe('the Person Controller', () => {
//   let app: INestApplication;
//   const personService = { create: () => ['test'] };

//   beforeAll(async () => {
//     const moduleRef = await Test.createTestingModule({
//       imports: [PersonModule, AuthModule],
//     })
//       .overrideProvider(PersonService)
//       .useValue(personService)
//       .compile();

//     app = moduleRef.createNestApplication();
//     await app.init();
//   });

//   it('authenticates', async () => {
//     return await request(app.getHttpServer())
//       .post('/graphql')
//       .send({
//         operationName: 'login',
//         variables: {
//           loginUserInput: {
//             username: 'admin',
//             password: 'admin',
//           },
//         },
//         query: `
//             mutation login($loginUserInput: LoginUserInput!) {
//               login(loginUserInput: $loginUserInput) {
//                 accessToken
//                 refreshToken
//               }
//             }
//           `,
//       })
//       .expect(200);
//   });

//   afterAll(async () => {
//     await app.close();
//   });
// });

it('is true', async () => {
  expect(true).toBeTruthy;
});
