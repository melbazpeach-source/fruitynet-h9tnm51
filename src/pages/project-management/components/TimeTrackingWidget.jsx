import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TimeTrackingWidget = ({ taskId, currentTime = 0, onTimeLog }) => {
  const [isTracking, setIsTracking] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [manualHours, setManualHours] = useState('');
  const [note, setNote] = useState('');
  const [showManualEntry, setShowManualEntry] = useState(false);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours?.toString()?.padStart(2, '0')}:${minutes?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const handleStartStop = () => {
    if (isTracking) {
      onTimeLog(taskId, elapsedTime / 3600, note);
      setElapsedTime(0);
      setNote('');
    }
    setIsTracking(!isTracking);
  };

  const handleManualLog = () => {
    if (manualHours && parseFloat(manualHours) > 0) {
      onTimeLog(taskId, parseFloat(manualHours), note);
      setManualHours('');
      setNote('');
      setShowManualEntry(false);
    }
  };

  React.useEffect(() => {
    let interval;
    if (isTracking) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-elevation-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base md:text-lg font-semibold text-foreground flex items-center gap-2">
          <Icon name="Clock" size={20} color="var(--color-primary)" />
          Time Tracking
        </h3>
        <button
          onClick={() => setShowManualEntry(!showManualEntry)}
          className="text-sm text-primary hover:underline"
        >
          {showManualEntry ? 'Timer' : 'Manual Entry'}
        </button>
      </div>
      {!showManualEntry ? (
        <div className="space-y-4">
          <div className="text-center py-6 bg-muted/30 rounded-lg">
            <p className="text-3xl md:text-4xl font-mono font-semibold text-foreground mb-2">
              {formatTime(elapsedTime)}
            </p>
            <p className="text-sm text-muted-foreground">
              Total logged: {currentTime?.toFixed(2)}h
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant={isTracking ? 'destructive' : 'default'}
              fullWidth
              iconName={isTracking ? 'Square' : 'Play'}
              iconPosition="left"
              onClick={handleStartStop}
            >
              {isTracking ? 'Stop' : 'Start'} Timer
            </Button>
          </div>

          {isTracking && (
            <Input
              type="text"
              placeholder="Add a note (optional)"
              value={note}
              onChange={(e) => setNote(e?.target?.value)}
            />
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <Input
            type="number"
            label="Hours"
            placeholder="Enter hours worked"
            value={manualHours}
            onChange={(e) => setManualHours(e?.target?.value)}
            min="0"
            step="0.25"
          />

          <Input
            type="text"
            label="Note"
            placeholder="What did you work on?"
            value={note}
            onChange={(e) => setNote(e?.target?.value)}
          />

          <Button
            variant="default"
            fullWidth
            iconName="Plus"
            iconPosition="left"
            onClick={handleManualLog}
            disabled={!manualHours || parseFloat(manualHours) <= 0}
          >
            Log Time
          </Button>
        </div>
      )}
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground mb-2">Recent Time Logs</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Today</span>
            <span className="font-medium text-foreground">2.5h</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">This Week</span>
            <span className="font-medium text-foreground">12.75h</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTrackingWidget;