import { chai } from 'environment-safe-chai'; 
const should = chai.should();
import { intercept } from 'environment-safe-console-intercept';
import { Logger } from '../bitwise-logger.js';

const testLogEvent = (logger, eventType, shouldLog)=>{
    let text = '';
    const terminate = intercept(function(interceptedText) {
        text += interceptedText;
        return '';
    });
    try{
        Logger.global.log('foo', Logger[eventType]);
        if(shouldLog) text.trim().should.equal('foo');
        else text.trim().should.not.equal('foo');
        terminate();
    }catch(ex){
        terminate();
        throw ex;
    }
}

const cases = [
  { level: 'ERROR', expected: true },
  { level: 'WARN', expected: true },
  { level: 'TRACE', expected: false },
  { level: 'DEBUG', expected: false },
  { level: 'INFO', expected: false },
];

describe('bitwise-logger', ()=>{
    describe('static interface', ()=>{
        
        cases.forEach((thisCase)=>{
            it(`outputs an ${thisCase.level} message with default settings`, ()=>{
               testLogEvent(Logger.global, thisCase.level, thisCase.expected);
            });
        });
        
    });
    
    describe('class instance', ()=>{
        
        cases.forEach((thisCase)=>{
            it(`outputs an ${thisCase.level} message with default settings`, ()=>{
                const logger = new Logger();
                testLogEvent(logger, thisCase.level, thisCase.expected);
            });
        });
     });
});
