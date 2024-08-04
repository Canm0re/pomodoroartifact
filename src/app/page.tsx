'use client';

import React, { useState, useEffect } from 'react';

const PomodoroApp = () => {
  const [cycles, setCycles] = useState(4);
  const [cycleTime, setCycleTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [startTime, setStartTime] = useState('09:00');
  const [currentStep, setCurrentStep] = useState('setup');
  const [currentCycle, setCurrentCycle] = useState(1);
  const [timer, setTimer] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionQuestions, setSessionQuestions] = useState({
    accomplishment: '',
    importance: '',
    completion: '',
    risks: '',
    measurability: '',
    noteworthy: ''
  });

  useEffect(() => {
    let interval = null;
    if (currentStep === 'pomodoro' && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0 && currentStep === 'pomodoro') {
      if (isBreak) {
        if (currentCycle < cycles) {
          setCurrentCycle(currentCycle + 1);
          setIsBreak(false);
          setTimer(cycleTime * 60);
          setCurrentStep('planning');
        } else {
          setCurrentStep('debrief');
        }
      } else {
        setIsBreak(true);
        setTimer(breakTime * 60);
        setCurrentStep('review');
      }
    }
    return () => clearInterval(interval);
  }, [timer, currentStep, isBreak, currentCycle, cycles, cycleTime, breakTime]);

  const startPomodoro = () => {
    setTimer(cycleTime * 60);
    setCurrentStep('planning');
  };

  const inputStyle = {
    display: 'block',
    width: '100%',
    padding: '8px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    display: 'block',
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const renderSetup = () => (
    <div>
      <h2>Pomodoro Setup</h2>
      <input
        type="number"
        value={cycles}
        onChange={(e) => setCycles(Number(e.target.value))}
        placeholder="Number of Pomodoro Cycles"
        style={inputStyle}
      />
      <input
        type="number"
        value={cycleTime}
        onChange={(e) => setCycleTime(Number(e.target.value))}
        placeholder="Minutes per Cycle"
        style={inputStyle}
      />
      <input
        type="number"
        value={breakTime}
        onChange={(e) => setBreakTime(Number(e.target.value))}
        placeholder="Minutes per Break"
        style={inputStyle}
      />
      <input
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        style={inputStyle}
      />
      
      <h3>Session Questions</h3>
      <textarea 
        placeholder="What am I trying to accomplish?"
        value={sessionQuestions.accomplishment}
        onChange={(e) => setSessionQuestions({...sessionQuestions, accomplishment: e.target.value})}
        style={inputStyle}
      />
      <textarea 
        placeholder="Why is this important and valuable?"
        value={sessionQuestions.importance}
        onChange={(e) => setSessionQuestions({...sessionQuestions, importance: e.target.value})}
        style={inputStyle}
      />
      <textarea 
        placeholder="How will I know this is complete?"
        value={sessionQuestions.completion}
        onChange={(e) => setSessionQuestions({...sessionQuestions, completion: e.target.value})}
        style={inputStyle}
      />
      <textarea 
        placeholder="Any risks / hazards? Potential distractions, procrastination, etc."
        value={sessionQuestions.risks}
        onChange={(e) => setSessionQuestions({...sessionQuestions, risks: e.target.value})}
        style={inputStyle}
      />
      <textarea 
        placeholder="Is this concrete / measurable or subjective / ambiguous?"
        value={sessionQuestions.measurability}
        onChange={(e) => setSessionQuestions({...sessionQuestions, measurability: e.target.value})}
        style={inputStyle}
      />
      <textarea 
        placeholder="Anything else noteworthy?"
        value={sessionQuestions.noteworthy}
        onChange={(e) => setSessionQuestions({...sessionQuestions, noteworthy: e.target.value})}
        style={inputStyle}
      />
      
      <button onClick={startPomodoro} style={buttonStyle}>Start Pomodoro</button>
    </div>
  );

  const renderPlanning = () => (
    <div>
      <h2>Plan for Cycle {currentCycle}</h2>
      <textarea placeholder="What am I trying to accomplish this cycle?" style={inputStyle}></textarea>
      <textarea placeholder="How will I get started?" style={inputStyle}></textarea>
      <textarea placeholder="Any hazards present?" style={inputStyle}></textarea>
      <select style={inputStyle}>
        <option value="low">Energy: Low</option>
        <option value="medium">Energy: Medium</option>
        <option value="high">Energy: High</option>
      </select>
      <select style={inputStyle}>
        <option value="low">Morale: Low</option>
        <option value="medium">Morale: Medium</option>
        <option value="high">Morale: High</option>
      </select>
      <button onClick={() => setCurrentStep('pomodoro')} style={buttonStyle}>Start Cycle</button>
    </div>
  );

  const renderPomodoro = () => (
    <div style={{ textAlign: 'center' }}>
      <h2>{isBreak ? 'Break Time' : `Cycle ${currentCycle}`}</h2>
      <div style={{ fontSize: '2em', margin: '20px 0' }}>
        {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
      </div>
    </div>
  );

  const renderReview = () => (
    <div>
      <h2>Review Cycle {currentCycle}</h2>
      <select style={inputStyle}>
        <option value="yes">Completed cycle's target? Yes</option>
        <option value="half">Completed cycle's target? Half</option>
        <option value="no">Completed cycle's target? No</option>
      </select>
      <textarea placeholder="Anything noteworthy?" style={inputStyle}></textarea>
      <textarea placeholder="Any distractions?" style={inputStyle}></textarea>
      <textarea placeholder="Things to improve for next cycle?" style={inputStyle}></textarea>
      <button onClick={() => setCurrentStep('pomodoro')} style={buttonStyle}>Start Break</button>
    </div>
  );

  const renderDebrief = () => (
    <div>
      <h2>Debrief</h2>
      <textarea placeholder={`What did I get done this past ${cycles * cycleTime} minutes?`} style={inputStyle}></textarea>
      <textarea placeholder="How did this compare to my normal work output?" style={inputStyle}></textarea>
      <textarea placeholder="Did I get bogged down? Where?" style={inputStyle}></textarea>
      <textarea placeholder="What went well? How can I replicate this in the future?" style={inputStyle}></textarea>
      <textarea placeholder="Any other takeaways? Lessons to share with future you?" style={inputStyle}></textarea>
      <button onClick={() => setCurrentStep('setup')} style={buttonStyle}>Finish Session</button>
    </div>
  );

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Pomodoro App</h1>
      {currentStep === 'setup' && renderSetup()}
      {currentStep === 'planning' && renderPlanning()}
      {currentStep === 'pomodoro' && renderPomodoro()}
      {currentStep === 'review' && renderReview()}
      {currentStep === 'debrief' && renderDebrief()}
    </div>
  );
};

export default PomodoroApp;
