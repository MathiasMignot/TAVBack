const debug = require ('debug')('TAT:controllers:users');
const CoreController= require("./CoreController") ;
const usersDataMapper = require('../models/UsersDataMapper');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UsersController extends CoreController{

    static datamapper = usersDataMapper ;

    static dataName = {one:'user', many:'users'};

    constructor(){

        super();
        debug('UsersController created');
    }

    async login(req, res) {
        try {
          if (!req.session.token) {
            const findUser = await usersDataMapper.findByEmail(req.body.email);
            if (!findUser) {
              return res.status(401).json({ message: 'Email inconnu' });
            }
            const isPasswordBody =req.body.password ;
            if (isPasswordBody !== findUser.password) {
              return res.status(401).json({ message: 'Mot de passe incorrect' });
            }
            const user = { ...findUser };
            const token = jwt.sign({ user }, process.env.JWT_SECRET, {});
            req.session.token = token;
            delete user.password;
            return res.status(202).json({
              status: 'success',
              token,
              data: user,
            });
          }
          return res.status(418).json({ status: 'Déjà connecté' });
        } catch (e) {
          return res.status(500).json({ message: e.message });
        }
      }

      async logout(req,res){

        if (!req.session.token) {
          return res.status(400).json({ status: 'Déconnexion impossible' });
        }
        req.session = null;
        return res.status(200).json({ status: 'Déconnexion effectuée', token: '' });
      }
}

module.exports= new UsersController();