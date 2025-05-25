import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Users = sequelize.define('Users', {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
});

export default Users;