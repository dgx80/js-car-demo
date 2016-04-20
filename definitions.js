/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var DIR_TYPE = 
{
  LEFT: {value: 0, name: 'left', code: 'L'}, 
  RIGHT: {value: 1, name: 'right', code: 'R'},
  FRONT: {value: 2, name: 'front', code: 'F'},
  BACK : {value: 3, name: 'back', code: 'B'}
};
Object.freeze(DIR_TYPE);

var SIDE_TYPE = 
{
  MID: {value: 0, name:'mid', code:'M'}, 
  LEFT: {value: 1, name: DIR_TYPE.LEFT.name, code: DIR_TYPE.LEFT.code}, 
  RIGHT : {value: 2, name: DIR_TYPE.RIGHT.name, code: DIR_TYPE.RIGHT.code}
};
Object.freeze(SIDE_TYPE);

var PATH = 
{
    ASSETS:'assets/',
    LEVELS: 'data/level/level_',
    SOUND:'assets/sound/'
}
Object.freeze(PATH);

var ObjectPool =
{
    CAR: 'Car',
    POLICE: 'Police'
};
Object.freeze(ObjectPool);