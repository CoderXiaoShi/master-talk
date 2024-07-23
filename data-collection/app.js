// app.js
import sequelize from './database.js';
import { User } from './models/models.js';

(async () => {
  try {
    // 同步数据库
    await sequelize.sync();
    console.log('Database & tables created!');

    for (let i = 0; i < 10; i++) {
      // 创建新用户
      const user = await User.create({
        // id: i,
        name: `John Doe ${Date.now() + i}`,
        email: `john${Date.now() + i}.doe@example.com`,
        age: 30 + i
      });
      console.log('User saved:', user.toJSON());
    }

    // 查找用户
    const foundUser = await User.findAll();
    console.log('User found:', foundUser.length);

    // 关闭数据库连接
    await sequelize.close();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
