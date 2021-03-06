import dotenv from 'dotenv';
import { getList } from './requests/getList';
import { getSingle } from './requests/getSingle';
import * as mongodb from './services/mongodb';
import axios from 'axios';
const result = dotenv.config({ path: __dirname + '/../.env' });
if (result.error !== undefined) {
  throw result.error;
}

const init = async () => {
  await mongodb.init(process.env);
  
  // await mongodb.dropAndCreateCollection('ads')
  // await dysonToLego()
  // console.log('done')

  const list = await getList(
    process.env,
    `&q=${encodeURIComponent('lego')}&minPrice=150.00`
  );
  console.log('list loaded');
  const resLego = await handleList(list, 'lego');
  console.log('lego done', resLego);

  const listDyson = await getList(
    process.env,
    `&q=${encodeURIComponent('dyson')}&minPrice=150.00`
  );
  console.log('list loaded');
  const resDyson = await handleList(listDyson, 'dyson_fix');
  console.log('dyson done', resDyson);

  if (resLego.errors > 0 || resDyson.errors > 0) {
    console.log(
      await postMessageToTeams(
        'RunSuccess',
        `lego: ${JSON.stringify(resLego)}, dyson: ${JSON.stringify(resDyson)}`
      )
    );
  }
  process.exit();
};

const handleList = async (list: any[], searchQuery: string) => {
  let success = 0;
  let errors = 0;
  for (const l of list) {
    const element = await getSingle(process.env, l.id).catch((err) => {
      console.log('errorGetSingle', err.message);
      ++errors;
    });
    console.log('element', element)
    if (element) {
      ++success;
      await mongodb.insertOrUpdateAd({ ...element, searchQuery });
      // await new Promise(resolve => setTimeout(() => resolve({}), 2000))
      // const account = await getAccount(element['user-id'].value).catch(err => {
      //     console.log('errorGetAccount', err.message)
      // })
      // if (account)
      //     await mongodb.insertOrUpdateAccount(account)
    }
  }
  return { success, errors };
};

async function postMessageToTeams(title: string, message: string) {
  const webhookURL =
    'https://inncodedde.webhook.office.com/webhookb2/939850bc-8c86-4520-8701-921f21cd1134@1f5ef628-ef5c-4705-a562-ceb46b471853/IncomingWebhook/62824d888812440b9729ac150db2bb09/b51476fc-4d1b-4359-8717-ec123f87c7e6';
  const card = {
    '@type': 'MessageCard',
    '@context': 'http://schema.org/extensions',
    themeColor: '0072C6', // light blue
    summary: 'Summary description',
    sections: [
      {
        activityTitle: title,
        text: message,
      },
    ],
  };

  try {
    const response = await axios.post(webhookURL, card, {
      headers: {
        'content-type': 'application/vnd.microsoft.teams.card.o365connector',
        'content-length': `${card.toString().length}`,
      },
    });
    return `${response.status} - ${response.statusText}`;
  } catch (err) {
    return err;
  }
}

init();


const dysonToLego = async () => {
  var myquery = { searchQuery: 'dyson' };
  var newvalues = { $set: { searchQuery: "lego" } };
  const res = await mongodb.connection.collection("ads").updateMany(myquery, newvalues)
  console.log(res.result.nModified + " document(s) updated");
}