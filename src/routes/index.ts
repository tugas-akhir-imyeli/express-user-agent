import axios from "axios";
import express from "express";
import { createProofProposal } from "../helper/request";
export var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  try{
    res.redirect("/connections")
  } catch(error:any){
    console.error(error.message);
    res.send({ message: "Internal Server Error", error: error }).status(500);
  }
});

router.get("/connections", async function (req, res, next) {
  try{
    const connectionUrl = `${process.env.ARIES_URL}/connections`;
    const response = await axios.get(connectionUrl);
    const connections = response.data.results;
    const activeConnections = connections.filter((connection: any) => connection.state === "active");
    const invitationResponse = await axios.post(`${process.env.ARIES_URL}/out-of-band/create-invitation`, {
      "handshake_protocols": [
          "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/didexchange/1.0"
      ],
      "auto_accept": "auto"
  });
  const invitation = JSON.stringify(invitationResponse.data.invitation);
    res.render("connections", {connections: activeConnections, invitation: invitation});
  } catch(error:any){
    console.error(error.message);
    res.send({ message: "Internal Server Error", error: error }).status(500);
  }
    
})

router.post("/connections/delete", async function (req, res, next) {
  try{
    const {connection_id} = req.body;
    const connectionUrl = `${process.env.ARIES_URL}/connections/${connection_id}`;
    await axios.delete(connectionUrl);
    res.redirect("/")
  } catch(error:any){
    console.error(error.message);
    res.send({ message: "Internal Server Error", error: error }).status(500);
  }
});

router.get("/identities", async function (req, res, next) {
    const connectionUrl = `${process.env.ARIES_URL}/connections`;
    const connResponse = await axios.get(connectionUrl);
    const connections = connResponse.data.results;
    const credentialUrl = `${process.env.ARIES_URL}/credentials`;
    const response = await axios.get(credentialUrl);
    const credentials = response.data.results;
    // console.log(credentials)
    res.render("credentials", {credentials, connections});
})

router.post("/add-connection", async function (req, res, next) {
  try{
    const {conn_json} = req.body;
    const receiveInvitationUrl = `${process.env.ARIES_URL}/out-of-band/receive-invitation`;
    const response = await axios.post(receiveInvitationUrl, conn_json, {headers: {'Content-Type': 'application/json'}});
    return res.redirect("/connections");
  }catch(error:any){
    console.error(error.message);
    res.send({ message: "Internal Server Error", error: error }).status(500);
  }
  
})

router.post("/credentials/send", async function (req, res, next) {
  try{
    const {referent, connection_id} = req.body;
    const sendProofUrl = `${process.env.ARIES_URL}/present-proof-2.0/send-proposal`;
    const request = await createProofProposal(connection_id, referent);
    const response = await axios.post(sendProofUrl, request, {headers: {'Content-Type': 'application/json'}});
    return res.send(response.data).status(200);
  }
  catch(error:any){
    console.error(error.message);
    res.send({ message: "Internal Server Error", error: error }).status(500);
  }
})

router.post("/credential/remove", async function (req, res, next) {
  try{
    const {referent} = req.body;
    const sendProofUrl = `${process.env.ARIES_URL}/credential/${referent}`;
    const response = await axios.delete(sendProofUrl);
    return res.send(response.data).status(200);
  }
  catch(error:any){
    console.error(error.message);
    res.send({ message: "Internal Server Error", error: error }).status(500);
  }
})