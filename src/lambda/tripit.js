import axios from 'axios';

const tripitId = 'B45BB42062FB85547BC75F18EE901C7E';
const tripitUrl = `https://www.tripit.com/account/badge/id/${tripitId}/div_id/FINDME/badge.js`;

export function handler(event, context, callback) {
  axios.get(tripitUrl).then((result) => {
    callback(null, {
      statusCode: 200,
      body: result.data
        .replace(/\\/g, '')
        .replace(/(\n|\r|.)*FINDME..../g, '')
        .replace(/"\);(\n|\r|.)*$/g, '')
    })
  })
}
