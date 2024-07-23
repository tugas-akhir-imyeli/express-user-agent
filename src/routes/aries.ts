import express from "express";
import axios from 'axios';
import dotenv from 'dotenv';
import prisma from '../db';
export var router = express.Router();

dotenv.config();

/* GET home page. */
router.post("/webhook/topic/out_of_band", async function (req, res, next) {
  try{
    console.log(req.body,'\n\n')
    res.send().status(200);
  } catch(error:any){
    console.error(error.message);
    res.send({ message: "Internal Server Error", error: error }).status(500);
  }
});

router.post("/webhook/topic/connections", async function (req, res, next) {
    try{
      console.log(req.body,'\n\n')
      res.send().status(200);
    } catch(error:any){
      console.error(error.message);
      res.send({ message: "Internal Server Error", error: error }).status(500);
    }
  });

  router.post("/webhook/topic/issue_credential_v2_0", async function (req, res, next) {
    try{
      console.log(req.body,'\n\n')
      res.send().status(200);
    } catch(error:any){
      console.error(error.message);
      res.send({ message: "Internal Server Error", error: error }).status(500);
    }
  });
  router.post("/webhook/topic/issue_credential_v2_0_indy", async function (req, res, next) {
    try{
      console.log(req.body,'\n\n')
      res.send().status(200);
    } catch(error:any){
      console.error(error.message);
      res.send({ message: "Internal Server Error", error: error }).status(500);
    }
  });
  router.post("/webhook/topic/present_proof_v2_0", async function (req, res, next) {
    try{
      console.log(req.body,'\n\n')
      res.send().status(200);
    } catch(error:any){
      console.error(error.message);
      res.send({ message: "Internal Server Error", error: error }).status(500);
    }
  });

  router.post("/webhook/topic/revocation_registry", async function (req, res, next) {
    try{
      console.log(req.body,'\n\n')
      res.send().status(200);
    } catch(error:any){
      console.error(error.message);
      res.send({ message: "Internal Server Error", error: error }).status(500);
    }
  });

  router.post("/webhook/topic/issuer_cred_rev", async function (req, res, next) {
    try{
      console.log(req.body,'\n\n')
      res.send().status(200);
    } catch(error:any){
      console.error(error.message);
      res.send({ message: "Internal Server Error", error: error }).status(500);
    }
  });

  router.post("/webhook/topic/problem_report", async function (req, res, next) {
    try{
      console.log(req.body,'\n\n')
      res.send().status(200);
    } catch(error:any){
      console.error(error.message);
      res.send({ message: "Internal Server Error", error: error }).status(500);
    }
  });