const Sequelize = require("sequelize");

const seq = require('../utils/database').seq
const Lesson = seq.define(
  "lesson",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    content: {
      type: Sequelize.TEXT("long"),
      allowNull: false,
    },
    cover: {
      type: Sequelize.TEXT('medium'),
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    grade: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    exercies: {
      type: Sequelize.DataTypes.TEXT("long"),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);


module.exports = Lesson;

// يمكن استخدامه ايضا في لفرونت اند كوسيط بين الرودكت و الكارت


/* (async ()=> {
  const les = await Lesson.findByPk(1)
  
    les.exercies = `[
      { x: '70%', y: '60%', id: 'input1', correctAnswer: 'منفرجة' },
      { x: '45%', y: '60%', id: 'input2', correctAnswer: 'قائمة' },
      { x: '20%', y: '60%', id: 'input3', correctAnswer: 'حادة' },
      { x: '0%', y: '60%', id: 'input4', correctAnswer: 'مستقيمة' },
  ]`
  await les.save()
  console.log('data inserted')
})() */
