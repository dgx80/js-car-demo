/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function StepTrigger(max)
{
    this.step = 0;
    this.max = max;
}

StepTrigger.prototype.Update = function()
{
    var triggered = false;
    
    this.step++;
    if(this.step >= this.max)
    {
        this.step = 0;
        triggered = true;
    }
    return triggered;
};