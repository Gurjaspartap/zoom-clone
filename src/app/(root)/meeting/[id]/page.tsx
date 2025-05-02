import React from 'react'

const Meeting = ({
    params
  }: {
    params: { id: string }
  }) => {
    
  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Main video container */}
      <div>{params.id}</div>
      <div className="flex-1 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
          {/* Local video */}
          <div className="bg-muted rounded-lg flex items-center justify-center">
            <div className="text-muted-foreground">Your video</div>
          </div>
          
          {/* Remote video */}
          <div className="bg-muted rounded-lg flex items-center justify-center">
            <div className="text-muted-foreground">Remote video</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="border-t border-border p-4">
        <div className="flex items-center justify-center gap-4">
          <button className="p-3 rounded-full bg-muted hover:bg-muted/80">
            <span className="sr-only">Toggle microphone</span>
            🎤
          </button>
          <button className="p-3 rounded-full bg-muted hover:bg-muted/80">
            <span className="sr-only">Toggle camera</span>
            📹
          </button>
          <button className="p-3 rounded-full bg-destructive hover:bg-destructive/80 text-destructive-foreground">
            <span className="sr-only">End call</span>
            ❌
          </button>
        </div>
      </div>
    </div>
  )
}

export default Meeting


