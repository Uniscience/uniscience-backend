const express = require('express')
const cors = require('cors')
const axios = require('axios').default

const app = express()

const PORT = process.env.PORT || 9001;
const baseUrl = 'https://uniscience.vtexcommercestable.com.br'
const APPKEY = process.env.APPKEY
const APPTOKEN = process.env.APPTOKEN

app.use(cors())
app.use(express.json())

app.post(`/:params`, async (req, res) => {
  const { id, active, approved } = req.query
  const defaultValues = await verifyApprovedActive(id)

  try {
    const { data } = await axios({
      method: "PATCH",
      url: `${baseUrl}/api/dataentities/OC/documents/${id}`,
      headers: {
        accept: "application/vnd.vtex.ds.v10+json",
        "content-type": "application/json",
        "x-vtex-api-appkey": APPKEY,
        "x-vtex-api-apptoken": APPTOKEN,
      },
      data: {
        active: active ? active : defaultValues?.active,
        approved: approved ? approved : defaultValues?.approved
      },
    });
    res.status(200).json({ data });
  } catch (error) {
    if (error.message === "Request failed with status code 304") return res.status(400).json({ error: 'Usuário já registrado' });
    res.status(401).json({ error });
  }

})
app.get(`/getOrcamentoById/:id`, async (req, res) => {
  const { id } = req.params
  try {
    const { data } = await axios({
      method: "GET",
      url: `${baseUrl}/api/dataentities/OC/documents/${id}?_fields=active,address,approved,cellphone,cep,city,complement,contactName,document,email,emissao,name,number,nummberOrcamento,obs,phone,products,productList,state,id,productsName,productsQuantity,productsValue,productsValueTotal,totals,shippingText,coupon,shippingPostalCode,maxEstimateValue`,
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
app.get(`/getOrcamentoByEmail/:email`, async (req, res) => {
  const { email } = req.params
  try {
    const { data } = await axios({
      method: "GET",
      url: `${baseUrl}/api/dataentities/OC/search?_where=(email=${email})&_fields=active,address,approved,cellphone,cep,city,complement,contactName,document,email,emissao,name,number,nummberOrcamento,obs,phone,products,productList,state,id,productsName,productsQuantity,productsValue,productsValueTotal,totals,shippingText,coupon,shippingPostalCode,maxEstimateValue`,
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

const verifyApprovedActive = async (id) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${baseUrl}/api/dataentities/OC/documents/${id}?_fields=active,approved`,
      headers: {
        accept: "application/vnd.vtex.ds.v10+json",
        "content-type": "application/json",
        "x-vtex-api-appkey": APPKEY,
        "x-vtex-api-apptoken": APPTOKEN,
      },
    });
    return {data}
    // res.status(200).json({ data });
  } catch (error) {
    // if (error.message === "Request failed with status code 304") return res.status(400).json({ error: 'Usuário já registrado' });
    // res.status(401).json({ error });
    return []
  }
}

app.listen(PORT, () => {
  console.log('running on ' + PORT);
})