import { connect } from "mongodb";
import { getList } from "./requests/getList";
import { getSingle } from "./requests/getSingle";
import { getAccount } from "./requests/getAccount";
import * as mongodb from "./services/mongodb";
import axios from "axios";


const init = async () => {
    await mongodb.init()
    // await mongodb.dropAndCreateCollection('ads')
    const list = await getList(`&q=${encodeURIComponent('lego')}&minPrice=150.00`)
    console.log('list loaded')
    const resLego = await handleList(list, 'lego')
    console.log('lego done', resLego)

    const listDyson = await getList(`&q=${encodeURIComponent('dyson airwrap')}&minPrice=150.00`)
    console.log('list loaded')
    const resDyson = await handleList(list, 'dyson')
    console.log('dyson done', resDyson)

    if (resLego.errors > 0 || resDyson.errors > 0) {
        console.log(await postMessageToTeams('RunSuccess', `lego: ${JSON.stringify(resLego)}, dyson: ${JSON.stringify(resDyson)}`))
    }
    process.exit()
}


const handleList = async (list: any[], searchQuery: string) => {
    let success = 0
    let errors = 0
    for (const l of list) {
        const element = await getSingle(l.id).catch(err => {
            console.log('errorGetSingle', err.message)
            ++errors
        })
        if (element) {
            ++success
            await mongodb.insertOrUpdateAd({ ...element, searchQuery })
            // await new Promise(resolve => setTimeout(() => resolve({}), 2000))
            // const account = await getAccount(element['user-id'].value).catch(err => {
            //     console.log('errorGetAccount', err.message)
            // })
            // if (account)
            //     await mongodb.insertOrUpdateAccount(account)
        }
    }
    return { success, errors }
}


async function postMessageToTeams(title: string, message: string) {
    const webhookURL = "https://inncodedde.webhook.office.com/webhookb2/939850bc-8c86-4520-8701-921f21cd1134@1f5ef628-ef5c-4705-a562-ceb46b471853/IncomingWebhook/62824d888812440b9729ac150db2bb09/b51476fc-4d1b-4359-8717-ec123f87c7e6"
    const card = {
        '@type': 'MessageCard',
        '@context': 'http://schema.org/extensions',
        'themeColor': "0072C6", // light blue
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

init()