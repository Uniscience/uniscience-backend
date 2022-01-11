const express = require('express')
const cors = require('cors')
const axios = require('axios').default

const app = express()

const PORT = process.env.PORT || 9001;
const baseUrl = 'https://uniscience.vtexcommercestable.com.br'
const APPKEY = 'vtexappkey-uniscience-NIOTWN';
const APPTOKEN = 'CHASOAVZVCJSZHIIQIKRYDJFLTYVIEAHXGHACTXLGOSEANPPPFWVZSQZYUGVBZRRBCVTAIGXKZLJLEEXEJFCHFHEPHCHMCKHXBCYSVOHZYKAHHOTQJQSTOJWUQDSFYLI';

app.use(cors())
app.use(express.json())

app.post('/register', async (req, res) => {
  try{
    const { data } = await axios({
      method: "put",
      url: `${baseUrl}/api/dataentities/CL/documents`,
      headers: {
        accept: "application/vnd.vtex.ds.v10+json",
        "content-type": "application/json",
        "x-vtex-api-appkey": APPKEY,
        "x-vtex-api-apptoken": APPTOKEN,
      },
      data: {
        ...req.body
      },
    });
    res.status(200).json({ data });
  } catch (error) {
    if (error.message === "Request failed with status code 304") return res.status(400).json({ error: 'Usuário já registrado' });
    res.status(401).json({ error });
  }

})

app.listen(PORT, () => {
  console.log('running on ' + PORT);
})