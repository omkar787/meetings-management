const router =require('express').Router()
const User = require("../models/User")
const  {body,validationResult} = require('express-valdiator')
const bcrypt = require('bcrypt')


