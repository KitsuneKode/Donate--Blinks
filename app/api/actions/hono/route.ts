// import {
//   Action,
//   ActionError,
//   ActionGetResponse,
//   ActionPostResponse,
//   ACTIONS_CORS_HEADERS,
//   CompletedAction,
// } from '@solana/actions';
// import { headers } from 'next/headers';

// const LOGO =
//   'https://ucarecdn.com/7aa46c85-08a4-4bc7-9376-88ec48bb1f43/-/preview/880x864/-/quality/smart/-/format/auto/';

// export const GET = async () => {
//   const payload: ActionGetResponse = {
//     type: 'action',
//     icon: LOGO,
//     title: 'Action chaining',
//     label: 'Action chaining',
//     description: 'Chaining multiple actions.',
//     links: {
//       actions: [
//         {
//           type: 'post',
//           label: 'Continue',
//           href: '/api/chaining/minimal/post/continue/1',
//         },
//         {
//           type: 'post',
//           label: 'Complete',
//           href: '/api/chaining/minimal/post/complete/1',
//         },
//       ],
//     },
//   };
//   return Response.json(payload, { headers: ACTIONS_CORS_HEADERS });
// };

// export const OPTIONS = GET;

// // app.post('/continue/:num', async (c) => {
// //   const num = parseInt(c.req.param('num'));

// //   return c.json({
// //     type: 'post',
// //     links: {
// //       next: {
// //         type: 'post',
// //         href: `/api/chaining/minimal/post/continue/chain/${num + 1}`,
// //       },
// //     },
// //   } satisfies ActionPostResponse);
// // });

// export const POST = async (req: Request) => {
//   try {
//     const payload: ActionPostResponse = {
//       type: 'post',
//       links: {
//         next: {
//           type: 'post',
//           href: `/api/chaining/minimal/post/continue/chain/num = {num }`,
//           parameters: [{
//             name: 'num',
//             label: 'Enter a number',
//           }]
//         },
//       },
//       return Response.json(payload, {headers: ACTIONS_CORS_HEADERS});
//     };
//   } catch (error) {
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     return Response.json(
//       {
//         message: 'Something went wrong',
//       },
//       {
//         headers: ACTIONS_CORS_HEADERS,
//       }
//     );
//   }
// };

// // app.post('/continue/chain/:num', async (c) => {
// //   const num = c.req.param('num');
// //   return c.json({
// //     type: 'action',
// //     title: `Chained action #${num}`,
// //     label: `Chained action #${num}`,
// //     icon: LOGO,
// //     description: `Chained action #${num}`,
// //     links: {
// //       actions: [
// //         {
// //           type: 'post',
// //           label: 'Continue',
// //           href: `/api/chaining/minimal/post/continue/${num}`,
// //         },
// //         {
// //           type: 'post',
// //           label: 'Complete',
// //           href: `/api/chaining/minimal/post/complete/${num}`,
// //         },
// //       ],
// //     },
// //   } satisfies Action);
// // });

// // app.post('/complete/:num', async (c) => {
// //   const num = parseInt(c.req.param('num'));

// //   return c.json({
// //     type: 'post',
// //     links: {
// //       next: {
// //         type: 'post',
// //         href: `/api/chaining/minimal/post/complete/chain/${num}`,
// //       },
// //     },
// //   } satisfies ActionPostResponse);
// // });

// // app.post('/complete/chain/:num', async (c) => {
// //   const num = c.req.param('num');
// //   return c.json({
// //     type: 'completed',
// //     icon: LOGO,
// //     title: `Action completed with ${num} chained actions`,
// //     label: `Action`,
// //     description: `Action completed with ${num} chained actions`,
// //   } satisfies CompletedAction);
// // });

// // export default app;
