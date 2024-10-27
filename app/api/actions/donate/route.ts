import {
  ActionGetResponse,
  ACTIONS_CORS_HEADERS,
  ActionPostRequest,
  ActionPostResponse,
  createPostResponse,
} from '@solana/actions';

import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';

export const GET = async (req: Request) => {
  const payload: ActionGetResponse = {
    icon: new URL('/Random.gif', new URL(req.url).origin).toString(),
    label: 'Buy me some happiness',
    description:
      'Buy me some happiness by donating me some SOL with this cool blink of mine',
    title: 'KitsuneKode - Buy me some Happiness',
    links: {
      actions: [
        {
          type: 'transaction',
          href: '/api/actions/donate?amount=1',
          label: '1 SOL',
        },
        {
          type: 'transaction',
          href: '/api/actions/donate?amount=1',
          label: '0.5 SOL',
        },
        {
          type: 'transaction',
          href: '/api/actions/donate?amount=1',
          label: '1.8 SOL',
        },
        {
          type: 'transaction',
          href: '/api/actions/donate?amount=2',
          label: '5 SOL',
        },
        {
          type: 'transaction',
          href: '/api/actions/donate?amount={amount}',
          label: 'Donation of SOL',
          parameters: [
            {
              name: 'amount',
              label: 'Enter a SOL amount',
            },
          ],
        },
      ],
    },
  };

  return Response.json(payload, { headers: ACTIONS_CORS_HEADERS });
};

export const OPTIONS = GET;

export const POST = async (req: Request) => {
  try {
    const url = new URL(req.url);

    const body: ActionPostRequest = await req.json();
    let account: PublicKey;
    let amount: number = 0.1;

    try {
      account = new PublicKey(body.account);
    } catch (error) {
      return Response.json(
        { message: 'Public Key doesnot exists', error },
        {
          headers: ACTIONS_CORS_HEADERS,
        }
      );
    }
    const connection = new Connection(clusterApiUrl('mainnet-beta'));

    const TO_PUBLIC_KEY = new PublicKey(
      '5ZVUHrjHtD6tLDScordsosj8wvdXYU2Mu6vjR49xT3Ku'
    );
    if (url.searchParams.has('amount')) {
      const val = url.searchParams.get('amount');
      if (val) {
        amount = parseFloat(val) || 0.1;
      }
    }
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: account,
        lamports: amount * LAMPORTS_PER_SOL,
        toPubkey: TO_PUBLIC_KEY,
      })
    );

    transaction.feePayer = account;
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        type: 'transaction',
        transaction: transaction,
        message: 'Donation Successful',
      },
    });

    return Response.json(payload, { headers: ACTIONS_CORS_HEADERS });
  } catch (error) {
    let message;
    if (typeof error == 'string')
      message = 'Something went wrong, Something maybe broken';
    return Response.json(
      {
        message,
      },
      { headers: ACTIONS_CORS_HEADERS }
    );
  }
};
